const Employee = require('./Employee');

class Engineer extends Employee {
    constructor(name, id, email, gitHub, title = 'Engineer') {
        super(name, id, email, title);
        this.gitHubUserName = gitHub
    }
    getGithub() {
        return this.gitHubUserName
    }
}

module.exports = Engineer;