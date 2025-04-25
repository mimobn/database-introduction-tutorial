-- create db
CREATE database library;
use library;

-- DDL
-- Create
CREATE TABLE AUTHORS (
	AuthorID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Country VARCHAR(50)
    );
CREATE TABLE BOOKS (
	isbn INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    Price Decimal(6,2),
    AuthorID INT,
    FOREIGN KEY (AuthorID) references AUTHORS(AuthorID)
    );
CREATE TABLE COMMANDE (
	ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100),
    date_de_commaende DATE
    );   
-- ALTER 
ALTER TABLE AUTHORS ADD COLUMN age INT DEFAULT 0;
desc AUTHORS;

-- DML
INSERT INTO AUTHORS (AuthorId,Name,Country) VALUES(1, 'MOHAA', 'ALGERIA');

INSERT INTO AUTHORS (AuthorId,Name,Country) VALUES(2, 'Adel', 'ALGERIA');

INSERT INTO AUTHORS (AuthorId,Name,Country) VALUES(3, 'walid', 'ALGERIA');


INSERT INTO COMMANDE (Name,date_de_commaende) VALUES( 'CO', '2025-02-01');
	
UPDATE AUTHORS set age = 20 where AuthorId = 3;
DELETE FROM AUTHORS where AuthorID =3 ;

-- Dql 
select * from Authors;
select TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'library';


-- DROP
DROP TABLE BOOKS;
DROP DATABASE library;city