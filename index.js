const inquirer = require('inquirer');
const fs       = require('fs');
const util     = require('util');

const Manager  = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern   = require('./lib/Intern');

const readFileAsync  = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


let questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's The full name?",
    validate: validateName
  },
  {
    type: 'input',
    name: 'id',
    message: "What's The ID number?", 
    validate: validateNum
  },
  {
    type: 'input',
    name: 'email',
    message: "What's The Email address?",
    validate: validateEmail
  },
  {
    type: 'list',
    name: 'title',
    message: "What's The role in the team?",
    choices: ['Manager', 'Engineer', 'Intern']
  },
  {
    type: 'input',
    name: 'office',
    message: "What's The Office number?",
    when: ans => ans.title === 'Manager',
    validate: validateNum
  },
  {
    type: 'input',
    name: 'github',
    message: "What's The Github Username?",
    when: ans => ans.title === 'Engineer',
    validate: validateTxt
  },
  {
    type: 'input',
    name: 'school',
    message: "What's The name of the School?",
    when: ans => ans.title === 'Intern',
    validate: validateName
  },
  {
    type: 'confirm',
    name: 'askAgain',
    message: 'Want to enter another TEAM MEMBER??',
    default: true,
  },
  {
    type: 'confirm',
    name: 'newTeam',
    message: 'Want to Add aNew Team??',
    default: true,
    when: ans => ans.askAgain === false
  },
];

function validateNum(input) {
  // /^\d+$/.test(input) ? true : console.log('\nINVALID: You should put anumber')
  if(!/^\d+$/.test(input)) console.log('\n Err: You should put anumber');
  else return true;
}
function validateTxt(input) {
  if(!/^[\w]+$/.test(input)) console.log('\n Err: No special characters');
  else return true;
}
function validateName(input) {
  if(!/^[A-z ]+$/.test(input)) console.log('\n Err: Letters Only');
  else return true;
}
function validateEmail(input) {
  if(!/^[^@]+@[\w]+\.[A-z]+$/.test(input)) console.log('\n Err: Invalid Email');
  else return true;
}

let file = 1;
let z = false;

async function init() {
    try{
      if(!z) {
        let baseTeamFile = await readFileAsync(`./output/team.html`, 'utf8');
        let newTeamFile  = await writeFileAsync(`team${file}.html`, baseTeamFile, 'utf8');
        z = true;
      }

      const answers = await inquirer.prompt(questions);
        
         switch(answers.title) {
            case 'Manager': await html('Manager', answers);
            break;
            case 'Engineer': await html('Engineer', answers);
            break;
            case 'Intern': await html('Intern', answers);
            break;    
         }
         if(answers.askAgain)  {
           console.log('\n');
           return init()
          }
          if(answers.newTeam) {
           console.log('\n');
           z = false;
           file++;
           return init();
        }    
    }
    catch (err){
      console.log(err)
    }
}
init()

async function html(member, ans) {
   try { 
       const template = await readFileAsync(`${__dirname}/output/template/${member}.html`, 'utf8');
       const x = eval(`\`${template}\``);
       const team   = (await readFileAsync(`./team${file}.html`, 'utf8')).split('<pre></pre>');
       const y = '<pre></pre>';
       const output   = await writeFileAsync(`./team${file}.html`, `${team[0]} ${x} \n  ${y} ${team[1]}`, 'utf8');
       return output
    } 
    catch(err) {
      console.log(err)
    }
}
// html('Manager')