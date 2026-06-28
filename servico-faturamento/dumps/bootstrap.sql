SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS servico_faturamento COLLATE 'utf8mb4_unicode_ci';

USE servico_faturamento;

CREATE TABLE IF NOT EXISTS Pagamento (
    dataPagamento   DATE           NOT NULL,
    codAssinatura   INT(11)        NOT NULL,
    valorPago       DECIMAL(10, 2) NOT NULL DEFAULT 0,
    PRIMARY KEY (dataPagamento, codAssinatura) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
