import axios from "axios";

import { API_BASE_URL } from "../config/apiConfig";

const API_URL = `${API_BASE_URL}`;

export const getLoggedUser = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(API_URL + "/User/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
