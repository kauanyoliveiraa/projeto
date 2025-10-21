-- Cria o banco de dados
CREATE DATABASE vida_saudavel;
GO

-- Usa o banco de dados
USE vida_saudavel;
GO

-- Tabela Médicos
CREATE TABLE medicos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    crn VARCHAR(50) NOT NULL UNIQUE,
    especialidade VARCHAR(100),
    sexo VARCHAR(10) CHECK (sexo IN ('Masculino', 'Feminino', 'Outro')) DEFAULT 'Outro',
    telefone VARCHAR(20),
    email VARCHAR(100),
    data_cadastro DATETIME DEFAULT GETDATE()
);
GO

-- Tabela Pacientes
CREATE TABLE pacientes (
    id INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    data_nascimento DATE,
    sexo VARCHAR(10) CHECK (sexo IN ('Masculino', 'Feminino', 'Outro')) DEFAULT 'Outro',
    data_cadastro DATETIME DEFAULT GETDATE()
);
GO

-- Tabela Agendamentos
CREATE TABLE agendamento (
    id INT IDENTITY(1,1) PRIMARY KEY,
    medico_id INT NOT NULL,
    paciente_id INT NOT NULL,
    data_hora DATETIME NOT NULL,
    status VARCHAR(15) CHECK (status IN ('Agendado', 'Confirmado', 'Cancelado', 'Realizado')) DEFAULT 'Agendado',
    observacoes TEXT,
    data_cadastro DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_agendamento_medico FOREIGN KEY (medico_id) REFERENCES medicos(id) ON DELETE CASCADE,
    CONSTRAINT FK_agendamento_paciente FOREIGN KEY (paciente_id) REFERENCES pacientes(id) ON DELETE CASCADE
);
GO

-- Tabela Avisos
CREATE TABLE avisos (
    id INT IDENTITY(1,1) PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    mensagem TEXT NOT NULL,
    destinatario VARCHAR(10) CHECK (destinatario IN ('Todos', 'Medicos', 'Pacientes')) DEFAULT 'Todos',
    data_envio DATETIME DEFAULT GETDATE()
);
GO

-- Tabela Chat
CREATE TABLE chat (
    id INT IDENTITY(1,1) PRIMARY KEY,
    agendamento_id INT NOT NULL,
    remetente VARCHAR(10) CHECK (remetente IN ('Medico', 'Paciente')) NOT NULL,
    mensagem TEXT NOT NULL,
    data_envio DATETIME DEFAULT GETDATE(),
    CONSTRAINT FK_chat_agendamento FOREIGN KEY (agendamento_id) REFERENCES agendamento(id) ON DELETE CASCADE
);
GO

-- Inserir dados de exemplo
INSERT INTO medicos (nome, crn, especialidade, sexo, telefone, email) VALUES
('Dr. João Silva', 'CRN123456', 'Cardiologia', 'Masculino', '11999999999', 'joao@clinica.com');

INSERT INTO pacientes (nome, email, telefone, data_nascimento, sexo) VALUES
('Maria Oliveira', 'maria@gmail.com', '11988888888', '1985-06-15', 'Feminino');

INSERT INTO agendamento (medico_id, paciente_id, data_hora, status) VALUES
(1, 1, '2025-11-01 15:00:00', 'Agendado');

INSERT INTO avisos (titulo, mensagem, destinatario) VALUES
('Manutenção', 'O sistema estará em manutenção no domingo.', 'Todos');

INSERT INTO chat (agendamento_id, remetente, mensagem) VALUES
(1, 'Paciente', 'Olá doutor, gostaria de tirar uma dúvida.');
GO

USE vida_saudavel;
GO
SELECT name FROM sys.tables;

SELECT * FROM medicos;
SELECT * FROM pacientes;
SELECT * FROM agendamento;
SELECT * FROM avisos;
SELECT * FROM chat;


SELECT 
    f.name AS ForeignKey,
    OBJECT_NAME(f.parent_object_id) AS TableName,
    COL_NAME(fc.parent_object_id, fc.parent_column_id) AS ColumnName,
    OBJECT_NAME(f.referenced_object_id) AS ReferenceTableName,
    COL_NAME(fc.referenced_object_id, fc.referenced_column_id) AS ReferenceColumnName
FROM sys.foreign_keys AS f
INNER JOIN sys.foreign_key_columns AS fc 
    ON f.object_id = fc.constraint_object_id;



