const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, id, email, gitHub, title = 'Engineer') {
        super(name, id, email, title);
        this.github = gitHub
    }
    getGithub() {
        return this.github
    }
}

module.exports = Engineer;