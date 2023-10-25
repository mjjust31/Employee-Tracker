DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(30) NOT NULL
);
CREATE TABLE titles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary INT NOT NULL,
  isItManager BOOLEAN,
  department INT NOT NULL,
  FOREIGN KEY (department) REFERENCES departments(id)
);

CREATE TABLE managers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Manager_Name VARCHAR(30) NOT NULL,
  title INT NOT NULL,
  department INT NOT NULL,
  FOREIGN KEY (title) REFERENCES titles(id),
  FOREIGN KEY (department) REFERENCES departments(id)
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  title INT NOT NULL,
  department INT NOT NULL,
  Manager_Name INT,
  FOREIGN KEY (title) REFERENCES titles(id),
  FOREIGN KEY (department) REFERENCES departments(id),
  FOREIGN KEY (Manager_Name) REFERENCES managers(id)
);

