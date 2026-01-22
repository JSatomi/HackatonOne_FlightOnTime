import { useEffect, useState } from "react";
import { getMyHistory } from "../services/predictionService";
import { useNavigate } from "react-router-dom";

function History() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getMyHistory();
        setHistory(data);
      } catch (error) {
        console.error(error);
        navigate("/");
      }
    };

    loadHistory();
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Historial de Predicciones</h2>

      {history.length === 0 ? (
        <p>No hay predicciones registradas</p>
      ) : (
        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>Aerolínea</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Fecha</th>
              <th>Resultado</th>
              <th>Probabilidad</th>
            </tr>
          </thead>
          <tbody>
            {history.map((p) => (
              <tr key={p.id}>
                <td>{p.airline}</td>
                <td>{p.origin}</td>
                <td>{p.destination}</td>
                <td>{p.departureDate}</td>
                <td>{p.prevision}</td>
                <td>{p.probabilidad}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <br />
      <button onClick={() => navigate("/dashboard")}>
        Volver al Dashboard
      </button>
    </div>
  );
}

export default History;



