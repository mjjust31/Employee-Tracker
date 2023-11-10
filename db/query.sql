

            db.query(
              `SELECT departments.department_name, managers.manager_name, managers.id
              FROM titles
              JOIN departments ON titles.department_name = departments.id
              JOIN managers ON titles.id = managers.title`,
              function (err, managers) {
                if (err) {
                  console.log(err);
                  return;
                }

                const findManager = managers.find(
                  (manager) =>
                    manager.department_name === findDepartment.department_name
                );

                const newEmployee = {
                  first_name: firstName,
                  last_name: lastName,
                  title: findDepartment.id,
                  manager_name: findManager.id,
                };

                console.log(newEmployee);

                db.query(
                  `INSERT INTO employees SET ?`,
                  newEmployee,
                  (err, result) => {
                    if (err) {
                      console.log("Error adding employee:", err);
                    } else {
                      console.log("Employee added!");
                    }
                  }
                );
              }
            );
          }
        );
      });