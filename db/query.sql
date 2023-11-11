 select managers.manager_name, managers.id, titles.title, departments.department_name, departments.id from managers
 JOIN titles on titles.id = managers.title
 JOIN departments on departments.id = titles.department_name;