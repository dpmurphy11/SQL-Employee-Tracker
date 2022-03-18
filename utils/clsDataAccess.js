// class for all data access functionality
const mysql = require('mysql2');
const cTable = require('console.table');

class dataAccess {
    constructor() {
        this.dbConnection;
        this.employeeId = null;
        this.managerId = null;
        this.departmentId = null;
        this.roleId = null;
    }

    connect() {
        this.dbConnection = mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: '',
                database: 'company_db'
            },
            console.log(`Connected to the company_db database.`)
        );    
    }

    getAllEmployees() {
        this.dbConnection.query(`call prc_fetchEmployee(${this.employeeId}, ${this.managerId}, ${this.departmentId})`, function (err, results) {
            // sp's return a nested array. must extract the nested array which is the dataset
            let resultSet = results[0, 0];
            console.log(resultSet);
            console.table(resultSet);
        });
    }
}

module.exports = dataAccess;
