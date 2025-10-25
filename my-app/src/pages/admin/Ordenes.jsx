import React, { useEffect, useState } from "react";

export default function Ordenes() {
  const [ordenes, setOrdenes] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("compras")) || [];
    setOrdenes(data);
  }, []);

  return (
    <div>
      <h1>Órdenes</h1>
      {ordenes.length === 0 ? (
        <p>No hay órdenes registradas.</p>
      ) : (
        <ul>
          {ordenes.map((o, i) => (
            <li key={i}>
              #{i + 1} — Total: ${o.total?.toLocaleString("es-CL") ?? 0}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
