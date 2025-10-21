//npm install react-hook-form
//npm install axios
//npm install -g json-server
//npm install json-server

//comandos de inicializacao
//npm run dev
//npx json-server --watch db.json --port 3001

import { useState, useEffect } from "react";
import React from "react";
import api from "axios";

const Produto = () => {
  const [usuarios, setProduto] = useState([]);
  const [vcategoria, setCategoria] = useState([]);

  // ==================== CAMPOS DO FORMULÁRIO ====================
  const [vnome, setNome] = useState("");
  const [vdesc, setDesc] = useState("");
  const [vpreco, setPreco] = useState("");
  const [vimg, setImg] = useState("");
  const [vcategoriaId, setCategoriaId] = useState("");

  // ==================== EDIÇÃO ====================
  const [isEditing, setIsEditing] = useState(false); // true se estiver editando
  const [editingId, setEditingId] = useState(null);  // id do produto que está editando

  // ==================== BUSCAR PRODUTOS ====================
  useEffect(() => {
    api.get("http://localhost:3001/produto")
      .then(res => setProduto(res.data))
      .catch(() => console.error("Erro ao buscar produtos"));
  }, []);

  // ==================== BUSCAR CATEGORIAS ====================
  useEffect(() => {
    api.get("http://localhost:3001/categoria")
      .then(res => setCategoria(res.data))
      .catch(() => console.error("Erro ao buscar categorias"));
  }, []);

  // ==================== CADASTRAR OU ATUALIZAR PRODUTO ====================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = {
      nome: vnome,
      descricao: vdesc,
      precovenda: vpreco,
      imagem: vimg,
      categoria_id: vcategoriaId,
      status: "Ativo"
    };

    try {
      if (isEditing) {
        // ======= INÍCIO DA ATUALIZAÇÃO (EDIÇÃO) =======
        await api.put(`http://localhost:3001/produto/${editingId}`, dataToSend);
        // ======= FIM DA ATUALIZAÇÃO =======
      } else {
        await api.post("http://localhost:3001/produto", dataToSend);
      }

      // Atualiza a lista após cadastrar ou editar
      const res = await api.get("http://localhost:3001/produto");
      setProduto(res.data);
      resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  // ==================== CARREGAR PRODUTO PARA EDIÇÃO ====================
  const handleEdit = (prod) => {
    setIsEditing(true);
    setEditingId(prod.id);
    setNome(prod.nome);
    setDesc(prod.descricao);
    setPreco(prod.precovenda);
    setImg(prod.imagem);
    setCategoriaId(prod.categoria_id || "");
  };

  // ==================== DELETAR PRODUTO ====================
  const handleDelete = async (id) => {
    try {
      await api.delete(`http://localhost:3001/produto/${id}`);
      const res = await api.get("http://localhost:3001/produto");
      setProduto(res.data);
    } catch (err) {
      console.error("Erro ao deletar produto", err);
    }
  };

  // ==================== RESETAR FORMULÁRIO ====================
  const resetForm = () => {
    setIsEditing(false);
    setEditingId(null);
    setNome("");
    setDesc("");
    setPreco("");
    setImg("");
    setCategoriaId("");
  };

  return (
    <div>
      <div className="app-container">
        <div className="main-content">Cadastro de Produto</div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input type="text" value={vnome} required onChange={(e) => setNome(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <input type="text" value={vdesc} onChange={(e) => setDesc(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Preço</label>
            <input type="text" value={vpreco} onChange={(e) => setPreco(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Categoria</label>
            <select value={vcategoriaId} required onChange={(e) => setCategoriaId(e.target.value)}>
              <option value="">Selecione a categoria</option>
              {vcategoria.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Imagem</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => setImg(reader.result);
                if (file) reader.readAsDataURL(file);
              }}
            />
          </div>

<div className="form-group">
  <button type="submit">{isEditing ? "Atualizar" : "Cadastrar"}</button>
</div>

{isEditing && (
  <div className="form-group">
    <button type="button" onClick={resetForm}>Cancelar</button>
  </div>
)}
        </form>
      </div>

      <div className="app-container">
        <div className="main-content">Produtos Cadastrados</div>
        <ul>
          {usuarios.map(produto => (
            <li key={produto.id}>
              {produto.nome} - {produto.descricao} - {produto.precovenda}
              <div>
                <button onClick={() => handleEdit(produto)}>Editar</button>
                <button onClick={() => handleDelete(produto.id)}>Deletar</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Produto; 