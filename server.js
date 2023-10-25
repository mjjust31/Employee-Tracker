const promptUser = require("./script/prompt");
// const fs = require("fs");
// const path = require("path");
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
        UpdateEmployeeRole();
        break;
      case "Quit":
        quit();
        break;
    }
    // init();
  });
}

function viewDepartments() {
  db.query(`SELECT * FROM departments`, function (err, results) {
    console.table(results);
  });
}

function viewManagers() {
  db.query(
    `SELECT managers.id AS id, managers.Manager_Name AS Manager_Name, titles.title AS Title, departments.department_name AS department 
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
  departments.department AS Department,
  managers.Manager_Name AS Manager_Name
  FROM employees
  JOIN titles ON employees.title = titles.id
  JOIN departments ON employees.department = departments.id
  LEFT JOIN managers ON employees.Manager_Name = managers.id;
`;

  db.query(employeeQuery, function (err, results) {
    console.table(results);
  });
}

function addDepartment() {
  console.log("Inside function");

  inquirer
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
        { department: newDepartment },
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

    inquirer
      .prompt([
        {
          type: "input",
          message: "What is the employee's first name?",
          name: "firstName",
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
          message: "What is the employee's last name",
          name: "lastName",
        },
        {
          type: "list",
          message: "What is the employee's title",
          name: "employeeTitle",
          choices: results.map((title) => title.title),
        },
        {
          type: "list",
          messsage: "What is the employees's department?",
          name: "employeeDepartment",
          choices: results.map((department) => department.department),
        },
      ])
      .then((answers) => {
        const {
          firstName,
          lastName,
          employeeTitle,
          employeeDepartment,
          Manager_Name,
        } = answers;

        const addUser = {
          first_name: firstName,
          last_name: lastName,
          title: employeeTitle,
          department: employeeDepartment,
          Manager_Name: Manager_Name,
        };

        db.query(`INSERT INTO employees SET ?`, addUser, (err, result) => {
          if (err) {
            console.log("Error adding role:", err);
          } else {
            console.log("Employee added successfully!");
          }
        });
      })
      .catch((error) => {
        console.log("Error:", error);

        // console.log(userEntryRole)
      });
  });
}

function UpdateEmployeeRole() {
  db.query(`SELECT * FROM employees`, function (err, results) {
    console.table(results);
    inquirer
      .prompt([
        {
          type: "list",
          message:
            "What is the id of the employee you want to select a title change for?",
          name: "id",
          choices: results.map((id) => id.id),
          validate: function (input) {
            const done = this.async();
            if (input.length === 0) {
              done("You need to enter an id.");
              return;
            }
            done(null, true);
          },
        },
        {
          type: "list",
          message: "Please select the new title for this person",
          name: "title",
          choices: results.map((title) => title.title),
        },
        {
          type: "list",
          message: "Please select the new department for this person",
          name: "department",
          choices: results.map((department) => department.department),
        },
      ])
      .then((answers) => {
        const { id, title, department } = answers;

        db.query(
          `UPDATE employees SET title = ?, department = ?  WHERE id = ?`,
          [title, department, id],
          (err, result) => {
            if (err) {
              console.log("Error adding role:", err);
            } else {
              console.log("update added successfully!");
            }
          }
        );
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
}

function quit() {
  process.exit();
}

init();
