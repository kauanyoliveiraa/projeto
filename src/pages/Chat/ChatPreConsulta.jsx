import React, { useEffect, useState, useRef } from "react";
import axios from "axios";

const ChatPreConsulta = () => {
  const [mensagens, setMensagens] = useState([]);
  const [inputMsg, setInputMsg] = useState("");
  const messagesEndRef = useRef(null);

  const fetchMensagens = async () => {
    try {
      const res = await axios.get("http://localhost:3001/chat?_sort=data&_order=asc");
      setMensagens(res.data);
      scrollToBottom();
    } catch (error) {
      console.error("Erro ao carregar mensagens", error);
    }
  };

  useEffect(() => {
    fetchMensagens();
    const interval = setInterval(fetchMensagens, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const enviarMensagem = async () => {
    if (!inputMsg.trim()) return;

    const novaMensagem = {
      usuario: "paciente",
      mensagem: inputMsg.trim(),
      data: new Date().toISOString(),
    };

    try {
      await axios.post("http://localhost:3001/chat", novaMensagem);
      setInputMsg("");
      fetchMensagens();

      setTimeout(async () => {
        const respostaSistema = {
          usuario: "sistema",
          mensagem: "Obrigado pela sua mensagem! Em breve um profissional irá te responder.",
          data: new Date().toISOString(),
        };
        await axios.post("http://localhost:3001/chat", respostaSistema);
        fetchMensagens();
      }, 2000);
    } catch (error) {
      console.error("Erro ao enviar mensagem", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensagem();
    }
  };

  return (
    <div
      className="container border rounded p-3"
      style={{
        maxWidth: "600px",
        height: "500px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#e6f0ff", // azul clarinho
        boxShadow: "0 8px 20px rgba(0, 123, 255, 0.2)",
      }}
    >
      <h3
        className="mb-3 text-center"
        style={{ color: "#004080", fontWeight: "700", fontSize: "1.8rem" }}
      >
        Chat de Pré-Consulta
      </h3>

      <div
        className="flex-grow-1 overflow-auto mb-3 p-3 rounded"
        style={{
          border: "1.5px solid #007bff",
          backgroundColor: "#ffffff",
          boxShadow: "inset 0 0 10px rgba(0, 123, 255, 0.1)",
          scrollbarWidth: "thin",
          scrollbarColor: "#007bff #e6f0ff",
        }}
      >
        {mensagens.length === 0 && (
          <p className="text-center text-muted">Nenhuma mensagem ainda.</p>
        )}
        {mensagens.map(({ id, usuario, mensagem, data }) => (
          <div
            key={id}
            className={`d-flex mb-3 ${
              usuario === "paciente" ? "justify-content-end" : "justify-content-start"
            }`}
          >
            <div
              className={`p-3 rounded shadow-sm ${
                usuario === "paciente" ? "bg-primary text-white" : "bg-secondary text-white"
              }`}
              style={{
                maxWidth: "70%",
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                boxShadow:
                  usuario === "paciente"
                    ? "0 2px 8px rgba(0, 123, 255, 0.5)"
                    : "0 2px 8px rgba(108, 117, 125, 0.5)",
                borderRadius: "16px",
              }}
            >
              <small style={{ fontWeight: "600" }}>
                {usuario === "paciente" ? "Você" : "Sistema"}
              </small>
              <p className="mb-1" style={{ marginTop: 6, lineHeight: "1.3rem" }}>
                {mensagem}
              </p>
              <small
                className="text-light"
                style={{ fontSize: "0.7rem", opacity: 0.8, userSelect: "none" }}
              >
                {new Date(data).toLocaleString()}
              </small>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-group" style={{ gap: "10px" }}>
        <textarea
          className="form-control"
          placeholder="Digite sua mensagem..."
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          onKeyDown={handleKeyPress}
          rows={2}
          style={{
            resize: "none",
            borderRadius: "12px",
            borderColor: "#007bff",
            padding: "10px",
            fontSize: "1rem",
            boxShadow: "0 0 6px rgba(0, 123, 255, 0.2)",
          }}
        />
        <button
          className="btn"
          onClick={enviarMensagem}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            borderRadius: "12px",
            padding: "10px 18px",
            fontWeight: "600",
            fontSize: "1rem",
            boxShadow: "0 4px 10px rgba(0, 123, 255, 0.4)",
            cursor: "pointer",
            border: "none",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#007bff")}
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default ChatPreConsulta;
