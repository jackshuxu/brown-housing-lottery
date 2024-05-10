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
 * content from the CSV data as an array of Room objects
 * @returns
 */
export function fetchAPIView(): Promise<Room[]> {
  return fetch("http://localhost:5556/viewcsv")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parsing JSON response
    })
    .then((responseObject) => {
      if (!responseObject.responseMap) {
        throw new Error("Invalid data format: responseMap not found");
      }
      
      // Accessing the array of arrays representing CSV rows
      const csvData: any[][] = responseObject.responseMap[Object.keys(responseObject.responseMap)[0]];

      // Parsing CSV rows into Room objects
      const rooms: Room[] = csvData.slice(1).map((row: any[]) => ({
        dormName: row[0],
        roomNumber: row[3],
        roomType: row[5],
        buildingName: row[0] // Assuming building name is the same as dorm name
      }));

      console.log("Room Data:", rooms); // Log the room data
      return rooms;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      throw error;
    });
}



/**
 * This function returns a Promise to search for specific data in the CSV
 * @param searchValue
 * @param header
 * @param columnIndex
 * @param columnType
 * @returns
 */
export function fetchAPISearch(building: string) {
  return fetch(`http://localhost:5556/searchcsv?target=${building}`)
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
      console.log(building);
      throw error;
    });
}
