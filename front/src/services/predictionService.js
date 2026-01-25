import axios from "axios";

// 1. La URL base NO debe llevar el "/prediction" al final
const BASE_URL = "http://localhost:8080";

export const predictFlight = async (data) => {
  const token = localStorage.getItem("token");
  try {
    // 2. Aquí le pegas el "/prediction"
    const response = await axios.post(`${BASE_URL}/prediction`, data, {
      headers: { Authorization: `Bearer ${token?.trim()}` },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      // Este es el mensaje "El aeropuerto de origen LGA no existe" que viene de Java
      const serverMessage = error.response.data.message || "Error en los datos";
      throw new Error(serverMessage);
    }
    throw new Error("Error de conexión con el servidor");
  }
};

export const getMyHistory = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No autenticado");

  try {
    // 3. Aquí le pegas el "/prediction/myHistory" (o como lo tengas en Java)
    const response = await axios.get(`${BASE_URL}/prediction/myHistory`, {
      headers: { Authorization: `Bearer ${token.trim()}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo historial:", error.response?.data || error.message);
    throw error;
  }
};