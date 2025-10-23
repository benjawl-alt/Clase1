import React, { useState } from "react";

export default function Formulario() {
  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8081/usuarios/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      const data = await res.json();
      if (res.ok) {
        setMensaje("✅ Registro exitoso. Ahora puedes iniciar sesión.");
        setUsuario({ nombre: "", email: "", password: "" });
      } else {
        setMensaje("❌ " + (data.error || "Error al registrar usuario"));
      }
    } catch (error) {
      setMensaje("⚠️ Error de conexión con el servidor");
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Registro de Usuario</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "inline-block",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <div style={{ marginBottom: "10px" }}>
          <label>Nombre:</label>
          <br />
          <input
            type="text"
            name="nombre"
            value={usuario.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email:</label>
          <br />
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Contraseña:</label>
          <br />
          <input
            type="password"
            name="password"
            value={usuario.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Registrar</button>
      </form>

      {mensaje && <p style={{ marginTop: "15px" }}>{mensaje}</p>}
    </div>
  );
}
