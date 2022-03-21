// class for all data access functionality
const mysql = require('mysql2');
const cTable = require('console.table');

class dataAccess {
    constructor() {
        this.dbConnection;
    }

    connect() {
        this.dbConnection = mysql.createConnection(
            {
                host: 'localhost',
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
            },
            console.log(`Welcome to the SQL Employee Tracker`)
        );
    }

    disconnect() {
        this.dbConnection.destroy();
        // console.log(`Connection to the ${process.env.DB_NAME} database closed.`)
    }

    fetchEmployees(employeeId, managerId, departmentId) {
        return this.dbConnection.promise().query(`call prc_fetchEmployee(${employeeId}, ${managerId}, ${departmentId})`);
    }

    fetchDepartments(departmentId) {
        return this.dbConnection.promise().query(`call prc_fetchDepartment(${departmentId})`);
    }

    fetchRoles(roleID) {
        return this.dbConnection.promise().query(`call prc_fetchRole(${roleID})`);
    }

    fetchBudegetbyDept(deptID) {
        return this.dbConnection.promise().query(`call prc_getTotalSalaryByDept(${deptID})`);
    }

    deleteDept(deptId) {
        return this.dbConnection.promise().query(`call prc_deleteDepartment(${deptId})`);
    }

    deleteEmployee(employeeId) {
        return this.dbConnection.promise().query(`call prc_deleteEmployee(${employeeId})`);
    }

    deleteRole(roleId) {
        return this.dbConnection.promise().query(`call prc_deleteRole(${roleId})`);
    }

    insertDept(deptName) {
        return this.dbConnection.promise().query(`call prc_insertDepartment('${deptName}')`);
    }

    insertEmployee(firstName, lastName, roleId, managerId) {
        return this.dbConnection.promise().query(`call prc_insertEmployee('${firstName}', '${lastName}', ${roleId}, ${managerId})`);
    }

    insertRole(title, salary, departmentId) {
        return this.dbConnection.promise().query(`call prc_insertRole('${title}', ${salary}, ${departmentId})`);
    }

    updateEmployee(employeeId, firstName, lastName, roleId, managerId) {
        return this.dbConnection.promise().query(`call prc_updateEmployee(${employeeId}, '${firstName}', '${lastName}', ${roleId}, ${managerId})`);
    }

    updateEmployeeRole(employeeId, roleId) {
        return this.dbConnection.promise().query(`call prc_updateEmployeeRole(${employeeId}, ${roleId})`);
    }

    updateEmployeeManager(employeeId, managerId) {
        return this.dbConnection.promise().query(`call prc_updateEmployeeManager(${employeeId}, ${managerId})`);
    }

}

module.exports = dataAccess;
