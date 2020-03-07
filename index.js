const inquirer = require('inquirer');
const fs       = require('fs');
const util     = require('util');
const axios    = require('axios');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

let output = [];

let questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's your full name?"
  },
  {
    type: 'input',
    name: 'id',
    message: "What's your ID number?"
  },
  {
    type: 'input',
    name: 'email',
    message: "What's your Email address?"
  },
  {
      type: 'list',
      name: 'title',
      message: "What's your role in the team?",
      choices: ['Manager', 'Engineer', 'Intern']
  },
  {
    type: 'input',
    name: 'office',
    message: "What's your Office number?",
    when: ans => ans.title === 'Manager'
  },
  {
    type: 'input',
    name: 'github',
    message: "What's your Github Username?",
    when: ans => ans.title === 'Engineer'
  },
  {
    type: 'input',
    name: 'school',
    message: "What's your School?",
    when: ans => ans.title === 'Intern'
  },
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Want to enter another TEAM MEMBER??',
    default: true
  }
];

async function init() {
    try{
         const x = await inquirer.prompt(questions);
         output.push(x)
         if (x.askAgain)  return init();
    }
    catch (err){
       console.log(err)
    }
    console.log('Your Team Info:', output);
}
init()