use company_db;

insert into department (name) 
values 
	('Sales'),
    ('Marketing'),
    ('IT'),
    ('Administration'),
    ('Finance'),
    ('Executive');
    
insert into role (title, salary, department_id)
values ('Salesperson', 100000.00, 1),
		('President', 750000.00, 6),
        ('Engineer', 150000.00, 3),
        ('Bookkeeper', 75000.00, 5),
        ('Reception', 600000.00, 4),
        ('SEO', 90000, 2),
		('Sales Manager', 250000.00, 1),
        ('Head of IT', 350000.00, 3),
        ('Marketing Manager', 300000.00, 2);

insert into employee (first_name, last_name, role_id, manager_id)
values ('Charlie', 'Coyle', 2, null),
		('Jake', 'DeBrusk', 9, 1),
        ('Trent', 'Frederic', 8, 1),
        ('Taylor', 'Hall', 7, 1),
        ('Patrice', 'Bergeron', 5, 1),
        ('Erik', 'Haula', 1, 4),
        ('Curtis ', 'Lazar', 3, 3),
        ('Brad', 'Marchand', 6, 2),
        ('David', 'Pastrnak', 3, 3),
        ('Brandon', 'Carlo', 1, 4),
        ('Derek', 'Forbort', 1, 4),
        ('Matt', 'Grzelcyk', 3, 3),
        ('Charlie', 'McAvoy', 3, 3),
        ('Craig', 'Smith', 4, 2);
        