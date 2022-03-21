const dataAccessObject = require('./utils/clsDataAccess');
const outputHelper = require('./utils/clsConsoleUtil')
const inquirer = require('inquirer');
require('dotenv').config();
const userActions = [
    { name: 'View all employees.', value: process.env.VIEW_ALL_EMPS, },
    { name: 'View employee by manager.', value: process.env.VIEW_EMPS_BY_MGR, },
    { name: 'View employee by department.', value: process.env.VIEW_EMPS_BY_DEPT, },
    { name: 'View all roles.', value: process.env.VIEW_ALL_ROLES, },
    { name: 'View all departments.', value: process.env.VIEW_ALL_DEPTS, },
    { name: 'Add an employee.', value: process.env.ADD_EMP, },
    { name: 'Add a role.', value: process.env.ADD_ROLE, },
    { name: 'Add a department.', value: process.env.ADD_DEPT, },
    { name: 'Update employee role.', value: process.env.UPDATE_EMP_ROLE, },
    { name: 'Update employee manager.', value: process.env.UPDATE_EMP_MNGR, },
    { name: 'Delete a department.', value: process.env.DELETE_DEPT, },
    { name: 'Delete a role.', value: process.env.DELETE_ROLE, },
    { name: 'Delete an employee.', value: process.env.DELETE_EMP, },
    { name: 'View budget by department.', value: process.env.VIEW_BUDGET, },
    { name: 'Quit.', value: process.env.QUIT, },
];

const dao = new dataAccessObject;
const oh = new outputHelper;

// main inquirer menu
const mainMenu = async () => {
    // reset dao properties
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: userActions,
            },
        ])
        .then((answers) => {
            const mainAnswer = answers.action;
            switch (mainAnswer) {
                case process.env.VIEW_ALL_EMPS:
                    // fetch and show employees
                    getEmployees(null, null, null, mainAnswer);
                    break;
                case process.env.VIEW_EMPS_BY_MGR:
                    getEmployeesMgr();
                    break;
                case process.env.VIEW_EMPS_BY_DEPT:
                    getEmployeesByDept();
                    break;
                case process.env.VIEW_ALL_ROLES:
                    getAllRoles(mainAnswer);
                    break;
                case process.env.VIEW_ALL_DEPTS:
                    getAllDepartments(mainAnswer);
                    break;
                case process.env.ADD_EMP:
                    addEmployee(mainAnswer);
                    break;
                case process.env.ADD_ROLE:
                    addRole(mainAnswer);
                    break;
                case process.env.ADD_DEPT:
                    addDepartment(mainAnswer);
                    break;
                case process.env.UPDATE_EMP_ROLE:
                    updateEmployeeRole(mainAnswer);
                    break;
                case process.env.UPDATE_EMP_MNGR:
                    updateEmployeeManager(mainAnswer);
                    break;
                case process.env.DELETE_DEPT:
                    deleteDepartment(mainAnswer);
                    break;
                case process.env.DELETE_ROLE:
                    deleteRole(mainAnswer);
                    break;
                case process.env.DELETE_EMP:
                    deleteEmployee(mainAnswer);
                    break;
                case process.env.VIEW_BUDGET:
                    getBudgetByDept(mainAnswer);
                    break;
                case process.env.QUIT:
                    dao.disconnect();
                    console.log('GOODBYE!');
                    process.exit();
                default:
                    console.log('Invalid selections. Please try again.');
                    mainMenu();
                    break;
            }
        });
}

const getEmployees = (empId, mgrId, deptId, action) => {
    // fetch employees recordset
    dao.fetchEmployees(empId, mgrId, deptId)
        .then(([res]) => {
            let employees = res[0, 0];
            if (!employees.length) {
                console.log('\nNo employees were found.\n');
            } else {
                // format and output rs to console
                oh.renderOutput(employees, action);
            }
        })
        .then(() => mainMenu());
}

const getEmployeesMgr = () => {
    // fetch employees
    dao.fetchEmployees(null, null, null)
        .then(([res]) => {
            let employees = res[0, 0];
            // format and output prompt
            const mgrPrompts = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'mgrId',
                    message: 'Please choose a manager.',
                    choices: mgrPrompts
                }
            ])
                // get employees for that manager, format and show
                .then(answers => getEmployees(null, answers.mgrId, null, process.env.VIEW_ALL_EMPS))
        });
}

const getEmployeesByDept = () => {
    // fetch departments
    dao.fetchDepartments(null)
        .then(([res]) => {
            let departments = res[0, 0];
            // format and output prompt
            const deptPrompts = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'deptId',
                    message: 'Please choose a department.',
                    choices: deptPrompts
                }
            ])
                // get employees for that dept, format and show
                .then(answers => getEmployees(null, null, answers.deptId, process.env.VIEW_ALL_EMPS))
        });
}

