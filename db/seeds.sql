INSERT INTO departments (department_name)
VALUES ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Sales');

  
INSERT INTO roles (title, department_id, salary, manager)
VALUES ('Sales Lead', 4, 100000, true),
  ('Salesperson', 4, 100000, false),
  ('Lead Engineer', 1, 150000, true),
  ('Software Engineer', 1, 120000, false),
  ('Account Manger', 2, 160000, true),
  ('Accountant', 2, 125000, false),
  ('Legal Team Lead', 3, 250000, true),
  ('Laywer', 3, 190000, false);




-- INSERT INTO employees (first_name, last_name, role_id, department_id, salary, manager)
-- VALUES ('John', 'Doe', 1, 4),
--   ('Mike', 'Chan', 2, 4),
--   ('Ashley', 'Rodriguez', 3, 1),
--   ('Kevin', 'Tupik', 4, 1),
--   ('Kunal', 'Singh', 5, 2),
--   ('Malia', 'Brown', 6, 2),
--   ('Sara', 'Lourd', 7, 3),
--   ('Tom', 'Allen', 8, 3);