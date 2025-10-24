import React from "react";
import { Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import Navbar from "./components/Navbar";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Nosotros from "./pages/Nosotros";
import Formulario from "./pages/Formulario";

import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Blogs from "./pages/Blogs";
import Contacto from "./pages/Contacto";
import Comprobante_pago from "./pages/Comprobante_pago";
import Checkout from "./pages/Checkout";
import "./App.css";

function App() {
  return (
    <CarritoProvider>
      <Navbar />
      <div style={{ padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/comprobante" element={<Comprobante_pago />} />
        </Routes>
      </div>
    </CarritoProvider>
  );
}

export default App;
