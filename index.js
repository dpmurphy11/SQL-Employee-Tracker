// Import and require mysql2
const mysql = require('mysql2');
const cTable = require('console.table');
const PORT = process.env.PORT || 3001;

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: '',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// Query database
let empId = 1;
let mgrId = null;
let dptId = null;
db.query(`call prc_fetchEmployee(${empId}, ${mgrId}, ${dptId})`, function (err, results) {
    // console.error(err);
  console.table(Results);
});
