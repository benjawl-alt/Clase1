import React, { useEffect, useState } from "react";

export default function Carrito() {
  const [carrito, setCarrito] = useState([]);
  const id_usuario = 1; // Cambia este valor al ID del usuario logueado

  useEffect(() => {
    fetch(`http://localhost:8081/carrito/${id_usuario}`)
      .then((res) => res.json())
      .then((data) => setCarrito(data))
      .catch((error) => {
        console.error("Error cargando carrito:", error);
      });
  }, [id_usuario]);

  return (
    <div>
      <h2>Carrito de compras</h2>
      {carrito.length === 0 ? (
        <p>No hay productos en el carrito.</p>
      ) : (
        <ul>
          {carrito.map((item) => (
            <li key={item.id}>
              {item.marca} {item.modelo} - Cantidad: {item.cantidad} - Precio unitario: ${item.precio_unitario.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
