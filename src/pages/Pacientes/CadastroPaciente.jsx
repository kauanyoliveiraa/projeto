import { useState, useEffect } from "react";
import axios from "axios";

const CadastroPaciente = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pacientes, setPacientes] = useState([]);

  const fetchPacientes = async () => {
    const res = await axios.get("http://localhost:3001/pacientes");
    setPacientes(res.data);
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/pacientes", { nome, email, telefone });
    setNome("");
    setEmail("");
    setTelefone("");
    fetchPacientes();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cadastro de Pacientes</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          style={styles.input}
        />
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Cadastrar</button>
      </form>

      <h3 style={styles.subtitle}>Pacientes Cadastrados</h3>
      <ul style={styles.list}>
        {pacientes.map((p) => (
          <li key={p.id} style={styles.card}>
            <strong>{p.nome}</strong><br />
            <span>📧 {p.email}</span><br />
            <span>📞 {p.telefone}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 480,
    margin: "40px auto",
    padding: 20,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: "#073763",
    backgroundColor: "#e6f0ff",
    borderRadius: 12,
    boxShadow: "0 8px 16px rgba(7, 55, 99, 0.15)",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "700",
    fontSize: "2rem",
  },
  subtitle: {
    marginTop: 40,
    marginBottom: 16,
    borderBottom: "2px solid #007bff",
    paddingBottom: 4,
    color: "#004080",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: "1.5px solid #007bff",
    outlineColor: "#0056b3",
    transition: "border-color 0.3s ease",
  },
  button: {
    padding: 14,
    backgroundColor: "#0056b3",
    color: "white",
    fontWeight: "600",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontSize: 18,
    transition: "background-color 0.3s ease",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
    boxShadow: "0 4px 8px rgba(0, 123, 255, 0.15)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "default",
  },
};

// Adiciona efeito hover no card
styles.card[':hover'] = {
  transform: "translateY(-6px)",
  boxShadow: "0 10px 20px rgba(0, 123, 255, 0.3)",
};

export default CadastroPaciente;
