DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);
CREATE TABLE titles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary INT NOT NULL,
  isItManager BOOLEAN,
  department_name INT NOT NULL,
  FOREIGN KEY (department_name) REFERENCES departments(id)
);
CREATE TABLE managers (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  manager_name VARCHAR(30) NOT NULL,
  title INT NOT NULL,
  FOREIGN KEY (title) REFERENCES titles(id)
);
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  title INT NOT NULL,
  manager_name INT,
  FOREIGN KEY (title) REFERENCES titles(id),
  FOREIGN KEY (manager_name) REFERENCES managers(id)
);