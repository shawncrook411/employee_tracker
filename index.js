const inquirer = require('inquirer')
const connection = require('./config/connection.js')

var prompt = function () {
    inquirer.prompt(
        [
            {
                type: 'rawlist',
                message: 'Please select from the available options',
                name: 'options',
                choices: [
                    { name: 'View All Departments', value: 'view dept' },
                    { name: 'View All Roles', value: 'view roles' },
                    { name: 'View All Employees', value: 'view empl' },
                    { name: 'Add a Deparment', value: 'add dept' },
                    { name: 'Add a Role', value: 'add role' },
                    { name: 'Add an Employee', value: 'add empl' },
                    { name: 'Update an Employee role', value: 'update empl' },
                    { name: 'Quit', value: 'quit' }
                ],
            }
        ]
    )
    .then(async (response) => {
        let { options } = response
        
        switch (options) {
            case 'view dept':
                // View all departments formatted tables showing dept. names and dept. ids
                sql = 'SELECT * FROM department'
                connection.query(sql, (err, result) => {
                    console.log(result)
                    prompt()
                });
                break

            case 'view roles':
                // presented with job title, role id, the dept role belongs to, and salary
                sql =  `SELECT role.id, role.title, role.salary, department.name AS department 
                        FROM role JOIN department ON role.department_id = department.id`
                connection.query(sql, (err, result) => {
                  console.log(result);
                  prompt();
                });
                break

            case 'view empl':
                // formatted table showing employee data, including empl ids, first names, last names, job titles, depts., salaries, and managers
                sql = 
                        `SELECT e.id AS ID, 
                        CONCAT(e.first_name, " ", e.last_name) AS Name,
                        CONCAT(m.first_name, " ", m.last_name) AS Manager,
                        role.title AS Title,
                        role.salary AS Salary,
                        department.name AS Department
                        FROM employee e
                        LEFT JOIN employee m
                        ON m.id = e.manager_id
                        JOIN role ON e.role_id = role.id
                        JOIN department ON role.department_id = department.id`
                connection.query(sql, (err, result) => {
                    console.log(result);
                    prompt();
                });
                break

            case 'add dept':
                // Prompted to enter the name of the dept. and then create
                inquirer.prompt([{
                    type: 'input',
                    message: "What's the name of the new Department?",
                    name: 'dept'
                }])
                    .then((res) => {
                        sql = `INSERT INTO department (name)
                           VALUES ('${res.dept}')`
                        connection.query(sql, (err, result) => {
                            console.log(result)
                            prompt()
                        })
                    })
                break

            case 'add role':
                // prmpted to enter the name, salary, and dept. for the role and then create
                inquirer.prompt([{
                    type: 'input',
                    message: "What's the title of the new role?",
                    name: 'title'
                }, {
                    type: 'input',
                    message: "What's the salary of the new role?",
                    name: 'salary'
                }, {
                    type: 'input',
                    message: "What's the department ID for the new role",
                    name: 'dept'
                }])
                .then((res) => {
                    sql = `INSERT INTO role (title, salary, department_id)
                           VALUES ('${res.title}', '${res.salary}', '${res.dept}')`
                    connection.query(sql, (err, result) => {
                        console.log(result)
                        prompt()
                    });
                })
                break

            case 'add empl':
                //prmpted for first name, last name, role, and manager and then create
                inquirer.prompt([{
                    type: 'input',
                    message: "What's the First Name of the new employee?",
                    name: 'first'
                }, {
                    type: 'input',
                    message: "What's the Last Name of the new employee?",
                    name: 'last'
                }, {
                    type: 'input',
                    message: "What's the role of the employee?",
                    name: 'role'
                }, {
                    type: 'input',
                    message: "What is the ID of their manager?",
                    name: 'manager'
                }])
                    .then((res) => {
                        sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
                           VALUES ('${res.first}', '${res.last}', '${res.role}', '${res.manager}')`
                        connection.query(sql, (err, result) => {
                            console.log(result);
                            prompt();
                        });
                    })
                break

            case 'update empl':
                //rpmpted to select employee to update and their new role and this info is then updated
                sql = `SELECT CONCAT(e.first_name, " ", e.last_name) AS Name FROM employee e`
                let array = []
                connection.query(sql, (err, result) => {
                    for (let i = 0; i < result.length; i++) {
                        array.push({ name: `${result[i].Name}`, value: i+1})
                    }                    

                    inquirer.prompt([{
                        type: 'rawlist',
                        message: 'Which employee would you like to update?',
                        name: 'employee',
                        choices: array
                    },{
                        type: 'input',
                        message: 'What is their new role ID?',
                        name: 'role'
                    }])
                        .then((res) => { 
                            sql = `UPDATE employee SET role_id = ${res.role} WHERE id=${res.employee}`
                            connection.query(sql, (err, result) => {
                                console.log(result)
                                prompt()
                            })
                       }                          
                    )                   
                }) 
                break

            case 'quit':
                process.exit(0)                
        }      
    })
    .catch((error) => {
        console.error(error)
    })
}
prompt()
