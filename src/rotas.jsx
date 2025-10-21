// npm install react-router-dom
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Import do menu (Navbar)
import Navbar from "./pages/Header/Navbar";

// Imports das páginas
import Link_Home from "./pages/Home/home";
import Link_Produto from "./pages/Produto/produto";
import Link_Formulario from "./pages/Formulario/formulario";
import Login from "./pages/Login/login";
import Link_Generico from "./pages/Generico/generico";
import Link_TCC from "./pages/TCC/TCC";
import Link_Registro from "./pages/Registro/Registro";
import Usuario from "./pages/Usuario/usuario";
import Categoria from "./pages/Categoria/categoria";
import Link_Paciente from "./pages/Pacientes/CadastroPaciente";
import Link_Agendamento from './pages/Agendamento/AgendamentoConsulta';
import Link_Chat from './pages/Chat/ChatPreConsulta';
import Link_Avisos from './pages/Avisos/avisos';
// import Link_Funcionario from './pages/Funcionario/funcionario'; // (caso adicione depois)

function RoutesApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* Rotas principais */}
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Link_Home />} />
          <Route path="/produto" element={<Link_Produto />} />
          <Route path="/formulario" element={<Link_Formulario />} />
          <Route path="/tcc" element={<Link_TCC />} />
          <Route path="/registro" element={<Link_Registro />} />
          <Route path="/usuario" element={<Usuario />} />
          <Route path="/categoria" element={<Categoria />} />
          <Route path="/generico" element={<Link_Generico />} />
          <Route path="/Paciente" element={< Link_Paciente  />} />
          <Route path="/Agendamento" element={<Link_Agendamento />} />
          <Route path="/Chat" element={<Link_Chat />} />
          <Route path="/Avisos" element={<Link_Avisos/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Layout padrão com o menu fixo em todas as páginas
function Layout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RoutesApp;
