const dataAccessObject = require('./utils/clsDataAccess');
const outputHelper = require('./utils/consoleUtil')
const inquirer = require('inquirer');

// create data access object and call method to connect to db
const dao = new dataAccessObject;
dao.connect();

outputHelper.showSplash();
// main inquirer menu
const mainMenu = () => {
    // reset dao properties
    dao.departmentId = null;
    dao.employeeId = null;
    dao.managerId = null;
    dao.roleId = null;
    console.log('What would you like to do?')
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['View all employees.',
                            'View employee by manager.',
                            'View employee by department.',
                            'View all roles.',
                            'View all departments.',
                            'Add an employee',
                            'Add a role.',
                            'Add a department',
                            'Update employee role.',
                            'Update employee manager.',
                            'Delete department',
                            'Delete role',
                            'Delete employee',
                            'View budget by department',
                        ],
            },
        ])
        .then((answers) => {
            switch (answers) {
                case 'View all employees.':
                    // fetch recordset
                    var jsonRS = getEmployees(null, null, null);
                    // format and output rs to console
                    outputHelper.renderOutput(jsonRS);
                    // return to main menu
                    mainMenu();
                break;
                case 'View employee by manager.':
                    // fetch rs of employees to choos from
                    var jsonRS = getEmployees(null, null, null);
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'action',
                            message: 'Please choose a manager.',
                            choices: jsonRS,
                        },
                    ])
                    .then((answers) => {
                        // get employess by manager id
                        var jsonRS = getEmployees(null, answers.id, null);
                        outputHelper.renderOutput(jsonRS);
                        // return to main menu
                        mainMenu();
                    });
                break;
                case 'View employee by department.':
                    // fetch rs of departments to choose from
                    var jsonRS = getDepartments(null);
                    inquirer
                    .prompt([
                        {
                            type: 'list',
                            name: 'action',
                            message: 'Please choose a department.',
                            choices: jsonRS,
                        },
                    ])
                    .then((answers) => {
                        // get employess by department id
                        var jsonRS = getEmployees(null, null, answers.id);
                        outputHelper.renderOutput(jsonRS);
                        // return to main menu
                        mainMenu();
                    });
                break;
            
                default:
                    break;
            }
            // create manager object and add properties to it
            const manager = new Manager(answers.mgrName, parseInt(answers.mgrId), answers.mgrEmail, parseInt(answers.mgrOfficeNo));
            // add manager to arrEmployees
            arrEmployees.push(manager);
            askEmployeeQuestions();
        })
}

const getEmployees = (empId, mgrId, deptId) => {
    // fetch recordset
    return dao.fetchEmployees(empId, mgrId, deptId);
}

const getDepartments = () => {
    // fetch recordset
    return dao.fetchEmployees(empId, mgrId, deptId);
}
let askInternQuestions = () => {
    // ask intern questions and add to arrEmployees
    inquirer.prompt([
        {
            type: 'input',
            name: 'intName',
            message: 'What is your intern\'s name?',
            default: 'Bob Jones',
        },
        {
            inte: 'input',
            name: 'intEmail',
            message: 'What is your intern\'s email?',
            default: 'bob@jones.com',
        },
        {
            type: 'input',
            name: 'intId',
            message: 'What is your intern\'s id?',
            validate: (input) => {
                if (!input || isNaN(input)) {
                    console.log('Answer must be a number.');
                    return false;
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'intSchool',
            message: 'What is your intern\'s school?',
            default: 'UMASS-Boston',
        },
    ])
        .then((answers) => {
            // create intern object and add properties to it
            let intern = new Intern(answers.intName, parseInt(answers.intId), answers.intEmail, answers.intSchool);
            // add intern to arrEmployees
            arrEmployees.push(intern);
            // start at the top
            askEmployeeQuestions();
        })
}

let askEngineerQuestions = () => {
    // ask engineer questions and add to arrEmployees
    inquirer.prompt([
        {
            type: 'input',
            name: 'engName',
            message: 'What is your engineer\'s name?',
            default: 'Jim Brown',
        },
        {
            type: 'input',
            name: 'engEmail',
            message: 'What is your engineer\'s email?',
            default: 'jim@brown.com',
        },
        {
            type: 'input',
            name: 'engId',
            message: 'What is your engineer\'s id?',
            validate: (input) => {
                if (!input || isNaN(input)) {
                    console.log('Answer must be a number.');
                    return false;
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'engGitHub',
            message: 'What is your engineer\'s GitHub username?',
        },
    ])
    .then((answers) => {
        // create engineer object and add properties to it
        let engineer = new Engineer(answers.engName, parseInt(answers.engId), answers.engEmail, answers.engGitHub);
        arrEmployees.push(engineer);
        // start at the top
        askEmployeeQuestions();
    })
}

// get type of employee and add each to arrEmployees
let askEmployeeQuestions = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'empType',
            message: 'Which type of employee would you like to add to the team?',
            choices: ['Engineer', 'Intern', 'I\'m done',],
        }
    ])
    .then((answers) => {
        if (answers.empType == 'Intern') {
            askInternQuestions();
        } else if (answers.empType == 'Engineer') {
            askEngineerQuestions();
        } else {
            generateOutput();
        }
    });
}

//  a function to write README file
let writeToFile = (fileName, data) => {
    fs.writeFile(fileName, data, (err) => {
        err ? console.log(`Unable to save file. ${err}`) : console.log('The file has been saved!');
    })
};

// generate HTML and write file
let generateOutput = () => {

    // create html file
    let output = renderOutput(arrEmployees);

    // write to dist and include css there
    writeToFile('./dist/index.html', output); 
}


// use inquirer to start questions
mainMenu();