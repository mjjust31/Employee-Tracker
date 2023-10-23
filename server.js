const promptUser = require("./script/prompt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();
const inquirer = require("inquirer");

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    // MySQL username,
    user: "root",
    // TODO: Add MySQL password here
    password: "Password1",
    database: "employee_tracker_db",
  },
  console.log(`Connected to the employee database.`)
);

promptUser().then((answer) => {
  const { userSelect } = answer;
  console.log(userSelect);
  switch (userSelect) {
    case "View All Departments":
      viewDepartments();
      promptUser();
      break;
    case "View all Managers":
      viewManagers();
      promptUser();
    case "View All Roles":
      viewRoles();
      promptUser();
    case "View All Employees":
      viewEmployees();
      promptUser();
    case "Add Department":
      addDepartment();
    // promptUser();
  }
});

function viewDepartments() {
  db.query(`SELECT * FROM departments`, function (err, results) {
    console.table(results);
  });
}

function viewManagers() {
  db.query(`SELECT * FROM managers`, function (err, results) {
    console.table(results);
  });
}

function viewRoles() {
  db.query(`SELECT * FROM roles`, function (err, results) {
    console.table(results);
  });
}

function viewEmployees() {
  db.query(`SELECT * FROM employees`, function (err, results) {
    console.table(results);
  });
}

function addDepartment() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "department_name",
      },
    ])
    .then((answers) => {
      const { department_name } = answers;
      db.query(
        `INSERT INTO departments SET ?`,
        { department_name },
        (err, result) => {
          if (err) {
            console.log("Error adding department:", err);
          } else {
            console.log("Department added successfully!");
          }
        }
      );
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
