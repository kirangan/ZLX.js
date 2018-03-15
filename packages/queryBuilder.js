const { con } = require('./database')

var DB = {
    table:function(arg){
        this.table = arg
    },
    select:function(arg){
        this.sql = "SELECT"
        this.select = arg
    },
    get:function(arg){
       // if()
        con.query()
    }
}

module.exports =  { 
    DB
}