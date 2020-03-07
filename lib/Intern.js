const Employee = require('./Employee')

class Intern extends Employee {
    constructor(name, id, email, school, title = 'Intern') {
        super(name, id, email, title)
        this.school = school
    }
    getSchool() {
        return this.school
    }
}

module.exports = Intern;