import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Prediction from "./pages/Prediction";
import History from "./pages/History";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/prediction" element={<Prediction />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;

