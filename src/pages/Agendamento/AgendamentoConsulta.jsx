import { useState, useEffect } from "react";
import axios from "axios";

const AgendamentoConsulta = () => {
  const [pacienteId, setPacienteId] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [consultas, setConsultas] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/pacientes").then((res) => setPacientes(res.data));
    axios.get("http://localhost:3001/consultas").then((res) => setConsultas(res.data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/consultas", {
      pacienteId,
      data,
      hora
    });
    setData("");
    setHora("");
    setPacienteId("");
    const res = await axios.get("http://localhost:3001/consultas");
    setConsultas(res.data);
  };

  const getPacienteNome = (id) => {
    const p = pacientes.find(p => p.id === id);
    return p ? p.nome : "Desconhecido";
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Agendamento de Consultas</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <select
          value={pacienteId}
          onChange={(e) => setPacienteId(e.target.value)}
          required
          style={styles.input}
        >
          <option value="">Selecione o paciente</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>
        <input
          type="date"
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Agendar</button>
      </form>

      <h3 style={styles.subtitle}>Consultas Agendadas</h3>
      <ul style={styles.list}>
        {consultas.map((c, i) => (
          <li key={i} style={styles.card}>
            <strong>{getPacienteNome(c.pacienteId)}</strong><br />
            📅 {c.data} 🕒 {c.hora}
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

// Hover effect para cards (funciona melhor com CSS real, mas deixei comentado para referência)
// styles.card[':hover'] = {
//   transform: "translateY(-6px)",
//   boxShadow: "0 10px 20px rgba(0, 123, 255, 0.3)",
// };

export default AgendamentoConsulta;
