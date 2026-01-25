import { useEffect, useState } from "react";
import { getMyHistory } from "../services/predictionService";
import { useNavigate } from "react-router-dom";
// Importamos los iconos para consistencia
import { Plane, LogOut, ArrowLeft, Clock, Calendar, MapPin, Activity } from "lucide-react";

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await getMyHistory();
        setHistory(data);
      } catch (error) {
        console.error(error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">

      {/* TU NAVBAR PERSONALIZADA */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
          <Plane className="text-blue-600 rotate-45" size={28} />
          <h1 className="text-xl font-bold text-blue-600">
            FlightOnTime-H12-25-L-Equipo 21
          </h1>
        </div>

        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition shadow-sm"
        >
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </button>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-grow p-6 md:p-10 max-w-6xl mx-auto w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Historial</h2>
            <p className="text-slate-500">Registro de todas tus consultas de vuelo</p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 text-blue-600 font-semibold hover:bg-blue-50 px-4 py-2 rounded-xl transition"
          >
            <ArrowLeft size={20} /> Volver al Dashboard
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-sm border border-slate-100">
            <Clock size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-500 text-lg">Aún no hay predicciones registradas.</p>
            <button
              onClick={() => navigate("/prediction")}
              className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Realizar mi primera predicción →
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100">
                    <th className="px-6 py-4 text-xs uppercase font-black text-slate-400 tracking-wider">Vuelo</th>
                    <th className="px-6 py-4 text-xs uppercase font-black text-slate-400 tracking-wider">Ruta</th>
                    <th className="px-6 py-4 text-xs uppercase font-black text-slate-400 tracking-wider">Fecha</th>
                    <th className="px-6 py-4 text-xs uppercase font-black text-slate-400 tracking-wider">Resultado</th>
                    <th className="px-6 py-4 text-xs uppercase font-black text-slate-400 tracking-wider text-center">Probabilidad</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {history.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <Plane size={18} />
                          </div>
                          <span className="font-bold text-slate-700">{p.airline}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-600">
                          <span className="font-medium">{p.origin}</span>
                          <span className="text-slate-300">→</span>
                          <span className="font-medium">{p.destination}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-slate-500 text-sm">
                          <Calendar size={14} />
                          {new Date(p.departureDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                          p.prevision === 'A TIEMPO'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {p.prevision}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex flex-col items-center">
                           <span className="text-blue-600 font-black">{p.probabilidad}%</span>
                           <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                              <div
                                className="h-full bg-blue-500"
                                style={{ width: `${p.probabilidad}%` }}
                              ></div>
                           </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default History;