const getAllRoles = (action) => {
    // fetch roles
    dao.fetchRoles(null)
        .then(([res]) => {
            let roles = res[0, 0];
            if (!roles.length) {
                console.log('\nNo roles were found.\n');
            } else {
                // format and output rs to console
                oh.renderOutput(roles, action);
            }
        })
        .then(() => mainMenu());
}

const getAllDepartments = (action) => {
    // fetch departments
    dao.fetchDepartments(null)
        .then(([res]) => {
            let depts = res[0, 0];
            if (!depts.length) {
                console.log('\nNo departments were found.\n');
            } else {
                // format and output rs to console
                oh.renderOutput(depts, action);
            }
        })
        .then(() => mainMenu());
}

const getBudgetByDept = (action) => {
    // fetch departments
    dao.fetchDepartments(null)
        .then(([res]) => {
            let departments = res[0, 0];
            // format and output prompt
            const deptPrompts = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'deptId',
                    message: 'Please choose a department.',
                    choices: deptPrompts
                }
            ])
                // get budget for that dept, format and show
                .then((answers) => {
                    dao.fetchBudegetbyDept(answers.deptId)
                        .then(([res]) => {
                            let budgetRS = res[0, 0];
                            if (!budgetRS.length) {
                                console.log('\nNo roles or employees were found for that department.\n');
                            } else {
                                // format and output rs to console
                                oh.renderOutput(budgetRS, action);
                            }
                        })
                        .then(() => mainMenu());
                });
        });
}

const addEmployee = (action) => {
    inquirer.prompt([
        {
            name: 'first_name',
            message: 'Enter a first name for the new employee.'
        },
        {
            name: 'last_name',
            message: 'Enter a last name for the new employee.'
        },
    ])
        .then(answers => {
            let firstName = answers.first_name;
            let lastName = answers.last_name;

            dao.fetchRoles(null)
                .then(([res]) => {
                    let roles = res[0, 0];
                    // format and output prompt
                    const rolePrompts = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'roleId',
                            message: 'Please choose a role for this new employee.',
                            choices: rolePrompts
                        }
                    ])
                        .then((answers) => {
                            let roleId = answers.roleId;

                            dao.fetchEmployees(null, null, null)
                                .then(([res]) => {
                                    let managers = res[0, 0];
                                    // format and output prompt
                                    const managerPrompts = managers.map(({ id, first_name, last_name }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));
                                    inquirer.prompt([
                                        {
                                            type: 'list',
                                            name: 'managerId',
                                            message: 'Please choose a manager for this new employee.',
                                            choices: managerPrompts
                                        }
                                    ])
                                        .then(answers => {
                                            let managerId = answers.managerId;
                                            // insert new employee
                                            dao.insertEmployee(firstName, lastName, roleId, managerId)
                                                // get updated table and show
                                                .then(([res]) => {
                                                    let employees = res[0, 0];
                                                    if (!employees.length) {
                                                        console.log('\nNo employees were found.\n');
                                                    } else {
                                                        // format and output rs to console
                                                        oh.renderOutput(employees, action);
                                                    }
                                                })
                                                .then(() => mainMenu());
                                        });
                                });
                        });
                });
        });
}

const addRole = (action) => {
    dao.fetchDepartments(null)
        .then(([res]) => {
            let departments = res[0, 0];
            // format and output prompt
            const deptPrompts = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'deptId',
                    message: 'Please choose a department for this role.',
                    choices: deptPrompts
                }
            ])
                .then((answers) => {
                    let deptId = answers.deptId;
                    inquirer.prompt([
                        {
                            type: 'input',
                            name: 'salary',
                            message: 'Please enter a salary for this new role.',
                        }
                    ])
                        .then((answers) => {
                            let salary = answers.salary
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'roleName',
                                    message: 'Please enter a new role name.',
                                }
                            ])
                                // insert the department
                                .then(answers => dao.insertRole(answers.roleName, salary, deptId))
                                // get updated table and show
                                .then(([res]) => {
                                    let roles = res[0, 0];
                                    if (!roles.length) {
                                        console.log('\nNo roles were found.\n');
                                    } else {
                                        // format and output rs to console
                                        oh.renderOutput(roles, action);
                                    }
                                })
                                .then(() => mainMenu());
                        });
                });
        });
}

const addDepartment = (action) => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'deptName',
            message: 'Please enter a new department.',
        }
    ])
        // insert the department
        .then(answers => dao.insertDept(answers.deptName))
        // get updated table and show
        .then(([res]) => {
            let departments = res[0, 0];
            if (!departments.length) {
                console.log('\nNo departments were found.\n');
            } else {
                // format and output rs to console
                oh.renderOutput(departments, action);
            }
        })
        .then(() => mainMenu());
}

