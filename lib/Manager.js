const Employee = require('./Employee');

class Manager extends Employee {
    constructor(name, id, email, officeNumber, title = 'Manager') {
          super(name, id, email, title)
          this.officeNumber = officeNumber;
    }
    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;
