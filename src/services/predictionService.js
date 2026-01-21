import axios from "axios";

const API_URL = "http://localhost:8080/prediction";

export const predictFlight = async (data) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  return response.data;
};
