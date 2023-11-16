const inquirer = require('inquirer')

inquirer.prompt(
    [
        {   
            type: 'rawlist',
            message: 'Please select from the available options',
            name: 'options',
            choices: [
                {name: 'view all departments', value: 'view dept'},
                {name: 'view all roles', value: 'view roles'},
                {name: 'view all employees', value: 'view empl'},
                {name: 'add a deparment', value: 'add dept'},
                {name: 'add a role', value: 'add role'},
                {name: 'add an employee', value: 'add empl'},
                {name: 'update an employee role', value: 'update empl'},
            ],
        },
        {
            type: 'input', 
            message: '',
            name: '',
        },

    ]
)
.then((response) => {
   let { options } = response
   switch (options)
   {
    case 'view dpet':

    break

    case 'view roles':

    break

    case 'view empl':

    break

    case 'add dept':

    break

    case 'add role':

    break

    case 'add empl':

    break

    case 'update empl':

    break

    default:
        
   }

})