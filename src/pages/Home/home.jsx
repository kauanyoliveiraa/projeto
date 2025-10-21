import api from "axios";
import React, { useState, useEffect } from "react";

function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    api.get("http://localhost:3001/produto")
      .then((response) => {
        setProdutos(response.data);
        console.log(response.data);
      })
      .catch(err => console.error("Erro ao buscar os dados", err));
  }, []);

  return (
    <div className="app-container">
      <div className="main-content">
        Usuários Cadastrados
      </div>

      <div className="cards-container">
        {produtos.length === 0 && <p>Nenhum usuário cadastrado.</p>}

        {produtos.map((produto) => (
          <div key={produto.id} className="produto-card">
            {produto.imagem && (
              <img src={produto.imagem} alt={produto.nome} className="produto-imagem" />
            )}
            <h3>{produto.nome}</h3>
            <p>R$ {produto.preco}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
