import React, { useEffect, useState } from "react";

export default function CategoriasAdmin() {
  const baseCategorias = ["Sedán", "SUV", "Deportivo"];
  const [categorias, setCategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState("");
  const [editando, setEditando] = useState(null);
  const [valorEditado, setValorEditado] = useState("");

  
  useEffect(() => {
    const guardadas = JSON.parse(localStorage.getItem("categorias")) || [];
    
    const todas = Array.from(new Set([...baseCategorias, ...guardadas]));
    setCategorias(todas);
  }, []);

  
  const guardarEnLocalStorage = (lista) => {
    const personalizadas = lista.filter((c) => !baseCategorias.includes(c));
    localStorage.setItem("categorias", JSON.stringify(personalizadas));
    // 🔔 Notifica a otros componentes
    window.dispatchEvent(new Event("categoriasActualizadas"));
  };

 
  const agregarCategoria = () => {
    const nombre = nuevaCategoria.trim();
    if (!nombre) return;
    if (categorias.includes(nombre)) return alert("Esa categoría ya existe.");

    const nuevas = [...categorias, nombre];
    setCategorias(nuevas);
    guardarEnLocalStorage(nuevas);
    setNuevaCategoria("");
  };

  
  const eliminarCategoria = (nombre) => {
    if (baseCategorias.includes(nombre)) {
      alert("No puedes eliminar una categoría base.");
      return;
    }
    const nuevas = categorias.filter((c) => c !== nombre);
    setCategorias(nuevas);
    guardarEnLocalStorage(nuevas);
  };

  
  const iniciarEdicion = (index, valor) => {
    if (baseCategorias.includes(valor)) {
      alert("No puedes editar una categoría base.");
      return;
    }
    setEditando(index);
    setValorEditado(valor);
  };

  const guardarEdicion = (index) => {
    if (!valorEditado.trim()) return;
    const nuevas = [...categorias];
    nuevas[index] = valorEditado.trim();
    setCategorias(nuevas);
    guardarEnLocalStorage(nuevas);
    setEditando(null);
    setValorEditado("");
  };

  const cancelarEdicion = () => {
    setEditando(null);
    setValorEditado("");
  };

  return (
    <div>
      <h1>Categorías</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={nuevaCategoria}
          onChange={(e) => setNuevaCategoria(e.target.value)}
          placeholder="Nueva categoría"
          style={{ padding: "8px", marginRight: "10px", borderRadius: "6px" }}
        />
        <button onClick={agregarCategoria}>Agregar</button>
      </div>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {categorias.map((cat, i) => (
          <li
            key={i}
            style={{
              background: "#2a2a3d",
              marginBottom: "8px",
              padding: "10px",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {editando === i ? (
              <div style={{ flexGrow: 1 }}>
                <input
                  type="text"
                  value={valorEditado}
                  onChange={(e) => setValorEditado(e.target.value)}
                  style={{
                    padding: "6px",
                    borderRadius: "6px",
                    width: "80%",
                    marginRight: "10px",
                  }}
                />
                <button
                  onClick={() => guardarEdicion(i)}
                  style={{ marginRight: "6px" }}
                >
                  Guardar
                </button>
                <button onClick={cancelarEdicion}>Cancelar</button>
              </div>
            ) : (
              <>
                <span>{cat}</span>
                <div>
                  {!baseCategorias.includes(cat) && (
                    <>
                      <button
                        onClick={() => iniciarEdicion(i, cat)}
                        style={{ marginRight: "10px" }}
                      >
                        Editar
                      </button>
                      <button onClick={() => eliminarCategoria(cat)}>
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
