/**
 * Helper function to convert the JSON File into a table html
 */
export function JSONtoTable(data: any[]): string {
  // Check if the data array is empty
  if (data.length === 0) {
    return "<p>No data available</p>";
  }

  // Extract headers from the first object's keys
  const headers = Object.keys(data[0]);

  // Start building the table HTML
  let tableHtml = `<table className='table' style='border-collapse: collapse; width: 80%; margin: auto; border-radius: 10px; overflow: hidden;'><thead><tr style='background-color: #503c3c; color: white;'>`;

  // Populate table headers
  headers.forEach((header) => {
    tableHtml += `<th style='border: 1px solid white; padding: 8px;'>${header}</th>`;
  });
  tableHtml += "</tr></thead><tbody>";

  // Populate table rows
  data.forEach((rowObject) => {
    tableHtml += "<tr>";
    // Populate table cells
    headers.forEach((header) => {
      // Stringify each value to handle nested objects
      const value = JSON.stringify(rowObject[header]);
      tableHtml += `<td style='border: 1px solid white; padding: 8px; color: white;'>${value}</td>`;
    });
    tableHtml += "</tr>";
  });

  // Close the table HTML
  tableHtml += "</tbody></table>";

  return tableHtml;
}

/**
 * This is a function that returns a Promise, for when we call 'load', the
 * server will load the csv on standby
 * @param filepath
 * @returns
 */
export function fetchAPILoad(filepath: string): Promise<string> {
  return fetch("http://localhost:5556/loadcsv?filepath=" + filepath)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // The text of the response
      return response.text();
    })
    .catch((error) => {
      return "Load (" + error.message + ")";
    });
}

/**
 * This function returns a Promise where we can extract the viewable
 * content from the CSV data
 * @returns
 */
export function fetchAPIView(): Promise<string> {
  return fetch("http://localhost:5556/viewcsv")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseObject) => {
      if (!responseObject.data || !Array.isArray(responseObject.data)) {
        throw new Error("Invalid data format");
      }
      const dataArray = JSONtoTable(responseObject.data);
      return dataArray;
    })
    .catch((error) => "Error: " + error.message);
}

/**
 * This function returns a Promise to search for specific data in the CSV
 * @param searchValue
 * @param header
 * @param columnIndex
 * @param columnType
 * @returns
 */
export function fetchAPISearch(
  searchValue: string,
  header: string,
  columnIndex: string,
) {
  return fetch(
    `http://localhost:5556/searchcsv?searchValue=${searchValue}&header=${header}&columnIndex=${columnIndex}`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((responseObject) => {
      const result = JSONtoTable(responseObject);
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}


