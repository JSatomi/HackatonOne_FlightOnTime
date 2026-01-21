import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { predictFlight } from "../services/predictionService";

function Prediction() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    aerolinea: "",
    origen: "",
    destino: "",
    fecha_partida: "",
    distancia_km: ""
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await predictFlight(form);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Error al realizar la predicción");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>

      {/* BOTONES SUPERIORES */}
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"30px" }}>
        <button onClick={() => navigate("/dashboard")}>Volver</button>
        <button onClick={logout}>Cerrar sesión</button>
      </div>

      <h2>Nueva Predicción</h2>

      <form onSubmit={handleSubmit}>
        <input name="aerolinea" placeholder="Aerolínea" onChange={handleChange} /><br/><br/>
        <input name="origen" placeholder="Origen" onChange={handleChange} /><br/><br/>
        <input name="destino" placeholder="Destino" onChange={handleChange} /><br/><br/>
        <input type="datetime-local" name="fecha_partida" onChange={handleChange} /><br/><br/>
        <input type="number" name="distancia_km" placeholder="Distancia KM" onChange={handleChange} /><br/><br/>

        <button type="submit">Predecir</button>
      </form>

      {error && <p style={{color:"red"}}>{error}</p>}

      {result && (
        <div style={{ marginTop:"30px" }}>
          <h3>Resultado</h3>
          <p>Previsión: {result.prevision}</p>
          <p>Probabilidad: {result.probabilidad}</p>
        </div>
      )}
    </div>
  );
}

export default Prediction;

