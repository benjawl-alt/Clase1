import React, { useContext, useState, useEffect } from "react";
import productosData from "../../data/dataProductos";
import { CarritoContext } from "../context/CarritoContext";

const Productos = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [mensaje, setMensaje] = useState(""); 
  const { agregarAlCarrito, usuario } = useContext(CarritoContext);

  const categorias = ["Todos", "Sedán", "SUV", "Deportivo"];

  const productosFiltrados =
    categoriaSeleccionada === "Todos"
      ? productosData
      : productosData.filter((p) => p.categoria === categoriaSeleccionada);

  const handleAgregar = (producto) => {
    if (!usuario) {
      alert("Debes iniciar sesión para agregar productos al carrito.");
      return;
    }
    agregarAlCarrito(producto);
    setMensaje(`${producto.marca} ${producto.modelo} agregado al carrito.`); // 🆕 Actualizar el mensaje
  };

  // 🆕 Ocultar el mensaje después de 3 segundos
  useEffect(() => {
    if (mensaje) {
      const timer = setTimeout(() => {
        setMensaje("");
      }, 3000); // 3000 milisegundos = 3 segundos
      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [mensaje]);

  return (
    <div style={styles.container}>
      <h2>Catálogo de Autos</h2>

      <div style={styles.filtros}>
        {categorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => setCategoriaSeleccionada(categoria)}
            style={{
              ...styles.boton,
              backgroundColor:
                categoriaSeleccionada === categoria ? "#333" : "#555",
            }}
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* 🆕 Aquí se muestra el mensaje */}
      {mensaje && <div style={styles.mensajeExito}>{mensaje}</div>}

      <div style={styles.grid}>
        {productosFiltrados.map((p) => (
          <div key={p.id} style={styles.card}>
            <img src={p.imagen} alt={p.modelo} style={styles.imagen} />
            <h3 style={styles.nombre}>
              {p.marca} {p.modelo}
            </h3>
            <p style={styles.precio}>${p.precio.toLocaleString("es-CL")}</p>
            <button style={styles.btn} onClick={() => handleAgregar(p)}>
              Agregar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
// 🎨 Estilos mantenidos (3x3, colores originales)
const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
    maxWidth: "1200px",
    margin: "auto",
  },
  titulo: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#fff",
  },
  filtros: {
    marginBottom: "25px",
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    flexWrap: "wrap",
  },
  boton: {
    padding: "10px 15px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#555",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "25px",
    justifyContent: "center",
    justifyItems: "center",
  },
  card: {
    backgroundColor: "#645c5cff",
    borderRadius: "15px",
    padding: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    textAlign: "center",
    transition: "transform 0.2s, box-shadow 0.2s",
    width: "100%",
    maxWidth: "320px",
  },
  imagen: {
    width: "100%",
    height: "220px",
    objectFit: "contain",
    borderRadius: "10px",
  },
  nombre: {
    marginTop: "10px",
    fontWeight: "bold",
    fontSize: "1.1rem",
    color: "#fff",
  },
  descripcion: {
    color: "#eaeaea",
    fontSize: "0.9rem",
  },
  color: {
    color: "#e5e5e5",
    fontSize: "0.9rem",
  },
  precio: {
    fontWeight: "bold",
    color: "#e8edf0ff",
    margin: "10px 0",
  },
  categoria: {
    fontSize: "0.9rem",
    color: "#ddd",
  },
  botonCarrito: {
    marginTop: "10px",
    padding: "10px 15px",
    backgroundColor: "#4739389a",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  "@media (max-width: 900px)": {
    grid: { gridTemplateColumns: "repeat(2, 1fr)" },
  },
  "@media (max-width: 600px)": {
    grid: { gridTemplateColumns: "1fr" },
  },
};

export default Productos;
