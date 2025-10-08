import axios from "axios";
const API_URL = "http://localhost:1337";
export  const fetchData = async (endpoint, params = {}) => {
    try {
      const res = await axios.get(`${API_URL}/api/${endpoint}`, {
        params,
      });
      return res.data;
    } catch (err) {
      console.error(`Error fetching ${endpoint}:`, err);
      return null;
    } 
  };
  