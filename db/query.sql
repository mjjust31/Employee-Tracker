SELECT employees.first_name AS First_Name,
  employees.last_name AS Last_Name,
  titles.title AS Title,
  departments.department_name AS Department,
  managers.full_Name AS Manager_Name
FROM employees
  JOIN titles ON employees.title = titles.id
  JOIN departments ON employees.department = departments.id
 LEFT JOIN managers ON employees.managerName = managers.id;
