INSERT INTO departments (department_name)
VALUES ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Sales');
INSERT INTO titles (title, salary, isItManager, department_name)
VALUES ('Sales Lead', 100000, true, 4),
  ('Salesperson', 80000, false, 4),
  ('Lead Engineer', 150000, true, 1),
  ('Software Engineer', 120000, false, 1),
  ('Account Manger', 160000, true, 2),
  ('Accountant', 125000, false, 2),
  ('Legal Team Lead', 250000, true, 3),
  ('Lawyer', 190000, false, 3);
INSERT INTO managers (manager_name, title)
VALUES ('John Doe', 1),
  ('Ashley Rodriguez', 3),
  ('Kunal Singh', 5),
  ('Sara Lourd', 7);
INSERT INTO employees (
    first_name,
    last_name,
    title,
    manager_name
  )
VALUES ('John', 'Doe', 1, NULL),
  ('Mike', 'Chan', 2, 1),
  ('Ashley', 'Rodriguez', 3, NULL),
  ('Kevin', 'Tupik', 4, 2),
  ('Kunal', 'Singh', 5, NULL),
  ('Malia', 'Brown', 6, 3),
  ('Sara', 'Lourd', 7, NULL),
  ('Tom', 'Allen', 8, 4);