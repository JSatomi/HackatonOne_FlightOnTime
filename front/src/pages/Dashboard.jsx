import { useEffect, useState } from "react";
import { getLoggedUser } from "../services/userService";
import { useNavigate } from "react-router-dom";
// Se realiza la importanción de íconos
import { Plane, History, LogOut, User as UserIcon } from "lucide-react";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }
        const data = await getLoggedUser();
        setUser(data);
      } catch (error) {
        console.error("Error al obtener usuario:", error);
        navigate("/");
      }
    };
    loadUser();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Navbar Superior */}
      <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

        <div className="flex items-center gap-2">
                  <Plane className="text-blue-600 rotate-45" size={28} />
                  <h1 className="text-xl font-bold text-blue-600">FlightOnTime-H12-25-L-Equipo 21</h1>
        </div>

        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition shadow-sm"
        >
          <LogOut size={20} />
          <span>Cerrar sesión</span>
        </button>
      </nav>

      {/* Contenido Principal */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden p-8 border border-gray-100">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-bold uppercase">
              {user.username.charAt(0)}
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Bienvenido, {user.username}</h2>
            <p className="text-gray-500">{user.email}</p>

            <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full uppercase tracking-wide">
              Rol: {user.role}
            </span>
          </div>

          <div className="space-y-4">
            <button
              onClick={() => navigate("/prediction")}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition transform hover:-translate-y-0.5 active:scale-95 shadow-lg shadow-blue-200"
            >
              Nueva Predicción
            </button>

            <button
              onClick={() => navigate("/history")}
              className="flex items-center justify-center w-full py-3 px-4 bg-white text-gray-700 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition transform hover:-translate-y-0.5 shadow-sm"
            >
              <History size={22} />
                            Ver historial
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;