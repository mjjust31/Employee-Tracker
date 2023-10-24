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
      case "Add Employee":
        addEmployee();
        break;
      case "Update Employee Role":
        break;
      case "Quit":
        break;
    }
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
  const employeeQuery = `SELECT employees.first_name AS First_Name,
  employees.last_name AS Last_Name,
  titles.title AS Title,
  departments.department_name AS Department,
  managers.full_Name AS Manager_Name
  FROM employees
  JOIN titles ON employees.title = titles.id
  JOIN departments ON employees.department = departments.id
  LEFT JOIN managers ON employees.managerName = managers.id;
`;

  db.query(employeeQuery, function (err, results) {
    console.table(results);
  });
}

function addDepartment() {
  console.log("Inside function");
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "newDepartment",
        validate: function (input) {
          const done = this.async();
          if (input.length === 0) {
            done("You need to enter a department.");
            return;
          }
          done(null, true);
        },
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
          validate: function (input) {
            const done = this.async();
            if (input.length === 0) {
              done("You need to enter a job title.");
              return;
            }
            done(null, true);
          },
        },
        {
          type: "input",
          message: "What is the salary for this position?",
          name: "salary",
          validate: function (input) {
            const done = this.async();
            if (isNaN(input) || input.length === 0) {
              //NaN not working as expected. review later
              done("You need to provide a numerical salary.");
              return;
            }
            done(null, true);
          },
        },
        {
          type: "list",
          message:
            "Is this a manager role? (Select 0 for No, Select '1' for Yes)",
          name: "isItManager",
          choices: [0, 1],
        },
        {
          type: "list",
          message: "What departement does this role belong to?",
          name: "department",
          choices: results.map((departments) => departments.id),
          //needs to be an an array from the table
        },
      ])
      .then((answers) => {
        // console.log(answers);
        const { title, salary, isItManager, department } = answers;

        const userRawEntryRole = {
          title: title,
          salary: salary,
          isItManager: isItManager,
          department: department,
        };

        db.query(
          `INSERT INTO titles SET ?`,
          userRawEntryRole,
          (err, result) => {
            if (err) {
              console.log("Error adding role:", err);
            } else {
              console.log("Title added successfully!");
            }
          }
        );
      })
      .catch((error) => {
        console.log("Error:", error);

        // console.log(userEntryRole)
      });
  });
}

function addEmployee() {
  db.query(`SELECT * FROM employees`, function (err, results) {
    console.table(results);
  });
}
// function UpdateEmployeeRole(){
// }

// function quit(){

// }

init();
