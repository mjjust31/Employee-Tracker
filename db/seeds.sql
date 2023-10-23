INSERT INTO departments (department_name)
VALUES ('Engineering'),
  ('Finance'),
  ('Legal'),
  ('Sales');

INSERT INTO roles (title, salary, manager)
VALUES ('Sales Lead', 100000, true),
  ('Salesperson', 100000, false),
  ('Lead Engineer', 150000, true),
  ('Software Engineer', 120000, false),
  ('Account Manger', 160000, true),
  ('Accountant', 125000, false),
  ('Legal Team Lead', 250000, true),
  ('Laywer', 190000, false);

INSERT INTO employees (first_name, last_name)
VALUES ('John', 'Doe'),
  ('Mike', 'Chan'),
  ('Ashley', 'Rodriguez'),
  ('Kevin', 'Tupik'),
  ('Kunal', 'Singh'),
  ('Malia', 'Brown'),
  ('Sara', 'Lourd'),
  ('Tom', 'Allen');
