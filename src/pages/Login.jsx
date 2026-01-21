import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

function Login() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // <-- aquí corregido

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
      }

    } catch (err) {
      console.log(err.response || err);
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div style={{ textAlign:"center", marginTop:"100px" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        /><br/><br/>

        <input 
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        /><br/><br/>

        <button type="submit">Ingresar</button>
      </form>

      {error && <p style={{color:"red"}}>{error}</p>}
    </div>
  );
}

export default Login;

