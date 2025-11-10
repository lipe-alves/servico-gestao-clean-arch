USE sql10806891;

CREATE TABLE IF NOT EXISTS Plano (
    codigo INT(11) NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    custoMensal DECIMAL(10, 2) NOT NULL DEFAULT 0,
    data DATE NOT NULL,
    descricao TEXT NOT NULL DEFAULT '',
    PRIMARY KEY (codigo) USING BTREE,
    UNIQUE INDEX unique_idx_nome_plano (nome)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Cliente (
    codigo INT(11) NOT NULL AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    PRIMARY KEY (codigo) USING BTREE,
    UNIQUE INDEX unique_idx_nome_cliente (nome),
    UNIQUE INDEX unique_idx_email_cliente (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS Assinatura (
    codigo INT(11) NOT NULL AUTO_INCREMENT,
    codPlano INT(11) NOT NULL,
    codCliente INT(11) NOT NULL,
    status ENUM('Cancelado', 'Ativo') NOT NULL DEFAULT 'Ativo',
    inicioFidelidade DATE NOT NULL,
    fimFidelidade DATE NOT NULL,
    dataUltimoPagamento DATE NULL,
    custoFinal DECIMAL(10, 2) NOT NULL DEFAULT 0,
    descricao TEXT NOT NULL DEFAULT '',
    data DATE NOT NULL,
    PRIMARY KEY (codigo) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inserindo Planos
INSERT IGNORE INTO Plano (nome, custoMensal, data, descricao) VALUES
('Plano Básico', 49.90, '2025-01-01', 'Ideal para pequenos negócios'),
('Plano Intermediário', 99.90, '2025-01-01', 'Recursos adicionais para empresas em crescimento'),
('Plano Avançado', 199.90, '2025-01-01', 'Soluções completas para grandes empresas'),
('Plano Premium', 299.90, '2025-01-01', 'Suporte dedicado e funcionalidades exclusivas'),
('Plano Personalizado', 0.00, '2025-01-01', 'Plano sob medida conforme necessidade do cliente');

-- Inserindo Clientes
INSERT IGNORE INTO Cliente (nome, email) VALUES
('Alice Martins', 'alice.martins@email.com'),
('Bruno Souza', 'bruno.souza@email.com'),
('Carla Lima', 'carla.lima@email.com'),
('Daniel Rocha', 'daniel.rocha@email.com'),
('Eduarda Silva', 'eduarda.silva@email.com'),
('Fernando Alves', 'fernando.alves@email.com'),
('Gabriela Costa', 'gabriela.costa@email.com'),
('Henrique Dias', 'henrique.dias@email.com'),
('Isabela Ferreira', 'isabela.ferreira@email.com'),
('João Pedro', 'joao.pedro@email.com');

-- Inserindo Assinaturas
INSERT IGNORE INTO Assinatura (codPlano, codCliente, inicioFidelidade, fimFidelidade, dataUltimoPagamento, custoFinal, descricao, data, status) VALUES
(1, 1, '2025-01-10', '2026-01-10', '2025-10-10', 49.90, 'Assinatura anual do plano básico', '2025-01-10', 'Ativo'),
(2, 2, '2025-02-15', '2026-02-15', '2025-10-15', 99.90, 'Assinatura anual do plano intermediário', '2025-02-15', 'Ativo'),
(3, 3, '2025-03-20', '2026-03-20', '2025-10-20', 199.90, 'Assinatura anual do plano avançado', '2025-03-20', 'Ativo'),
(4, 4, '2025-04-25', '2026-04-25', '2025-10-25', 299.90, 'Assinatura anual do plano premium', '2025-04-25', 'Ativo'),
(5, 5, '2025-05-30', '2026-05-30', NULL, 0.00, 'Plano personalizado em negociação', '2025-05-30', 'Ativo'),
(1, 6, '2025-06-05', '2026-06-05', '2025-10-05', 49.90, 'Assinatura anual do plano básico', '2025-06-05', 'Ativo'),
(2, 7, '2025-07-10', '2026-07-10', '2025-10-10', 99.90, 'Assinatura anual do plano intermediário', '2025-07-10', 'Cancelado'),
(3, 8, '2025-08-15', '2026-08-15', '2025-10-15', 199.90, 'Assinatura anual do plano avançado', '2025-08-15', 'Cancelado'),
(4, 9, '2025-09-20', '2026-09-20', '2025-10-20', 299.90, 'Assinatura anual do plano premium', '2025-09-20', 'Cancelado'),
(5, 10, '2025-10-25', '2026-10-25', NULL, 0.00, 'Plano personalizado em negociação', '2025-10-25', 'Ativo');