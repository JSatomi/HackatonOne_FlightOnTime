import api from "./api"; 

export const getAirlines = async () => {
  const response = await api.get("/catalogos/aerolineas");
  return response.data;
};

export const getAirports = async () => {
  const response = await api.get("/catalogos/aeropuertos");
  return response.data;
};