import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { fetchAPILoad, fetchAPIView, fetchAPISearch } from "./ServerHandler";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import CSV from "./CSV";
// FOR MOCK vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
export interface CSVProps {
  loadedFileData: string[][];
  setLoadedFileData: Dispatch<SetStateAction<string[][]>>;
}

export type HistoryEntry = string | string[][];
// Placeholder for loaded file name
let loadedFile: string;

let properties: CSVProps = {
  loadedFileData: [],
  setLoadedFileData: () => {}, // Empty function as a placeholder
};
// FOR MOCK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

/**
 * Interface defining the structure of a REPLFunction
 * @param args An array of strings representing the arguments passed to the function.
 * @returns A string or a 2D string array, depending on the function's operation.
 */
export interface REPLFunction {
  (args: Array<string>): string | Promise<HistoryEntry>;
}

/**
 * Interface extending CSVProps to include properties specific to REPLInput component.
 */
export interface REPLInputProps {
  history: HistoryEntry[];
  setHistory: Dispatch<SetStateAction<HistoryEntry[]>>;
}

/**
 * The REPLInput function component handles the input part of the REPL (Read-Eval-Print Loop) interface.
 * It allows users to enter commands to be executed and displays the results.
 *
 * @param props The props passed to the REPLInput component, including history, mode, and functions to manage state.
 * @param properties CSV-related properties, including loaded data and a setter for that data.
 */
export function REPLInput(props: REPLInputProps) {
  // State to manage the registry of commands and the current command string
  const [commandRegistry, setCommandRegistry] = useState<{
    [key: string]: REPLFunction;
  }>({});
  const [commandString, setCommandString] = useState<string>("");
  const [inputFocused, setInputFocused] = useState<boolean>(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  /**
   * Effect hook to register commands when the component mounts
   */

  useEffect(() => {
    registerCommand("load", loadFile);
    registerCommand("view", viewFile);
    registerCommand("search", searchFile);

    const handleKeyEvent = (event: any) => {
      if (event.key === "Enter" && event.ctrlKey) {
        event.preventDefault();
        // Execute the command
        handleSubmit(commandString);
        // Clear the input field
        setCommandString("");
      } else if (event.key === "q" && event.ctrlKey && !event.shiftKey) {
        // Focus on input field on Ctrl + Q
        event.preventDefault();
        if (inputFocused && inputRef.current) {
          inputRef.current.focus();
          setInputFocused(false);
        }
      }
    };

    // Attach the event listener
    document.addEventListener("keydown", handleKeyEvent);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyEvent);
    };
  }, [commandString]);

  /**
   * Registers a new command in the command registry.
   *
   * @param commandName The name of the command to register.
   * @param commandFunction The function to execute when the command is called.
   */
  function registerCommand(commandName: string, commandFunction: REPLFunction) {
    setCommandRegistry((prevState) => ({
      ...prevState,
      [commandName]: commandFunction,
    }));
  }

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleSubmitFocus = () => {
    setInputFocused(false);
  };

  /**
   * Handles the submission of a command by the user.
   *
   * @param commandString The command string entered by the user.
   */
  async function handleSubmit(commandString: string) {
    const [command, ...args] = commandString.trim().split(" ");
    if (commandRegistry.hasOwnProperty(command)) {
      // Call the command function and await its result
      const output = await commandRegistry[command](args);
      const formattedEntry = `Command: ${commandString}\n${output.toString()}`;
      props.setHistory([...props.history, formattedEntry]);
    }
    setCommandString("");
  }

  /**
   * Definition of REPL function for loading a given file from local computer
   */
  let loadFile: REPLFunction = function (args: Array<string>) {
    return new Promise(async (resolve, reject) => {
      if (args.length !== 1) {
        resolve("Invalid Command (load must take in 1 argument <filepath>)");
      }
      const filepath = args[0];
      if (!filepath.endsWith(".csv")) {
        resolve("Invalid File (the file must be a csv file)");
      }
      try {
        loadedFile = args[0];
        resolve(CSV.loadCSV(loadedFile));

        // Fetch the API result and wait for the response
        const result = await fetchAPILoad(filepath);
        // Resolve the promise with the result
        resolve(result);
      } catch (error) {
        // If there's an error during the fetch, reject the promise
        reject(error);
      }
    });
  };

  /**
   * Definition of REPL function for viewing a loaded file
   */
  let viewFile: REPLFunction = function (args: Array<string>) {
    return new Promise(async (resolve, reject) => {
      try {
        if (loadedFile == args[0]) {
          resolve(CSV.viewCSV(loadedFile));
          resolve("Please load file before attempting to view.");
        } else {
          if (args.length != 0) {
            resolve("Invalid Command (view must take in no arguments)");
          }
          const result = await fetchAPIView();
          resolve(result);
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  /**
   * Defintion of REPL function for searching a loaded file
   */
  let searchFile: REPLFunction = function (args: Array<string>) {
    return new Promise(async (resolve, reject) => {
      // arguments must be between 2 and 4
      if (args.length < 2 || args.length > 4) {
        resolve(
          "Invalid Command (search must take in 2 to 4 arguments <searchValue> <header> <columnIdentifier> <columnType>)"
        );
      }
      try {
        let searchValue: string = args[0];
        let header: string = args[1];
        // if the conditions meet then we will occupy the following arguments
        let columnIdentifer: string = args.length >= 3 ? args[2] : "";
        let columnType: string = args.length === 4 ? args[3] : "";
        const result = await fetchAPISearch(searchValue);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <div className="repl-input">
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
          inputRef={inputRef}
          onFocus={handleInputFocus}
        />
      </fieldset>
      <button
        className="button"
        onClick={() => handleSubmit(commandString)}
        ref={submitButtonRef}
        onFocus={handleSubmitFocus}
      >
        Submit
      </button>
    </div>
  );
}
