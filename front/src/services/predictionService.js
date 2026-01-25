import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/prediction";

// En predictionService.js
export const predictFlight = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${token.trim()}` }
    });
    return response.data;
  } catch (error) {
    // Si el backend envió un error de validación (400)
    if (error.response && error.response.status === 400) {
      // Extraemos el mensaje (ajusta esto según cómo responda tu API)
      const serverMessage = error.response.data.message || "Error en los datos ingresados";
      throw new Error(serverMessage); 
    }
    throw new Error("Error de conexión con el servidor");
  }
};

// ... resto del archivo (getMyHistory) se mantiene igual

export const getMyHistory = async () => {
  const token = localStorage.getItem("token");

  if (!token) throw new Error("No autenticado");

  try {
    const response = await axios.get(`${API_URL}/myHistory`, {
      headers: {
        Authorization: `Bearer ${token.trim()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error obteniendo historial:", error.response?.data || error.message);
    throw error;
  }
};