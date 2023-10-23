const promptUser = require("./script/prompt");
const fs = require("fs");
const path = require("path");

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// Connect to database
// const db = mysql.createConnection(
//   {
//     host: "localhost",
//     // MySQL username,
//     user: "root",
//     // TODO: Add MySQL password here
//     password: "Password1",
//     database: "movies_db",
//   },
//   console.log(`Connected to the movies_db database.`)
// );

promptUser().then((answers) => {
  console.log(answers);
});
