INSERT INTO departments (department_name)
VALUES ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Sales');
INSERT INTO titles (title, salary, isItManager, department)
VALUES ('Sales Lead', 100000, true, 4),
  ('Salesperson', 80000, false, 4),
  ('Lead Engineer', 150000, true, 1),
  ('Software Engineer', 120000, false, 1),
  ('Account Manger', 160000, true, 2),
  ('Accountant', 125000, false, 2),
  ('Legal Team Lead', 250000, true, 3),
  ('Laywer', 190000, false, 3);
INSERT INTO managers (full_Name, title, department)
VALUES ('John Doe', 1, 4),
  ('Ashley Rodriguez', 3, 1),
  ('Kunal Singh', 5, 2),
  ('Sara Lourd', 7, 4);
INSERT INTO employees (
    first_name,
    last_name,
    title,
    department,
    managerName
  )
VALUES ('John', 'Doe', 1, 4, NULL),
  ('Mike', 'Chan', 2, 4, 1),
  ('Ashley', 'Rodriguez', 3, 1, NULL),
  (
    'Kevin',
    'Tupik',
    4,
    1,
    2
  ),
  ('Kunal', 'Singh', 5, 1, NULL),
  ('Malia', 'Brown', 6, 2, 3),
  ('Sara', 'Lourd', 7, 3, NULL),
  ('Tom', 'Allen', 8, 3, 4);