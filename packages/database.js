const mysql     = require('mysql')
const env       = require('../env.js')

let con = mysql.createConnection(env.connection)

module.exports = { con }