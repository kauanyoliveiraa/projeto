import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      toast.warning("⚠️ Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.get("http://localhost:3001/usuario");

      const usuarioEncontrado = response.data.find(
        (u) => u.email === email && u.senha === senha
      );

      if (usuarioEncontrado) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

        toast.success(`✅ Bem-vindo, ${usuarioEncontrado.nome}!`, {
          position: "top-center",
          autoClose: 1500,
        });

        // Redireciona após breve atraso
        setTimeout(() => {
          navigate("/home");
        }, 1600);
      } else {
        toast.error("❌ Email ou senha incorretos!", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("Erro ao verificar login:", error);
      toast.error("❌ Erro ao conectar ao servidor.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-image">{/* imagem lateral opcional */}</div>

      <div className="login-form-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Bem-vindo!</h2>
          <p>Entre na sua conta para continuar</p>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          {/* 🔗 Botão com link embutido */}
          <button type="submit" className="btn-login">
            Entrar
          </button>

          <div className="login-footer">
            <p>
              Não possui conta? <Link to="/registro">Registre-se</Link>
            </p>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Login;
