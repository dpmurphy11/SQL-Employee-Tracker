-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema company_db
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `company_db` ;

-- -----------------------------------------------------
-- Schema company_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `company_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `company_db` ;

-- -----------------------------------------------------
-- Table `company_db`.`department`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `company_db`.`department` ;

CREATE TABLE IF NOT EXISTS `company_db`.`department` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `company_db`.`role`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `company_db`.`role` ;

CREATE TABLE IF NOT EXISTS `company_db`.`role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(30) NOT NULL,
  `salary` DECIMAL(10,0) NOT NULL,
  `department_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_department_idx` (`department_id` ASC) VISIBLE,
  CONSTRAINT `FK_department`
    FOREIGN KEY (`department_id`)
    REFERENCES `company_db`.`department` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `company_db`.`employee`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `company_db`.`employee` ;

CREATE TABLE IF NOT EXISTS `company_db`.`employee` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(30) NULL DEFAULT NULL,
  `last_name` VARCHAR(30) NULL DEFAULT NULL,
  `role_id` INT NULL DEFAULT NULL,
  `manager_id` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_role_idx` (`role_id` ASC) VISIBLE,
  INDEX `FK_manager_idx` (`manager_id` ASC) VISIBLE,
  CONSTRAINT `FK_manager`
    FOREIGN KEY (`manager_id`)
    REFERENCES `company_db`.`employee` (`id`)
    ON DELETE SET NULL,
  CONSTRAINT `FK_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `company_db`.`role` (`id`)
    ON DELETE SET NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