const updateEmployeeRole = (action) => {
    // fetch employees
    dao.fetchEmployees(null, null, null)
        .then(([res]) => {
            let employees = res[0, 0];
            // format and output prompt
            const employeePrompts = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Please choose an employee to update.',
                    choices: employeePrompts
                }
            ])

                .then(answers => {
                    let employeeId = answers.employeeId;
                    // fetch roles
                    dao.fetchRoles(null)
                        .then(([res]) => {
                            let roles = res[0, 0];
                            // format and output prompt
                            const rolePrompts = roles.map(({ id, title, salary }) => ({
                                name: title,
                                salary: salary,
                                value: id
                            }));

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'roleId',
                                    message: 'Please choose a new role.',
                                    choices: rolePrompts
                                }
                            ])
                                .then(answers => {
                                    let roleId = answers.roleId;

                                    // update the employee
                                    dao.updateEmployeeRole(employeeId, roleId,)
                                        // get updated table and show
                                        .then(([res]) => {
                                            let employees = res[0, 0];
                                            if (!employees.length) {
                                                console.log('\nNo employees were found.\n');
                                            } else {
                                                // format and output rs to console
                                                oh.renderOutput(employees, action);
                                            }
                                        })
                                        .then(() => mainMenu());
                                })
                        });
                });
        });
}

const updateEmployeeManager = (action) => {
    // fetch employees
    dao.fetchEmployees(null, null, null)
        .then(([res]) => {
            let employees = res[0, 0];
            // format and output prompt
            const employeePrompts = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Please choose an employee to update.',
                    choices: employeePrompts
                }
            ])

                .then(answers => {
                    let employeeId = answers.employeeId;
                    // fetch employees
                    dao.fetchEmployees(null, null, null)
                        .then(([res]) => {
                            let managers = res[0, 0];
                            // format and output prompt
                            const managerPrompts = managers.map(({ id, first_name, last_name }) => ({
                                name: `${first_name} ${last_name}`,
                                value: id
                            }));

                            inquirer.prompt([
                                {
                                    type: 'list',
                                    name: 'managerId',
                                    message: 'Please choose an manager for this employee.',
                                    choices: managerPrompts
                                }
                            ]).then(answers => {
                                let managerId = answers.managerId;

                                // update the employee
                                dao.updateEmployeeManager(employeeId, managerId)
                                    // get updated table and show
                                    .then(([res]) => {
                                        let employees = res[0, 0];
                                        if (!employees.length) {
                                            console.log('\nNo employees were found.\n');
                                        } else {
                                            // format and output rs to console
                                            oh.renderOutput(employees, action);
                                        }
                                    })
                                    .then(() => mainMenu());
                            })
                        });
                });
        });
}

const deleteDepartment = (action) => {

    // fetch departments
    dao.fetchDepartments(null)
        .then(([res]) => {
            let departments = res[0, 0];
            // format and output prompt
            const deptPrompts = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'deptId',
                    message: 'Please choose a department to delete.',
                    choices: deptPrompts
                }
            ])

                // delete the department
                .then(answers => dao.deleteDept(answers.deptId))
                // get updated table and show
                .then(([res]) => {
                    let departments = res[0, 0];
                    if (!departments.length) {
                        console.log('\nNo departments were found.\n');
                    } else {
                        // format and output rs to console
                        oh.renderOutput(departments, action);
                    }
                })
                .then(() => mainMenu());
        });
}

const deleteRole = (action) => {
    // fetch roles
    dao.fetchRoles(null)
        .then(([res]) => {
            let roles = res[0, 0];
            // format and output prompt
            const rolePrompts = roles.map(({ id, title, salary }) => ({
                name: title,
                salary: salary,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'roleId',
                    message: 'Please choose a role to delete.',
                    choices: rolePrompts
                }
            ])
                // delete the role
                .then(answers => dao.deleteRole(answers.roleId))
                // get updated table and show
                .then(([res]) => {
                    let roles = res[0, 0];
                    if (!roles.length) {
                        console.log('\nNo roles were found.\n');
                    } else {
                        // format and output rs to console
                        oh.renderOutput(roles, action);
                    }
                })
                .then(() => mainMenu());
        });
}

const deleteEmployee = (action) => {
    // fetch employees
    dao.fetchEmployees(null, null, null)
        .then(([res]) => {
            let employees = res[0, 0];
            // format and output prompt
            const employeePrompts = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employeeId',
                    message: 'Please choose an employee to delete.',
                    choices: employeePrompts
                }
            ])

                // delete the employee
                .then(answers => dao.deleteEmployee(answers.employeeId))
                // get updated table and show
                .then(([res]) => {
                    let employees = res[0, 0];
                    if (!employees.length) {
                        console.log('\nNo employees were found.\n');
                    } else {
                        // format and output rs to console
                        oh.renderOutput(employees, action);
                    }
                })
                .then(() => mainMenu());
        });
}

function init() {
    dao.connect();
    oh.showSplash();
    // use inquirer to start questions
    mainMenu();
}

init();