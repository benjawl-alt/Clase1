import React, { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [mensaje, setMensaje] = useState("");

  const validarEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const manejarSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    let nuevoErrors = { email: "", password: "" };

    if (!validarEmail(email)) {
      nuevoErrors.email = "Email inválido";
      valid = false;
    }
    if (password.length < 6) {
      nuevoErrors.password = "La contraseña debe tener al menos 6 caracteres";
      valid = false;
    }

    setErrors(nuevoErrors);

    if (!valid) return;

    // Aquí iría la petición al backend para autenticar
    // Ejemplo simulado:
    if (email === "admin@example.com" && password === "123456") {
      setMensaje("Inicio de sesión exitoso");
      setErrors({ email: "", password: "" });
      // Aquí guardarías el usuario en contexto/estado global
    } else {
      setMensaje("Email o contraseña incorrectos");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={manejarSubmit} noValidate>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>

        <button type="submit">Ingresar</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
