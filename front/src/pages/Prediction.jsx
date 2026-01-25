import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { predictFlight } from "../services/predictionService";
import { Plane, LogOut, MapPin, Calendar, Ruler, Send, CheckCircle, ArrowLeft, AlertCircle } from "lucide-react";

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
  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().slice(0, 16);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);

    // CALCULAMOS LAS FECHAS JUSTO AL MOMENTO DEL CLIC
    const fechaSeleccionada = new Date(form.fecha_partida);
    const ahora = new Date();

    // VALIDACIÓN DE FECHA PASADA
    if (fechaSeleccionada < ahora) {
      setError("La fecha de partida no puede estar en el pasado.");
      return; 
    }

    // VALIDACIÓN ORIGEN VS DESTINO
    if (form.origen.trim().toLowerCase() === form.destino.trim().toLowerCase()) {
      setError("El aeropuerto de origen y destino no pueden ser el mismo.");
      return;
    }

    setLoading(true);
    try {
      const data = await predictFlight(form);
      setResult(data);
    } catch (err) {
      // 2. CAPTURA DE ERRORES DEL BACKEND (@Future)
      setError(err.message || "Error al realizar la predicción. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Plane className="text-blue-600 rotate-45" size={28} />
          <h1 className="text-xl font-bold text-blue-600">
            FlightOnTime-H12-25-L-Equipo 21
          </h1>
          <button
            onClick={() => navigate("/dashboard")}
            className="ml-4 flex items-center gap-1 text-slate-400 hover:text-blue-500 transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} /> Volver
          </button>
        </div>

        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition shadow-sm"
        >
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </button>
      </nav>

      {/* CONTENIDO */}
      <main className="flex-grow flex flex-col items-center py-10 px-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Nueva Predicción</h2>
            <p className="text-slate-500 mt-2">Completa los datos del vuelo</p>
          </div>

          {/* BANNER DE ERROR DINÁMICO */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-center gap-3 animate-pulse-subtle">
              <AlertCircle className="text-red-500 shrink-0" size={20} />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="text-sm font-bold text-slate-600 ml-1">Aerolínea</label>
                <div className="relative mt-1">
                  <Plane className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input name="aerolinea" placeholder="Ej. DL" onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" required />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-600 ml-1">Origen</label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input name="origen" placeholder="Ej. LGA" onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${error.includes("origen") ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition`} required />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-600 ml-1">Destino</label>
                <div className="relative mt-1">
                  <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input name="destino" placeholder="Ej. TPA" onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${error.includes("destino") ? 'border-red-300' : 'border-slate-200'} rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition`} required />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-600 ml-1">Fecha y Hora</label>
                <div className="relative mt-1">
                  <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input
                    type="datetime-local"
                    name="fecha_partida"
                    // Usamos el valor mínimo dinámico
                   // min={today}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-slate-50 border ${error.toLowerCase().includes("fecha") ? 'border-red-300' : 'border-slate-200'
                      } rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition`}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-600 ml-1">Distancia (KM)</label>
                <div className="relative mt-1">
                  <Ruler className="absolute left-3 top-3 text-slate-400" size={18} />
                  <input type="number" name="distancia_km" placeholder="Ej. 1010" onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" required />
                </div>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full mt-4 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg disabled:bg-slate-300">
              {loading ? "Analizando..." : <><Send size={20} /> Calcular </>}
            </button>
          </form>

          {/* RESULTADO */}
          {result && (
            <div className="mt-8 p-6 bg-green-50 border border-green-100 rounded-2xl animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-2 mb-3 text-green-700">
                <CheckCircle size={20} />
                <h3 className="font-bold">Resultado del Análisis</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-xl border border-green-50 shadow-sm">
                  <span className="text-[10px] uppercase font-black text-slate-400 block">Previsión</span>
                  <span className={`text-xl font-bold ${result.prevision === 'A tiempo' ? 'text-green-600' : 'text-amber-600'}`}>
                    {result.prevision}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border border-green-50 shadow-sm">
                  <span className="text-[10px] uppercase font-black text-slate-400 block">Confianza</span>
                  <span className="text-xl font-bold text-blue-600">
                    {(parseFloat(result.probabilidad) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Prediction;