-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- procedure prc_deleteDepartment
-- -----------------------------------------------------

USE `company_db`;
DROP procedure IF EXISTS `company_db`.`prc_deleteDepartment`;

DELIMITER $$
USE `company_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_deleteDepartment`(department_id int)
BEGIN
	delete from department where id = department_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure prc_deleteEmployee
-- -----------------------------------------------------

USE `company_db`;
DROP procedure IF EXISTS `company_db`.`prc_deleteEmployee`;

DELIMITER $$
USE `company_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_deleteEmployee`(employee_id int)
BEGIN
	delete from employee where id = employee_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure prc_deleteRole
-- -----------------------------------------------------

USE `company_db`;
DROP procedure IF EXISTS `company_db`.`prc_deleteRole`;

DELIMITER $$
USE `company_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_deleteRole`(role_id int)
BEGIN
	delete from role where id = role_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure prc_fetchDepartment
-- -----------------------------------------------------

USE `company_db`;
DROP procedure IF EXISTS `company_db`.`prc_fetchDepartment`;

DELIMITER $$
USE `company_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_fetchDepartment`(dept_id int)
BEGIN
	if dept_id is not null then
   		select id, name 
        from department	
        where id = dept_id;
	else 
   		select id, name from department;
	END IF;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure prc_fetchEmployee
-- -----------------------------------------------------

USE `company_db`;
DROP procedure IF EXISTS `company_db`.`prc_fetchEmployee`;

DELIMITER $$
USE `company_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_fetchEmployee`(employee_id int, mgr_id int, department_id int)
BEGIN
	if department_id is not null then
   		select employee.id, first_name, last_name, role_id, manager_id, department_id, title, name as department
		from employee
		inner join role on employee.role_id = role.id
		inner join department on department.id = role.department_id 
		where department.id = department_id
        order by first_name, last_name;
	elseif mgr_id is not null then
    		select id, first_name, last_name, role_id, manager_id 
        from employee
        where manager_id = mgr_id
        order by first_name, last_name;
	elseif employee_id is not NULL then
		select id, first_name, last_name, role_id, manager_id 
        from employee
		where id = employee;
	else
		select id, first_name, last_name, role_id, manager_id 
        from employee
        order by first_name, last_name;
	end if;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure prc_fetchRole
-- -----------------------------------------------------

USE `company_db`;
DROP procedure IF EXISTS `company_db`.`prc_fetchRole`;

DELIMITER $$
USE `company_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_fetchRole`(roleId int)
BEGIN
	if roleId  is not null then
   		select id, title, salary, department_id 
        from role
        where id = roleId;
	else 
   		select id, title, salary, department_id 
        from role;
	end if;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure prc_getTotalSalaryByDept
-- -----------------------------------------------------

USE `company_db`;
DROP procedure IF EXISTS `company_db`.`prc_getTotalSalaryByDept`;

DELIMITER $$
USE `company_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_getTotalSalaryByDept`(dept_id int)
BEGIN
	select role.id as role_id, department.id as department_id, sum(salary), department.name as department
    from role
    inner join department on role.department_id = department.id
    inner join employee on role.id = employee.role_id
    where department_id = dept_id
    group by department_id;
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure prc_insertDepartment
-- -----------------------------------------------------

USE `company_db`;
DROP procedure IF EXISTS `company_db`.`prc_insertDepartment`;

DELIMITER $$
USE `company_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_insertDepartment`(dpt_name varchar(30))
BEGIN
	insert into department (name) 
	values (dpt_name);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure prc_insertEmployee
-- -----------------------------------------------------

USE `company_db`;
DROP procedure IF EXISTS `company_db`.`prc_insertEmployee`;

DELIMITER $$
USE `company_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_insertEmployee`(firstName varchar(30), lastName varchar(30), roleId int, managerId int)
BEGIN
	insert into employee (first_name, last_name, role_id, manager_id) 
	values (firstName, lastName, roleId, managerId);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure prc_insertRole
-- -----------------------------------------------------

USE `company_db`;
DROP procedure IF EXISTS `company_db`.`prc_insertRole`;

DELIMITER $$
USE `company_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_insertRole`(emp_title varchar(30), emp_salary varchar(30), dpt_id int)
BEGIN
	insert into role (title, salary, department_id) 
	values (emp_title, emp_salary, dpt_id);
END$$

DELIMITER ;

-- -----------------------------------------------------
-- procedure prc_updateEmployee
-- -----------------------------------------------------

USE `company_db`;
DROP procedure IF EXISTS `company_db`.`prc_updateEmployee`;

DELIMITER $$
USE `company_db`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `prc_updateEmployee`(employeeId int, firstName varchar(30), lastName varchar(30), roleId int, managerId int)
BEGIN
	update employee set first_name = firstName ,
		last_name = lastName,
		role_id = roleId, 
		manager_id = managerId
    where id = employeeId;
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
