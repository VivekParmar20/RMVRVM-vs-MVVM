import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [appList, setAppList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minAge, setMinAge] = useState(20);
  const [maxAge, setMaxAge] = useState(40);
  const baseUrl = "http://localhost:1234/api/";

  const getAppList = async () => {
    try {
      const response = await axios.get(`${baseUrl}allapp`);
      if (response.data.IsSuccess) {
        // Filter data with age between 20 and 25
        const filteredList = response.data.Data.filter(app => app.age >= minAge && app.age <= maxAge);
        setAppList(filteredList);
      } else {
        setError(response.data.Message);
      }
    } catch (error) {
      setError("Something went wrong!!");
    } finally {
      setIsLoading(false);
    }
  };

  const getAppListBack = async () => {
    try {
      const response = await axios.get(`${baseUrl}filteredapp?minAge=${minAge}&maxAge=${maxAge}`);
      if (response.data.IsSuccess) {
        // Filter data with age between 20 and 25
        setAppList(response.data.Data);
      } else {
        setError(response.data.Message);
      }
    } catch (error) {
      setError("Something went wrong!!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
   getAppList();
   // getAppListBack();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (appList.length > 0) {
        setAppList((prevAppList) => {
          const updatedList = [...prevAppList];
          updatedList.shift(); // Remove the first item
          return updatedList;
        });
      }
    }, 3000); // Interval of 3 seconds (3000 milliseconds)

    return () => clearInterval(interval);
  }, [appList]);

  return (
    <div className="App">
      {isLoading ? (
        <p>Data is Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {appList.map((app) => (
            <li key={app.id}>{app.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
