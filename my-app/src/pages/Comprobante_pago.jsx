import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CarritoContext } from "../context/CarritoContext";

const Comprobante_pago = () => {
  const [carrito, setCarrito] = useState([]);
  const [datos, setDatos] = useState({});
  const [total, setTotal] = useState(0);
  const { vaciarCarrito } = useContext(CarritoContext);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalGuardado = JSON.parse(localStorage.getItem("total")) || 0;
    const datosEntrega = JSON.parse(localStorage.getItem("datosEntrega")) || {};

    console.log("🧾 Datos cargados:", { data, totalGuardado, datosEntrega });

    setCarrito(data);
    setTotal(totalGuardado);
    setDatos(datosEntrega);
  }, []);

  const handleVolverInicio = () => {
    // 🧹 Limpiar carrito y localStorage al volver al inicio
    localStorage.removeItem("carrito");
    localStorage.removeItem("total");
    if (vaciarCarrito) vaciarCarrito();

    navigate("/");
  };

  return (
    <div style={styles.container}>
      <h2>Comprobante de pago</h2>
      <p>
        Gracias por tu compra, <b>{datos.nombre || "Cliente"}</b>!
      </p>

      <h3>Resumen del pedido:</h3>
      {carrito.length > 0 ? (
        <ul>
          {carrito.map((item) => (
            <li key={item.id}>
              {item.marca} {item.modelo} x {item.cantidad} — $
              {(item.precio * item.cantidad).toLocaleString("es-CL")}
            </li>
          ))}
        </ul>
      ) : (
        <p>No se encontró información del carrito.</p>
      )}

      <h3>Total pagado: ${Number(total).toLocaleString("es-CL")}</h3>

      <h4>Datos de envío:</h4>
      {datos.calle ? (
        <>
          <p>
            {datos.calle}
            {datos.departamento ? `, Depto ${datos.departamento}` : ""},{" "}
            {datos.comuna}, {datos.region}
          </p>
          {datos.indicaciones && <p>Indicaciones: {datos.indicaciones}</p>}
        </>
      ) : (
        <p>No se encontraron datos de envío.</p>
      )}

      <p style={{ marginTop: "20px" }}>
        Te enviaremos la confirmación a:{" "}
        <b>{datos.correo || "correo no disponible"}</b>
      </p>

      <button style={styles.btnInicio} onClick={handleVolverInicio}>
         Volver al inicio
      </button>
    </div>
  );
};
const styles = {
  container: {
    padding: "30px",
    maxWidth: "600px",
    margin: "auto",
    textAlign: "left",
    backgroundColor: "#6a6b74ff",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};

export default Comprobante_pago;
