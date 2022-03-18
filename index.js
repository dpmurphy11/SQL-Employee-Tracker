const dataAccessObject = require('./utils/clsDataAccess');

const dao = new dataAccessObject;
dao.connect();
dao.getAllEmployees();