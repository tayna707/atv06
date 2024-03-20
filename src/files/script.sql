create database db_clientes;

use db_clientes;

CREATE TABLE `db_clientes` (
  `id` INT AUTO_INCREMENT,
  `nome` VARCHAR(255) NOT NULL,
  `tel_cel` VARCHAR(20) UNIQUE,
  `tel_fixo ` VARCHAR(20) UNIQUE,
  `email` VARCHAR(255) UNIQUE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO db_clientes.clientes (nome, tel_cel, tel_fixo, email) VALUES (null,'Tayna',19 99255858, 3832959594, 'taynasilva@gmail.com');
INSERT INTO db_clientes.clientes (nome, tel_cel, tel_fixo, email) VALUES (null,'Camilly',	11 99855969,	3832959555, 'camillyellena@gmail.com');
INSERT INTO db_clientes.clientes (nome, tel_cel, tel_fixo, email) VALUES (null, 'Gustavo',	15 99895959,	3832959566,	'gustavoantes@gmail.com');
INSERT INTO db_clientes.clientes (nome, tel_cel, tel_fixo, email) VALUES (null, 'Guilherme',	19 99859595,	3832959955,	'guilhermeellena@gmail.com');
INSERT INTO db_clientes.clientes (nome, tel_cel, tel_fixo, email) VALUES (null, 'Ana',	21 99524848,	3832959530,	'anaflavia@gmail.com');
INSERT INTO db_clientes.clientes (nome, tel_cel, tel_fixo, email) VALUES (null, 'Felipe',	19 99599636,	3832953052,	'felipedantas@gmail.com');
INSERT INTO db_clientes.clientes (nome, tel_cel, tel_fixo, email) VALUES (null, 'Julia',	14 99595958,	3832958745,	'juliasouza@gmail.com');
INSERT INTO db_clientes.clientes (nome, tel_cel, tel_fixo, email) VALUES (null, 'Sergio',	11 99659597, 3832969522,	'sergiogomes@gmail.com');
INSERT INTO db_clientes.clientes (nome, tel_cel, tel_fixo, email) VALUES (null, 'Izaias',	19 99559558,	3832954444,	'izaiasmaia@gmail.com');
INSERT INTO db_clientes.clientes (nome, tel_cel, tel_fixo, email) VALUES (null, 'Maria,'	19 99955985,	3832903258,	'mariaana@gmail.com');

SELECT * FROM db_clientes.clientes;