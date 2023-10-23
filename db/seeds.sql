INSERT INTO departments (department_name)
VALUES ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Sales');
INSERT INTO roles (title, department_id, manager)
VALUES ('Sales Lead', 4, true),
  ('Salesperson', 4, false),
  ('Lead Engineer', 1,  true),
  ('Software Engineer', 1, false),
  ('Account Manger', 2, true),
  ('Accountant', 2, false),
  ('Legal Team Lead', 3, true),
  ('Laywer', 3, false);


INSERT INTO managers (full_Name, role_id, manager, department_id)
VALUES ('John Doe', 2, 1, 4),
  ('Ashley Rodriguez', 3, 1, 1),
  ('Kunal Singh', 6, 1, 2),
  ('Sara Lourd', 8, 1, 4);


INSERT INTO employees (first_name, last_name, role_id, department_id, salary, manager_id)
VALUES ('John', 'Doe', 1, 4, 100000, 1),
  ('Mike', 'Chan', 2, 4, 800000, NULL),
  ('Ashley', 'Rodriguez', 3, 1, 150000, 1),
  ('Kevin', 'Tupik', 4, 1, 120000, NULL),
  ('Kunal', 'Singh', 5, 2, 160000, 1),
  ('Malia', 'Brown', 6, 2, 125000, NULL ),
  ('Sara', 'Lourd', 7, 3, 250000, 1),
  ('Tom', 'Allen', 8, 3, 190000, NULL);