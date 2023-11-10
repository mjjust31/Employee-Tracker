const inquirer = require("inquirer");

function promptUser() {
  return inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "userSelect",
      choices: [
        "View All Departments",
        "View all Managers",
        "View All Employees",
        "View All Roles",
        "Add Role",
        "Add Department",
        "Add Employee",
        "Add Manager",
        "Update Employee Role",
        "Quit",
      ],
      default: "Add Employee",
    },
  ]);
}

module.exports = promptUser;
