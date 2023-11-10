const promptUser = require("./script/prompt");
const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();
const inquirer = require("inquirer");

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
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

      case "View All Roles":
        viewRoles();
        break;

      case "View All Employees":
        viewEmployees();
        break;

      case "View all Managers":
        viewManagers();
        break;

      case "Add Department":
        addDepartment();
        break;

      case "Add Department":
        addDepartment();
        break;

      case "Add Role":
        addRole();
        break;

      case "Add Manager":
        addManager();
        break;
      case "Add Employee":
        addEmployee();
        break;

      //   break;
      // case "Update Employee Role":
      //   UpdateEmployeeRole();

      //   break;
      // case "Quit":
      //   quit();
      //   break;
    }
  });
}
function viewDepartments() {
  db.query(`SELECT department_name from departments`, function (err, results) {
    console.table(results);
  });
  init();
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
function viewManagers() {
  const managersq = `SELECT managers.manager_name, titles.title, departments.department_name
  FROM managers
  JOIN titles ON managers.title = titles.id
  JOIN departments ON titles.department_name = departments.id`;
  db.query(managersq, function (err, results) {
    console.table(results);
  });
}
function viewRoles() {
  db.query(
    `select title, salary, isItManager, departments.department_name from titles join departments on departments.id = titles.department_name order by title`,
    function (err, results) {
      console.table(results);
    }
  );
}
function addRole() {
  db.query(`SELECT * FROM departments`, function (err, departments) {
    console.table(departments);

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
          message: "What department does this role belong to?",
          name: "department",
          choices: departments.map((department) => department.department_name),
          //needs to be an an array from the table
        },
      ])
      .then((answers) => {
        // console.log(answers);
        const { title, salary, isItManager, department } = answers;

        const departmentId = departments.find(
          (dept) => dept.department_name === department
        ).id;

        console.log(departmentId);

        const newRole = {
          title: title,
          salary: salary,
          isItManager: isItManager,
          department_name: departmentId,
        };

        db.query(`INSERT INTO titles SET ?`, newRole, (err, result) => {
          if (err) {
            console.log("Error adding role:", err);
          } else {
            console.log("Title added successfully!");
          }
        });
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
}
function addManager() {
  db.query(
    `select * from titles where isItManager = 1`,
    function (err, titles) {
      console.table(titles);

      db.query(`select * from departments`, function (err, departments) {
        console.table(departments);

        inquirer
          .prompt([
            {
              type: "input",
              message: "What is the full name of the manager?",
              name: "manager_name",
            },
            {
              type: "list",
              message: "What is their title?",
              name: "manager_title",
              choices: titles.map((title) => title.title),
            },
          ])
          .then((answers) => {
            console.log(answers);
            const { manager_name, manager_title } = answers;
            const findTitleId = titles.find(
              (titles) => titles.title === manager_title
            ).id;
            console.log(findTitleId);
            const newManager = {
              manager_name: manager_name,
              title: findTitleId,
            };
            db.query(
              "INSERT INTO managers SET ?",
              newManager,
              function (err, results) {
                if (err) {
                  console.log("Failed to enter new manager");
                } else {
                  console.log("Manager added successfully!");
                }
              }
            );
          })
          .catch((error) => {
            console.log("Error:", error);
          });
      });
    }
  );
}

function viewEmployees() {
  const employeesquery = `Select employees.last_name, employees.first_name, titles.title, titles.salary, titles.isItManager, departments.department_name, managers.manager_name from employees 
  join titles on titles.id = employees.title
  Join departments on departments.id = titles.department_name
  Left join managers on managers.id = employees.manager_name
  Order by employees.last_name`;

  db.query(employeesquery, function (err, results) {
    console.table(results);
  });
}
function addEmployee() {
  db.query(`SELECT * FROM titles`, function (err, titles) {
    console.table(titles);

    db.query(`SELECT * FROM departments`, function (err, departments) {
      inquirer
        .prompt([
          {
            type: "input",
            message: "What is the employee's first name?",
            name: "firstName",
            validate: function (input) {
              const done = this.async();
              if (input.length === 0) {
                done("You need to enter a first name.");
                return;
              }
              done(null, true);
            },
          },
          {
            type: "input",
            message: "What is the employee's last name?",
            name: "lastName",
            validate: function (input) {
              const done = this.async();
              if (input.length === 0) {
                done("You need to enter a last name.");
                return;
              }
              done(null, true);
            },
          },
          {
            type: "list",
            message: "Please select the employee's title",
            name: "employeeTitle",
            choices: titles.map((title) => title.title),
          },
        ])
        .then((answers) => {
          const { firstName, lastName, employeeTitle } = answers;
          console.log(employeeTitle);

          const selectedTitle = titles.find(
            (title) => title.title === employeeTitle
          );
          console.log(selectedTitle);
          const titleId = selectedTitle.id;
          console.log(titleId);

          const selectedDepartment = departments.find(
            (department) => department.id === selectedTitle.department_name
          );
          console.log(selectedDepartment);
          const departmentId = selectedDepartment.id; 
          console.log(departmentId)
        });
    });
  });
}
init();
