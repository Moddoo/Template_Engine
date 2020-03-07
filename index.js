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
    type: 'confirm',
    name: 'askAgain',
    message: 'Want to enter another TEAM MEMBER??',
    default: true
  }
];

async function init() {
    try{

        const x = await inquirer.prompt(questions);

          switch(x.title) {
              case 'Manager': 
             const a = await inquirer.prompt([
                {
                  type: 'input',
                  name: 'office',
                  message: "What's your office number?"
                }
            ])
             x.office = a.office;
             break;

             case 'Engineer':
             const b = await inquirer.prompt([
                    {
                      type: 'input',
                      name: 'github',
                      message: "What's your Github Username?"
                    }
                ])
                 x.github = b.github;
                 break;

             case 'Intern':
             const c = await inquirer.prompt([
                {
                  type: 'input',
                  name: 'school',
                  message: "What's your School?"
                }
            ])
             x.school = c.school;
             break;
          }

          output.push(x)
       
         if (x.askAgain)  {return   na()};
    }
    catch (err){
       console.log(err)
    }
    console.log('Your Team Info:', output);
}
init()