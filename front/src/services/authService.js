import axios from "axios";

const API_URL = "http://localhost:8080/auth";

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};

export const register = async (data) => {
  const response = await axios.post(`${API_URL}/register`, data);

  if (response.data.token) {
    localStorage.setItem("token", response.data.token);
  }

  return response.data;
};
