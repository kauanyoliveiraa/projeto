import { useState, useEffect } from 'react'
import axios from 'axios'

const Registro = () => {
  // Estados dos inputs
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [confirmarSenha, setConfirmarSenha] = useState('')
  const [status, setStatus] = useState('ativo')
  const [nivel, setNivel] = useState('usuario')
  const [img, setImg] = useState('')

  // Lista de usuários
  const [usuarios, setUsuarios] = useState([])

  // Buscar todos os usuários ao carregar
  useEffect(() => {
    buscarUsuarios()
  }, [])

  const buscarUsuarios = async () => {
    try {
      const res = await axios.get('http://localhost:3001/usuario')
      setUsuarios(res.data)
    } catch (err) {
      console.error('Erro ao buscar usuários:', err)
    }
  }

  // Cadastrar usuário
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem')
      return
    }

    try {
      await axios.post('http://localhost:3001/usuario', {
        nome,
        email,
        senha,
        nivelacesso: nivel,
        status,
        imagem: img,
      })

      alert('Usuário cadastrado com sucesso!')
      setNome('')
      setEmail('')
      setSenha('')
      setConfirmarSenha('')
      setStatus('ativo')
      setNivel('usuario')
      setImg('')
      buscarUsuarios()
    } catch (err) {
      alert('Erro ao cadastrar usuário')
      console.error(err)
    }
  }

  // Deletar usuário
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/usuario/${id}`)
      buscarUsuarios()
    } catch (err) {
      console.error('Erro ao deletar usuário:', err)
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Cadastro de Usuário</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nome Completo"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={e => setSenha(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmarSenha}
          onChange={e => setConfirmarSenha(e.target.value)}
          required
          style={styles.input}
        />

        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          style={styles.select}
        >
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>

        <select
          value={nivel}
          onChange={e => setNivel(e.target.value)}
          style={styles.select}
        >
          <option value="admin">Admin</option>
          <option value="usuario">Usuário</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={e => {
            const file = e.target.files[0]
            const reader = new FileReader()
            reader.onloadend = () => {
              setImg(reader.result)
            }
            if (file) reader.readAsDataURL(file)
          }}
          style={styles.inputFile}
        />

        <button type="submit" style={styles.button}>
          Cadastrar Usuário
        </button>
      </form>

      <h3 style={{ marginTop: 40, marginBottom: 20 }}>Usuários Cadastrados</h3>
      <ul style={styles.list}>
        {usuarios.length === 0 && <p style={{ color: '#555' }}>Nenhum usuário cadastrado.</p>}
        {usuarios.map(usuario => (
          <li key={usuario.id} style={styles.listItem}>
            <div>
              <strong>{usuario.nome}</strong> | {usuario.email} | <em>{usuario.status}</em> | <small>{usuario.nivelacesso}</small>
            </div>
            {usuario.imagem && (
              <img
                src={usuario.imagem}
                alt={usuario.nome}
                style={{ width: 50, height: 50, borderRadius: '50%', marginTop: 6 }}
              />
            )}
            <button
              onClick={() => handleDelete(usuario.id)}
              style={styles.deleteButton}
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '40px auto',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
    color: '#0d6efd',
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
    boxShadow: '0 2px 10px rgba(13,110,253,0.15)',
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#0d6efd',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 15,
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 5,
    border: '1.5px solid #0d6efd',
    outline: 'none',
  },
  inputFile: {
    border: 'none',
    padding: 5,
  },
  select: {
    padding: 12,
    fontSize: 16,
    borderRadius: 5,
    border: '1.5px solid #0d6efd',
    outline: 'none',
    backgroundColor: 'white',
    color: '#0d6efd',
  },
  button: {
    padding: 14,
    backgroundColor: '#0d6efd',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  listItem: {
    backgroundColor: 'white',
    border: '1.5px solid #0d6efd',
    borderRadius: 6,
    padding: 15,
    marginBottom: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  deleteButton: {
    backgroundColor: 'transparent',
    border: '1.5px solid #dc3545',
    color: '#dc3545',
    padding: '6px 12px',
    borderRadius: 5,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
}

export default Registro
