import { useState, useEffect } from "react";
import api from "axios";

const TCC = () => {
  // Estados para inputs
  const [nome, setNome] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [crn, setCrn] = useState("");
  const [sexo, setSexo] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");

  // Lista de médicos
  const [medicos, setMedicos] = useState([]);

  // Estado para edição: id do médico que está sendo editado, null se nenhum
  const [editId, setEditId] = useState(null);

  // Buscar médicos ao carregar componente
  useEffect(() => {
    fetchMedicos();
  }, []);

  const fetchMedicos = async () => {
    try {
      const res = await api.get("http://localhost:3001/produto");
      setMedicos(res.data);
    } catch (error) {
      console.error("Erro ao buscar os dados", error);
    }
  };

  // Função para limpar campos do formulário
  const limparFormulario = () => {
    setNome("");
    setDataNascimento("");
    setCrn("");
    setSexo("");
    setEmail("");
    setTelefone("");
    setEditId(null);
  };

  // Função para adicionar ou atualizar médico
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação simples
    if (!nome.trim() || !dataNascimento || !crn.trim()) {
      alert("Por favor, preencha pelo menos Nome, Data de Nascimento e CRN.");
      return;
    }

    const medicoData = {
      nome,
      Data: dataNascimento,
      CRN: crn,
      sexo,
      Email: email,
      telefone,
    };

    try {
      if (editId) {
        // Atualizar médico
        await api.put(`http://localhost:3001/produto/${editId}`, medicoData);
        alert("Médico atualizado com sucesso!");
      } else {
        // Criar novo médico
        await api.post("http://localhost:3001/produto", medicoData);
        alert("Médico cadastrado com sucesso!");
      }
      limparFormulario();
      fetchMedicos();
    } catch (error) {
      console.error("Erro ao enviar dados", error);
      alert("Erro ao salvar os dados, tente novamente.");
    }
  };

  // Deletar médico
  const handleDelete = async (id) => {
    if (!window.confirm("Deseja realmente deletar este médico?")) return;

    try {
      await api.delete(`http://localhost:3001/produto/${id}`);
      fetchMedicos();
    } catch (error) {
      console.error("Erro ao deletar médico", error);
      alert("Erro ao deletar o médico, tente novamente.");
    }
  };

  // Carregar dados do médico no formulário para editar
  const handleEdit = (medico) => {
    setNome(medico.nome);
    setDataNascimento(medico.Data);
    setCrn(medico.CRN);
    setSexo(medico.sexo);
    setEmail(medico.Email);
    setTelefone(medico.telefone);
    setEditId(medico.id);
  };

  return (
    <div
      className="app-container"
      style={{
        maxWidth: "720px",
        margin: "2rem auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "0 1rem",
      }}
    >
      <h1
        style={{
          color: "#004080",
          fontWeight: "700",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Cadastro de Médicos
      </h1>

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "#f0f7ff",
          padding: "1.5rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0, 123, 255, 0.2)",
          marginBottom: "2rem",
        }}
      >
        <div className="form-group" style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: "600", color: "#0056b3" }}>Nome</label>
          <input
            type="text"
            placeholder="Nome do Médico"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #007bff" }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: "600", color: "#0056b3" }}>
            Data de Nascimento
          </label>
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #007bff" }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: "600", color: "#0056b3" }}>CRN*</label>
          <input
            type="text"
            placeholder="CRN"
            value={crn}
            onChange={(e) => setCrn(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #007bff" }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: "600", color: "#0056b3" }}>Sexo</label>
          <input
            type="text"
            placeholder="Sexo"
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #007bff" }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "1rem" }}>
          <label style={{ fontWeight: "600", color: "#0056b3" }}>Email Profissional</label>
          <input
            type="email"
            placeholder="Email Profissional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #007bff" }}
          />
        </div>

        <div className="form-group" style={{ marginBottom: "1.5rem" }}>
          <label style={{ fontWeight: "600", color: "#0056b3" }}>Telefone</label>
          <input
            type="tel"
            placeholder="Número de Celular"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #007bff" }}
          />
        </div>

        <button
          type="submit"
          style={{
            backgroundColor: "#007bff",
            color: "white",
            fontWeight: "700",
            padding: "10px 25px",
            borderRadius: "12px",
            border: "none",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,123,255,0.5)",
            transition: "background-color 0.3s ease",
            width: "100%",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#0056b3")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
        >
          {editId ? "Atualizar Médico" : "Cadastrar Médico"}
        </button>
      </form>

      <h2
        style={{
          color: "#004080",
          fontWeight: "700",
          marginBottom: "1rem",
          textAlign: "center",
        }}
      >
        Médicos Cadastrados
      </h2>

      {medicos.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555", fontStyle: "italic" }}>
          Nenhum médico cadastrado.
        </p>
      ) : (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            maxHeight: "400px",
            overflowY: "auto",
            border: "1px solid #007bff",
            borderRadius: "10px",
            boxShadow: "0 3px 12px rgba(0,123,255,0.2)",
          }}
        >
          {medicos.map((medico) => (
            <li
              key={medico.id}
              style={{
                padding: "1rem",
                borderBottom: "1px solid #ffffffff",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#cbdaf2ff",
                borderRadius: "0 0 10px 10px",
              }}
            >
              <div style={{ flex: 1, marginRight: "1rem" }}>
                <strong>Nome:</strong> {medico.nome} <br />
                <strong>Nascimento:</strong>{" "}
                {new Date(medico.Data).toLocaleDateString()} <br />
                <strong>CRN:</strong> {medico.CRN} <br />
                <strong>Sexo:</strong> {medico.sexo} <br />
                <strong>Email:</strong> {medico.Email} <br />
                <strong>Telefone:</strong> {medico.telefone}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                <button
                  onClick={() => handleEdit(medico)}
                  style={{
                    backgroundColor: "#ffc107",
                    border: "none",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    color: "#333",
                  }}
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(medico.id)}
                  style={{
                    backgroundColor: "#dc3545",
                    border: "none",
                    padding: "6px 14px",
                    borderRadius: "8px",
                    fontWeight: "600",
                    cursor: "pointer",
                    color: "#fff",
                  }}
                >
                  Deletar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TCC;
