const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs')
const https = require('https')
// const axios = require('axios').default;


yargs.command({
    command: 'addUser',
    describe: 'add user',
    builder: {
        name: {
            describe: 'name',
            demandOption: true,
            type: 'string'
        },
        age: {
            describe: 'age',
            demandOption: true,
            type: 'number'
        },
        message: {
            describe: 'some message',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function(argv){
        console.log(chalk.red.inverse(argv.name))
        console.log(chalk.yellow.inverse(argv.age))
        console.log(chalk.green.inverse(argv.message))
        const user = {
            name: argv.name,
            age: argv.age,
            message: argv.message
        }
        
        fs.writeFileSync("users.json", JSON.stringify(user))
    }
})

// yargs.parse()

/* axios.get('https://reqres.in/api/users')
  .then(function (response) {
    // handle success
    console.log(response.data.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  }); */

 
  const request = https.request('https://reqres.in/api/users', function(response){
      let data = '';
      response.on('data', function(chunk){
          data = data + chunk.toString();
      })

      response.on('end', function(){
          console.log(JSON.parse(data).data)
      })
  })
  request.on('error', function(error){
      console.log(error)
  })
  request.end();