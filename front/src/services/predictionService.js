import axios from "axios";

const API_URL = "http://localhost:8080/prediction";

export const predictFlight = async (data) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getMyHistory = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(`${API_URL}/myHistory`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
