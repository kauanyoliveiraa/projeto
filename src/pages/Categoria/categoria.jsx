// npm install react-hook-form
// npm install axios
// npm install -g json-server
// npm install json-server

// comandos de inicialização:
// npm run dev
// npx json-server --watch db.json --port 3001

import { useState, useEffect } from "react";
import React from "react";
import api from "axios";

const Categoria = () => {
  const [vcategoria, setCategoria] = useState([]);

  // Campos do formulário
  const [vnome, setNome] = useState("");

  // Edição
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Buscar categorias ao carregar o componente
  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const res = await api.get("http://localhost:3001/categoria");
      setCategoria(res.data);
      console.log("Categorias carregadas:", res.data); // debug (pode remover)
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  };

  // Submeter formulário
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      nome: vnome,
    };

    console.log("Dados a enviar:", dataToSend); // debug (pode remover)

    try {
      if (isEditing) {
        await api.put(`http://localhost:3001/categoria/${editingId}`, dataToSend);
      } else {
        await api.post("http://localhost:3001/categoria", dataToSend);
      }

      fetchCategorias();
      resetForm();
    } catch (err) {
      console.error("Erro ao salvar categoria:", err);
    }
  };

  // Editar
  const handleEdit = (categoria) => {
    setIsEditing(true);
    setEditingId(categoria.id);
    setNome(categoria.nome);
  };

  // Deletar
  const handleDelete = async (id) => {
    try {
      await api.delete(`http://localhost:3001/categoria/${id}`);
      fetchCategorias();
    } catch (err) {
      console.error("Erro ao deletar categoria:", err);
    }
  };

  // Resetar formulário
  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setNome("");
  };

  return (
    <div>
      <div className="app-container">
        <div className="main-content">Cadastro Categoria</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={vnome}
              required
              onChange={(e) => setNome(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button type="submit">{isEditing ? "Atualizar" : "Cadastrar"}</button>
          </div>

          {isEditing && (
            <div className="form-group">
              <button type="button" onClick={resetForm}>
                Cancelar
              </button>
            </div>
          )}
        </form>
      </div>

      <div className="app-container">
        <div className="main-content">Categorias Cadastradas</div>
        <ul>
          {vcategoria.map((categoria) => (
            <li key={categoria.id}>
              {categoria.nome}
              <div>
                <button onClick={() => handleEdit(categoria)}>Editar</button>
                <button onClick={() => handleDelete(categoria.id)}>Deletar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Categoria;
