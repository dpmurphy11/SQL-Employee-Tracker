// module for faormatting and outputing recordeset data to console
const cTable = require('console.table');

class consoleUtil {
    constructor() {
        //
    }

    showSplash() {
        // show splash screen
    }

    // render the recordset to console using CTable
    renderOutput = (rs, type) => {
        switch (type) {
            case process.env.VIEW_ALL_EMPS:
            case process.env.ADD_EMP:
            case process.env.DELETE_EMP:
            case process.env.UPDATE_EMP_ROLE:
            case process.env.UPDATE_EMP_MNGR:
            case process.env.UPDATE_EMP_MNGR:
                let arrEmployees = rs.map(({ id, first_name, last_name, title, department, salary, mgr_first_name, mgr_last_name }) => ({
                    id: id,
                    'first name': first_name,
                    'last name': last_name,
                    title: title,
                    department: department,
                    salary: salary,
                    manager: `${mgr_first_name} ${mgr_last_name}`,
                }));
                console.log('\n');
                console.table(arrEmployees);
                console.log('\n');
                break;
            case process.env.VIEW_ALL_ROLES:
            case process.env.DELETE_ROLE:
            case process.env.ADD_ROLE:
                let arrRoles = rs.map(({ id, title, salary, name }) => ({
                    id: id,
                    title: title,
                    department: name,
                    salary: salary,
                }));
                console.log('\n');
                console.table(arrRoles);
                console.log('\n');
                break;
            case process.env.VIEW_ALL_DEPTS:
            case process.env.DELETE_DEPT:
            case process.env.ADD_DEPT:
                let arrDepts = rs.map(({ id, name }) => ({
                    id: id,
                    department: name,
                }));
                console.log('\n');
                console.table(arrDepts);
                console.log('\n');
                break;
            case process.env.VIEW_BUDGET:
                let arrBudget = rs.map(({ total, name }) => ({
                    total_budget: total,
                    department: name,
                }));
                console.log('\n');
                console.table(arrBudget);
                console.log('\n');
                break;
            default:
                console.log('error ocurred in consolUtol.');
                break;
        }
    }
}

module.exports = consoleUtil;