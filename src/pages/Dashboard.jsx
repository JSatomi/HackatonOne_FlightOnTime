import { useEffect, useState } from "react";
import { getLoggedUser } from "../services/userService";
import { useNavigate } from "react-router-dom";

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
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  if (!user) return <p>Cargando usuario...</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Bienvenido {user.username}</h2>
      <p>Email: {user.email}</p>
      <p>Rol: {user.role}</p>

<button onClick={() => navigate("/prediction")}>
  Nueva Predicción
</button>

<button onClick={() => navigate("/history")}>
  Ver historial
</button>


      <br />
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}

export default Dashboard;
