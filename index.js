"use strict";
const { route, view, run } = require('./packages/server')


// route
route("/home", function (req, res, session) {
    view(req, res, './views/index.html')
})

// listen
run(5000, function () {
    console.log('run 3000')
})
