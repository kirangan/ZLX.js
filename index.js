"use strict";
const { route, view, run,api } = require('./config/server')



// route
route("/index",function(req,res){
   res.end("helllo") 
})


api("/index",function(req,res){
    res.end("ini api")
})





// listen
run(5000, function () {
    console.log('run 3000')
})
