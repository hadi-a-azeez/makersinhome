import axios from "axios";
import React, { useState, useEffect } from "react";

const ApiTest = (props) => {
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    let apiUrl = `http://localhost:5000/api/client/store/analytics/${props.match.params.id}`;
    const runAPI = async (url) => {
      try {
        let response = await axios.get(url);
        setApiData(response);
        console.log(apiData);
      } catch (error) {
        console.log(error);
      }
    };
    runAPI(apiUrl);
  }, []);
  return apiData && <h1>{JSON.stringify(apiData)}</h1>;
};
export default ApiTest;
