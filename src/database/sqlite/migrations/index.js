const sqliteConnection = require("../../sqlite")

const createUsers = require("./createusers")

async function migrationRun(){
  const table = [
    createUsers
  ].join("")

  sqliteConnection()
  .then(db => db.exec(table))
  .catch(error => console.log(error))
}

module.exports = migrationRun;