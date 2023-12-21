class Office {
  constructor(officeNumber, officeName) {
    this.officeNumber = officeNumber;
    this.officeName = officeName;
    this.employees = [];
  }

  addEmployee(employeeName) {
    if (!this.employees.includes(employeeName)) {
      this.employees.push(employeeName);
      return true;
    }
    return false;
  }

  removeEmployee(employeeName) {
    const index = this.employees.indexOf(employeeName);
    if (index !== -1) {
      this.employees.splice(index, 1);
      return true;
    }
    return false;
  }

  getEmployees() {
    return this.employees;
  }

  displayEmployees() {
    console.log(`Employees at ${this.officeName}: ${this.employees.join(', ')}`);
}
}

class Company {
  constructor() {
    this.offices = [];
  }

  openOffice(officeName) {
    const officeNumber = this.generateOfficeNumber();
    const office = new Office(officeNumber, officeName);
    this.offices.push(office);
    return office;
  }

  getOffice(officeNumber) {
    const office = this.offices.find((o) => o.officeNumber === officeNumber);
    return office || null;
  }

  addEmployee(employeeName, officeNumber) {
    const office = this.getOffice(officeNumber);
    if (office) {
      return office.addEmployee(employeeName);
    }
    return false;
  }

  removeEmployee(employeeName, officeNumber) {
    const office = this.getOffice(officeNumber);
    if (office) {
      return office.removeEmployee(employeeName);
    }
    return false;
  }

  transferEmployee(employeeName, oldOfficeNumber, newOfficeNumber) {
    const oldOffice = this.getOffice(oldOfficeNumber);
    const newOffice = this.getOffice(newOfficeNumber);

    if (oldOffice && newOffice) {
      if (oldOffice.removeEmployee(employeeName) && newOffice.addEmployee(employeeName)) {
        return true;
      }
    }

    return false;
  }

  getEmployees(officeNumber) {
    const office = this.getOffice(officeNumber);
    return office ? office.getEmployees() : null;
  }

  generateOfficeNumber() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  displayOfficeList() {
    console.log('Offices:');
    this.offices.forEach((office) => {
        console.log(`- ${office.officeName} (Office Number: ${office.officeNumber})`);
    });
}
}

module.exports = {Office, Company};
