import React, { useEffect, useState } from "react";

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("productos")) || [];
    setProductos(data);
  }, []);

  return (
    <div>
      <h1>Productos</h1>
      <p>Total de productos: {productos.length}</p>
      <ul>
        {productos.map((p) => (
          <li key={p.id}>
            {p.marca} {p.modelo} - ${p.precio.toLocaleString("es-CL")}
          </li>
        ))}
      </ul>
    </div>
  );
}
