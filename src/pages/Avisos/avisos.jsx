import { useState, useEffect } from "react";
import axios from "axios";

const Avisos = () => {
  const [avisos, setAvisos] = useState([]);
  const [novoAviso, setNovoAviso] = useState({
    titulo: "",
    mensagem: "",
    data: "",
    importante: false,
  });

  useEffect(() => {
    fetchAvisos();
  }, []);

  const fetchAvisos = async () => {
    try {
      const res = await axios.get("http://localhost:3001/avisos");
      setAvisos(res.data);
    } catch (error) {
      console.error("Erro ao buscar avisos", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!novoAviso.titulo.trim() || !novoAviso.mensagem.trim()) {
      alert("Por favor, preencha título e mensagem");
      return;
    }

    try {
      await axios.post("http://localhost:3001/avisos", {
        ...novoAviso,
        data: novoAviso.data || new Date().toISOString().split("T")[0],
      });
      setNovoAviso({ titulo: "", mensagem: "", data: "", importante: false });
      fetchAvisos();
    } catch (error) {
      console.error("Erro ao enviar aviso", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente deletar este aviso?")) return;
    try {
      await axios.delete(`http://localhost:3001/avisos/${id}`);
      fetchAvisos();
    } catch (error) {
      console.error("Erro ao deletar aviso", error);
    }
  };

  return (
    <div
      className="container"
      style={{
        maxWidth: "700px",
        marginTop: "2rem",
        marginBottom: "3rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        className="mb-4 text-center"
        style={{ color: "#004080", fontWeight: "700", fontSize: "2rem" }}
      >
        Área de Avisos / Notificações
      </h2>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="mb-5 p-4 shadow-sm rounded"
        style={{ backgroundColor: "#f0f7ff", border: "1px solid #a3c0ff" }}
      >
        <div className="mb-3">
          <label
            htmlFor="tituloInput"
            className="form-label"
            style={{ fontWeight: "600", color: "#0056b3" }}
          >
            Título
          </label>
          <input
            type="text"
            id="tituloInput"
            className="form-control"
            value={novoAviso.titulo}
            onChange={(e) =>
              setNovoAviso({ ...novoAviso, titulo: e.target.value })
            }
            placeholder="Título do aviso"
            required
            style={{ borderRadius: "8px", borderColor: "#007bff" }}
          />
        </div>

        <div className="mb-3">
          <label
            htmlFor="mensagemInput"
            className="form-label"
            style={{ fontWeight: "600", color: "#0056b3" }}
          >
            Mensagem
          </label>
          <textarea
            id="mensagemInput"
            className="form-control"
            rows={4}
            value={novoAviso.mensagem}
            onChange={(e) =>
              setNovoAviso({ ...novoAviso, mensagem: e.target.value })
            }
            placeholder="Conteúdo do aviso"
            required
            style={{ borderRadius: "8px", borderColor: "#007bff" }}
          />
        </div>

        <div className="row align-items-center mb-3">
          <div className="col-md-5 mb-3 mb-md-0">
            <label
              htmlFor="dataInput"
              className="form-label"
              style={{ fontWeight: "600", color: "#0056b3" }}
            >
              Data (opcional)
            </label>
            <input
              type="date"
              id="dataInput"
              className="form-control"
              value={novoAviso.data}
              onChange={(e) =>
                setNovoAviso({ ...novoAviso, data: e.target.value })
              }
              style={{ borderRadius: "8px", borderColor: "#007bff" }}
            />
          </div>
          <div className="col-md-3 d-flex align-items-center">
            <div className="form-check">
              <input
                type="checkbox"
                id="importanteCheck"
                className="form-check-input"
                checked={novoAviso.importante}
                onChange={() =>
                  setNovoAviso({ ...novoAviso, importante: !novoAviso.importante })
                }
                style={{ cursor: "pointer" }}
              />
              <label
                htmlFor="importanteCheck"
                className="form-check-label"
                style={{ fontWeight: "600", color: "#d6336c", cursor: "pointer" }}
              >
                Importante
              </label>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="btn"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            fontWeight: "600",
            padding: "10px 25px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,123,255,0.4)",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
        >
          Adicionar Aviso
        </button>
      </form>

      {/* Lista de avisos */}
      <div>
        {avisos.length === 0 && (
          <p className="text-muted text-center" style={{ fontStyle: "italic" }}>
            Nenhum aviso cadastrado.
          </p>
        )}

        {avisos.map(({ id, titulo, mensagem, data, importante }) => (
          <div
            key={id}
            className="shadow-sm mb-4 p-3 rounded"
            style={{
              borderLeft: importante ? "6px solid #d6336c" : "6px solid #007bff",
              backgroundColor: importante ? "#ffe6ea" : "#e6f0ff",
              color: importante ? "#721c24" : "#004080",
              boxShadow: "0 3px 10px rgba(0, 0, 0, 0.1)",
              position: "relative",
              transition: "transform 0.2s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 style={{ fontWeight: "700", marginBottom: 0 }}>{titulo}</h5>
              <small style={{ fontStyle: "italic", opacity: 0.7 }}>
                {data ? new Date(data).toLocaleDateString() : ""}
              </small>
            </div>
            <p style={{ whiteSpace: "pre-wrap" }}>{mensagem}</p>
            {importante && (
              <small
                style={{
                  color: "#d6336c",
                  fontWeight: "700",
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  userSelect: "none",
                }}
              >
                IMPORTANTE
              </small>
            )}
            <button
              onClick={() => handleDelete(id)}
              className="btn btn-outline-danger btn-sm"
              style={{
                position: "absolute",
                bottom: "15px",
                right: "15px",
                borderRadius: "8px",
                fontWeight: "600",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#d6336c";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#dc3545";
              }}
            >
              Deletar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Avisos;
