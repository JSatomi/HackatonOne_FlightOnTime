import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisibleError, setIsVisibleError] = useState(false);
  const passwordInputRef = useRef(null);

  const navigate = useNavigate(); // <-- aquí corregido

  const mostrarError = () => {
    setIsVisibleError(true);
    setPassword("");
    passwordInputRef.current?.focus();
    setTimeout(() => {
      setIsVisibleError(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await login(username, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        alert("Login exitoso!");
        navigate("/dashboard");
      } else {
        setError("Credenciales incorrectas");
        mostrarError();
      }
    } catch (err) {
      console.log(err.response || err);
      setError("Credenciales incorrectas");
      mostrarError();
    }
  };

  return (
    <div className="grid place-content-center h-screen">
      <div class="border-2 rounded-md  border-black-500 w-sm m-2 p-5">
        <h2 className="text-2xl text-center">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600 ml-1">
              Usuario
            </label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600 ml-1">
              Contraseña
            </label>
            <input
              ref={passwordInputRef}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
            />
          </div>

          <div className="flex justify-center">
            <button
              className="bg-green-500  hover:bg-green-800 text-white items-center border-2 border-white rounded-sm 
              px-4 py-2"
              type="submit"
            >
              Ingresar
            </button>
          </div>
        </form>

        {isVisibleError && error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
