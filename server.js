const promptUser = require("./script/prompt");
const fs = require("fs");
const path = require("path");
const express = require("express");
const mysql = require("mysql2");
const PORT = process.env.PORT || 3001;
const app = express();

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
    database: "movies_db",
  },
  console.log(`Connected to the employee database.`)
);

promptUser().then((answer) => {
  const { userSelect } = answer;
  console.log(userSelect);
  switch (userSelect) {
    case "View All Departments":
      showDepartments();
      break;
  }
});

function showDepartments() {
  db.query("SELECT * FROM departments", function (err, results) {
    console.log(results);
  });
}
