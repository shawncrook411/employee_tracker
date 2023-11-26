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
    .then((response) => {
        let { options } = response
        switch (options) {
            case 'view dept':
                // View all departments formatted tables showing dept. names and dept. ids
                const sql = 'SELECT * FROM department'
                connection.query(sql, (err, result) => {
                    console.log(result)
                })
                break

            case 'view roles':
                // presented with job title, role id, the dept role belongs to, and salary
                console.log('success')
                break

            case 'view empl':
                // formatted table showing employee data, including empl ids, first names, last names, job titles, depts., salaries, and managers
                break

            case 'add dept':
                // Prompted to enter the name of the dept. and then create
                break

            case 'add role':
                // prmpted to enter the name, salary, and dept. for the role and then create
                break

            case 'add empl':
                //prmpted for first name, last name, role, and manager and then create
                break

            case 'update empl':
                //rpmpted to select employee to update and their new role and this info is then updated
                break

            case 'quit':
                process.exit(0)
        }
        return
    })
    .then(() => {
        prompt()
    })
    .catch((error) => {
        console.error(error)
    })
}

prompt()
