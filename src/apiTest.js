import axios from "axios";
import React, { useState, useEffect } from "react";
import { apiRoot } from "./config";

const ApiTest = (props) => {
  const [apiData, setApiData] = useState([]);
  useEffect(() => {
    let apiUrl = `${apiRoot}/client/store/analytics/storeviews/${props.match.params.id}`;
    const runAPI = async (url) => {
      try {
        let response = await axios.get(url, { withCredentials: true });
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
