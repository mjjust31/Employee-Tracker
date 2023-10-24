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

function init() {
  promptUser().then((answer) => {
    const { userSelect } = answer;
    console.log(userSelect);
    switch (userSelect) {
      case "View All Departments":
        viewDepartments();
        break;
      case "View all Managers":
        viewManagers();
        break;
      case "View All Roles":
        viewRoles();
        break;
      case "View All Employees":
        viewEmployees();
        break;
      case "Add Department":
        addDepartment();
        break;
      case "Add Role":
        addRole();
        break;
    }
    init();
  });
}

function viewDepartments() {
  db.query(`SELECT * FROM departments`, function (err, results) {
    console.table(results);
  });
}

function viewManagers() {
  db.query(
    `SELECT managers.full_name AS Full_Name, titles.title AS Title, departments.department_name AS department 
    FROM managers 
    JOIN titles ON managers.title = titles.id 
    JOIN departments ON managers.department = departments.id`,
    function (err, results) {
      console.table(results);
    }
  );
}

function viewRoles() {
  db.query(
    `SELECT * FROM titles JOIN departments ON titles.department = departments.id `,
    function (err, results) {
      console.table(results);
    }
  );
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
        name: "newDepartment",
      },
    ])
    .then((answers) => {
      const { newDepartment } = answers;
      db.query(
        `INSERT INTO departments SET ?`,
        { department_name: newDepartment },
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

function addRole() {
  db.query(`SELECT * FROM departments`, function (err, results) {
    console.table(results);

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the job title?",
          name: "title",
        },
        {
          type: "list",
          message: "What departement does this role belong to?",
          name: "department",
          choices: results.map((departments) => departments.department_name), //needs to be an an array from the table
        },
        {
          type: "input",
          message: "What is the salary for this position?",
          name: "salary",
          validate: function (input) {
            const done = this.async();
            if (input === NaN || input.length === 0) {
              //NaN not working as expected. review later
              done("You need to provide a numerical salary.");
              return;
            }
            done(null, true);
          },
        },
        {
          type: "list",
          message: "Ist this a manager role?",
          name: "isItManager",
          choices: ["Yes", "No"],
        },
      ])
      .then((answers) => {
        console.log(answers);
      });
  });
}

init();
