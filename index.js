const inquirer = require('inquirer');
const fs       = require('fs');
const util     = require('util');

const Manager  = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern   = require('./lib/Intern');

const readFileAsync  = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);
let   file  = 1;

let questions = [
  {
    type: 'input',
    name: 'name',
    message: "What's The full name?"
  },
  {
    type: 'input',
    name: 'id',
    message: "What's The ID number?"
  },
  {
    type: 'input',
    name: 'email',
    message: "What's The Email address?"
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
    when: ans => ans.title === 'Manager'
  },
  {
    type: 'input',
    name: 'github',
    message: "What's The Github Username?",
    when: ans => ans.title === 'Engineer'
  },
  {
    type: 'input',
    name: 'school',
    message: "What's The name of the School?",
    when: ans => ans.title === 'Intern'
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
  }
];

async function init() {
    try{
         let baseTeamFile = await readFileAsync(`./output/team.html`, 'utf8');
         let newTeamFile  = await writeFileAsync(`team${file}.html`, baseTeamFile, 'utf8');
        
        const answers = await inquirer.prompt(questions);
         switch(answers.title) {
            case 'Manager': html('Manager', answers);
            break;
            case 'Engineer': html('Engineer', answers);
            break;
            case 'Intern': html('Intern', answers);
            break;    
         }
         if(answers.askAgain)  {
           console.log('\n')
           return init()
          }
          if(answers.newTeam) {
           console.log('\n');
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