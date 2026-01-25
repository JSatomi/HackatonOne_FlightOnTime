import { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
// 1. IMPORTANTE: Importar el icono que falta
import { ArrowLeft } from "lucide-react";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
        firstname: "",
        lastname: "",
        email: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(form);
            // Si el registro es exitoso, lo mandamos al login o dashboard
            navigate("/");
        } catch (error) {
            alert(error.response?.data || "Error al registrar");
        }
    };

    return (
        <div className="grid place-content-center min-h-screen py-10 bg-slate-50">
            <div className="w-[380px]">
                <button
                    onClick={() => navigate("/")}
                    className="mb-4 flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors text-sm font-medium"
                >
                    <ArrowLeft size={16} /> Volver al Login
                </button>

                <div className="border-2 rounded-xl border-slate-200 p-8 bg-white shadow-lg">
                    <h2 className="text-2xl font-bold text-center mb-6 text-slate-800">Registro</h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {[
                            ["username", "Usuario"],
                            ["email", "Email"],
                            ["firstname", "Nombre"],
                            ["lastname", "Apellido"],
                            ["password", "Password", "password"],
                        ].map(([name, label, type = "text"]) => (
                            <div key={name} className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-500 uppercase ml-1">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    value={form[name]}
                                    onChange={handleChange}
                                    className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 outline-none transition"
                                    required
                                />
                            </div>
                        ))}

                        <button
                            type="submit"
                            style={{ backgroundColor: 'green', color: 'white', padding: '10px' }} // <--- Agrega esto
                        >
                            Crear cuenta
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}