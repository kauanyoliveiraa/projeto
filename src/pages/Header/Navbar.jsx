import React, { useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="header">
      {/* Ícone hambúrguer à esquerda */}
      <div
        className={`menu-toggle ${isOpen ? "open" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="logo"></div>

      {/* Menu sempre renderizado */}
      <nav className={`nav ${isOpen ? "open" : ""}`}>
        <a href="/TCC" onClick={toggleMenu}>Médicos</a>
        <a href="/Paciente" onClick={toggleMenu}>Paciente</a>
        <a href="/Agendamento" onClick={toggleMenu}>Agendamento</a>
        <a href="/Chat" onClick={toggleMenu}>Chat</a>
        <a href="/Avisos" onClick={toggleMenu}>Avisos</a>
        <a href="/produto" onClick={toggleMenu}>Produto</a>
        <a href="/categoria" onClick={toggleMenu}>Categoria</a>
        
      </nav>
    </header>
  );
};

export default Navbar;
