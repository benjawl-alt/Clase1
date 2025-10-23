import React, { useEffect, useState } from "react";

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState("todos");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:8081/productos")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar los productos");
        return res.json();
      })
      .then((data) => setProductos(data))
      .catch((error) => {
        console.error("Error:", error);
        setError("No se pudieron cargar los productos");
      });
  }, []);

  const productosFiltrados =
    filtro === "todos"
      ? productos
      : productos.filter((p) => p.categoria.toLowerCase() === filtro.toLowerCase());

  return (
    <div style={{ maxWidth: "1000px", margin: "auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Catálogo de Autos</h1>

      {/* Botones de filtro */}
      <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "30px" }}>
        {["todos", "Sedán", "Deportivo", "SUV"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltro(cat)}
            style={{
              padding: "10px 20px",
              backgroundColor: filtro === cat ? "#007bff" : "#ddd",
              color: filtro === cat ? "white" : "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: filtro === cat ? "bold" : "normal",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Contenedor de productos en filas de 3 */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: "20px",
        }}
      >
        {productosFiltrados.map((p) => (
          <div
            key={p.id}
            style={{
              flex: "0 0 calc(33.333% - 20px)", // 3 por fila
              border: "1px solid #ccc",
              borderRadius: "10px",
              overflow: "hidden",
              textAlign: "center",
              backgroundColor: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              transition: "transform 0.2s ease",
            }}
          >
            <img
              src={`/images/${p.imagen}`}
              alt={`${p.marca} ${p.modelo}`}
              style={{ width: "100%", height: "200px", objectFit: "cover" }}
            />
            <div style={{ padding: "15px" }}>
              <h3 style={{ margin: "10px 0" }}>
                {p.marca} {p.modelo} ({p.anio})
              </h3>
              <p style={{ fontSize: "14px", color: "#555" }}>{p.descripcion}</p>
              <p style={{ fontWeight: "bold", color: "#007bff" }}>
                ${Number(p.precio).toLocaleString("es-CL")}
              </p>
              <button
                style={{
                  marginTop: "10px",
                  padding: "10px 15px",
                  border: "none",
                  backgroundColor: "#28a745",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      {productosFiltrados.length === 0 && !error && (
        <p style={{ textAlign: "center", marginTop: "30px" }}>No hay productos disponibles.</p>
      )}
    </div>
  );
}
