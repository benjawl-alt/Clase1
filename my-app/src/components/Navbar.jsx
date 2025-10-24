import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

export default function Navbar() {
  const { usuario, setUsuario, carrito } = useContext(CarritoContext);

  const total = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  );

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    setUsuario("");
  };

  return (
    <header id="header" style={styles.header}>
      <nav id="nav" style={styles.nav}>
        <ul style={styles.ul}>
          <li><NavLink to="/" end>Inicio</NavLink></li>
          <li><NavLink to="/productos">Modelos</NavLink></li>
          <li><NavLink to="/blogs">Blogs</NavLink></li>
          <li><NavLink to="/carrito">Carrito</NavLink></li>
          <li><NavLink to="/nosotros">Nosotros</NavLink></li>
          <li><NavLink to="/contacto">Contacto</NavLink></li>
          <li><NavLink to="/formulario">Registro</NavLink></li>
          {!usuario && (
            <li>
              <NavLink to="/login">Iniciar Sesión</NavLink>
            </li>
          )}
        </ul>

        {usuario && (
          <div style={styles.user}>
            <span>{usuario}</span>
            <span style={styles.total}>
            </span>
            <button style={styles.btnLogout} onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

const styles = {
  header: {
    background: "#1c1d26",
    padding: "15px 0",
  },
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  ul: {
    display: "flex",
    gap: "25px",
    listStyle: "none",
    justifyContent: "center",
    flexGrow: 1,
    margin: 0,
    padding: 0,
  },
  user: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#fff",
    whiteSpace: "nowrap",
  },
  total: {
    background: "#1c1d26",
    padding: "6px 10px",
    borderRadius: "8px",
  },
  btnLogout: {
    background: "#e74c3c",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    padding: "6px 10px",
    cursor: "pointer",
  },
};
