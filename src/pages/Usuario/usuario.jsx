import api from "axios";
import React, { useState, useEffect } from "react";


function usuario() {

    //Consulta os dados ao carregar a tela
    const [vproduto, setProduto] = useState([])  //Consulta os dados

    useEffect(() => {
        api.get("http://localhost:3001/produto")
            .then((response) => {
                setProduto(response.data)
                console.log(response.data)
            })
            .catch(err => console.error("Erro ao Buscar os dados", err))

    }, []);

    return (

        <div className="app-container">
            <div className="main-content">
                Usuarios Cadastrados
            </div>


            <div className="cards-container">
                {vproduto.map((produto) => (
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
export default usuario;
