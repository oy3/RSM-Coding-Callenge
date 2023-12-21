const readline = require('readline');
const { Office, Company } = require('./RSM');

const company = new Company();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function displayMenu() {
    console.log('\nWelcome to the MSR Office Management System!');
    console.log('\nMenu:');
    console.log('1. New Office');
    console.log('2. Add Employee');
    console.log('3. Remove Employee');
    console.log('4. Transfer Employee');
    console.log('5. Display Employees in an Office');
    console.log('6. Display Offices');
    console.log('0. Exit');
}

function promptUser() {
    displayMenu()

    rl.question('\n\nYou:: Enter your choice: ', (choice) => {
        switch (choice) {
            case '1':
                rl.question('You:: Enter the name for the new office: ', (officeName) => {
                    const office = company.openOffice(officeName);
                    console.log(`\nSys:: Office "${office.officeName}" opened with Office Number ${office.officeNumber}`);
                    promptUser();
                });
                break;
            case '2':
                rl.question('You:: Enter the employee name: ', (employeeName) => {
                    rl.question('You:: Enter the office number: ', (officeNumber) => {
                        if (company.addEmployee(employeeName, parseInt(officeNumber, 10))) {
                            console.log(`\nSys:: Employee "${employeeName}" added to the office #${officeNumber}.`);
                        } else {
                            console.log(`\nSys:: Failed to add employee to "${officeNumber}". Please check your input.`);
                        }
                        promptUser();
                    });
                });
                break;
            case '3':
                rl.question('You:: Enter the employee name: ', (employeeName) => {
                    rl.question('You:: Enter the office number: ', (officeNumber) => {
                        if (company.removeEmployee(employeeName, parseInt(officeNumber, 10))) {
                            console.log(`\nSys:: Employee "${employeeName}" removed from the office.`);
                        } else {
                            console.log('\nSys:: Failed to remove employee. Please check your input.');
                        }
                        promptUser();
                    });
                });
                break;
            case '4':
                rl.question('You:: Enter the employee name: ', (employeeName) => {
                    rl.question('You:: Enter the old office number: ', (oldOfficeNumber) => {
                        rl.question('You:: Enter the new office number: ', (newOfficeNumber) => {
                            if (company.transferEmployee(employeeName, parseInt(oldOfficeNumber, 10), parseInt(newOfficeNumber, 10))) {
                                console.log(`\nSys:: Employee "${employeeName}" transferred from Office Number ${oldOfficeNumber} to Office Number ${newOfficeNumber}.`);
                            } else {
                                console.log('\nSys:: Failed to transfer employee. Please check your input.');
                            }
                            promptUser();
                        });
                    });
                });
                break;
            case '5':
                rl.question('You:: Enter the office number: ', (officeNumber) => {
                    const employees = company.getEmployees(parseInt(officeNumber, 10));
                    if (employees !== null) {
                        console.log(`\nSys:: Employees at Office Number #${officeNumber}: ${employees.join(', ')}`);
                    } else {
                        console.log(`\nSys:: Office with Office Number ${officeNumber} does not exist.`);
                    }
                    promptUser();
                });
                break;
            case '6':
                company.displayOfficeList();
                promptUser();
                break;
            case '0':
                console.log('\nExiting the application. Goodbye!');
                rl.close();
                break;
            default:
                console.log('Sys:: Invalid choice. Please enter a valid option.');
                promptUser();
        }
    });
}

promptUser();