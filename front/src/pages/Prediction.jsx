import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { predictFlight } from "../services/predictionService";
import { getAirlines, getAirports } from "../services/catalogService";
import { 
  Plane, LogOut, MapPin, Calendar, Ruler, 
  Send, CheckCircle, ArrowLeft, AlertCircle, Loader2 
} from "lucide-react";

function Prediction() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    aerolinea: "",
    origen: "",
    destino: "",
    fecha_partida: "",
    distancia_km: ""
  });

  const [airlines, setAirlines] = useState([]);
  const [airports, setAirports] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingCatalogs, setLoadingCatalogs] = useState(true);

  useEffect(() => {
    const fetchCatalogs = async () => {
      try {
        const [airlinesRes, airportsRes] = await Promise.all([
          getAirlines(),
          getAirports()
        ]);
        setAirlines(airlinesRes);
        setAirports(airportsRes);
      } catch (err) {
        setError("Error al cargar aerolíneas/aeropuertos.");
      } finally {
        setLoadingCatalogs(false);
      }
    };
    fetchCatalogs();
  }, []);

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

    // Validación de fecha
    if (new Date(form.fecha_partida) < new Date()) {
      setError("La fecha de partida no puede estar en el pasado.");
      return;
    }

    // Validación de ruta
    if (form.origen === form.destino) {
      setError("El origen y destino no pueden ser el mismo.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...form,
        distancia_km: parseInt(form.distancia_km, 10) 
      };

      const data = await predictFlight(payload);
      setResult(data);
    } catch (err) {
      const backendMessage = err.response?.data?.message || err.message || "Error al realizar la predicción.";
      setError(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  const isDelayed = result?.prevision?.toLowerCase().includes("retraso") || result?.prevision?.toLowerCase().includes("delayed");

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Plane className="text-blue-600 rotate-45" size={28} />
          <h1 className="text-xl font-bold text-blue-600">FlightOnTime</h1>
          <button onClick={() => navigate("/dashboard")} className="ml-4 flex items-center gap-1 text-slate-400 hover:text-blue-500 transition-colors text-sm font-medium">
            <ArrowLeft size={16} /> Volver
          </button>
        </div>
        <button onClick={logout} className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition shadow-sm">
          <LogOut size={20} /> <span>Cerrar sesión</span>
        </button>
      </nav>

      <main className="flex-grow flex flex-col items-center py-10 px-4">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">¡Nueva Predicción!</h2>
            <p className="text-slate-500 mt-2">Selecciona los datos oficiales de vuelo</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-center gap-3">
              <AlertCircle className="text-red-500 shrink-0" size={20} />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          {loadingCatalogs ? (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
              <Loader2 className="animate-spin mb-2" size={32} />
              <p>Cargando información...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="text-sm font-bold text-slate-600 ml-1">Aerolínea</label>
                  <div className="relative mt-1">
                    <Plane className="absolute left-3 top-3 text-slate-400" size={18} />
                    <select name="aerolinea" value={form.aerolinea} onChange={handleChange} required
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none appearance-none transition">
                      <option value="">Selecciona una aerolínea</option>
                      {airlines.map(air => (
                        <option key={`air-${air.id}`} value={air.code}>{air.name} ({air.code})</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* --- SELECT ORIGEN --- */}
                <div>
                  <label className="text-sm font-bold text-slate-600 ml-1">Origen</label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                    <select name="origen" value={form.origen} onChange={handleChange} required
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <option value="">Origen</option>
                      {airports.map(port => {
                        const code = port.iata_code || port.iataCode || "";
                        return (
                          <option key={`port-org-${port.id}`} value={code}>{code} - {port.city}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                {/* --- SELECT DESTINO --- */}
                <div>
                  <label className="text-sm font-bold text-slate-600 ml-1">Destino</label>
                  <div className="relative mt-1">
                    <MapPin className="absolute left-3 top-3 text-slate-400" size={18} />
                    <select name="destino" value={form.destino} onChange={handleChange} required
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl">
                      <option value="">Destino</option>
                      {airports.map(port => {
                        const code = port.iata_code || port.iataCode || "";
                        return (
                          <option key={`port-dest-${port.id}`} value={code}>{code} - {port.city}</option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-600 ml-1">Fecha y Hora</label>
                  <div className="relative mt-1">
                    <Calendar className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input type="datetime-local" name="fecha_partida" onChange={handleChange} required
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-bold text-slate-600 ml-1">Distancia (KM)</label>
                  <div className="relative mt-1">
                    <Ruler className="absolute left-3 top-3 text-slate-400" size={18} />
                    <input type="number" name="distancia_km" placeholder="Ej. 1010" onChange={handleChange} required
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl" />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full mt-4 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg disabled:bg-slate-300">
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Calcular </>}
              </button>
            </form>
          )}

          {result && (
            <div className={`mt-8 p-6 border rounded-2xl animate-in fade-in zoom-in duration-300 ${isDelayed ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
              <div className={`flex items-center gap-2 mb-3 ${isDelayed ? 'text-red-700' : 'text-green-700'}`}>
                {isDelayed ? <AlertCircle size={20} /> : <CheckCircle size={20} />}
                <h3 className="font-bold">Resultado del Análisis</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded-xl border shadow-sm text-center">
                  <span className="text-[10px] uppercase font-black text-slate-400 block">Previsión</span>
                  <span className={`text-xl font-bold ${isDelayed ? 'text-red-600' : 'text-green-600'}`}>
                    {result.prevision}
                  </span>
                </div>
                <div className="bg-white p-3 rounded-xl border shadow-sm text-center">
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