const inquirer = require("inquirer");

function promptUser() {
  return inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "userSelect",
      choices: [
        "View all Managers",
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add Role",
        "View All Departments",
        "Add Department",
        "Quit",
      ],
      default: "View All Employees",
    },
  ]);
}

module.exports = promptUser; 