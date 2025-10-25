import React, { useEffect, useState } from "react";

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("usuarios")) || [];
    setUsuarios(data);
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <ul>
          {usuarios.map((u, i) => (
            <li key={i}>{u.nombre || "Usuario sin nombre"}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
