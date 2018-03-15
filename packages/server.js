"use strict"

const http      = require('http')
const NodeSession  =  require("node-session")
const url       = require('url')
const routes    = require('routes')()
global.qs        = require('querystring')
const datetime  = require('node-datetime')
const views      = require('swig')
global.crypt     = require('crypto-js')
const fs        = require('fs')
global.secret    = 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'
global.session   = new NodeSession({secret:secret})





// asset
function view(req,res,arg,params){
    return res.end(views.renderFile(arg,params))
    
}

global.redirect = function(req,res,location){
    res.writeHead(302,{'Location' : `/${location}`});
    res.end()
}

function route(route,callback){
    let str_url     = route.split(".")
    let last_array  = str_url[str_url.length-1]

    routes.addRoute(route,function(req,res){
        req['params'] = this.params
        req['qs']     = qs
        callback(req,res,session)
    })

}


function run(listen,callback){

        routes.addRoute('/assets/*?',function(req,res){
            let url         = 'assets/' + this.splats.toString()
            let str_array   = url.split(".")
            let end_array   = str_array[str_array.length-1]

            fs.readFile(url,function(err,data){
                
                if(end_array == "png" || end_array == "jpeg" || end_array == "jpg"){
                    res.writeHead(200,{'Content-Type':`image/${end_array}`})
                    return res.end(data)
                }else if(end_array == "mpeg" || end_array == "ogg" || end_array == "mp4"){
                    res.writeHead(200,{'Content-Type':`video/${end_array}`})
                    return res.end(data)
                }else{
                     res.writeHead(200,{'Content-Type':`text/${end_array};charset=utf-8`})
                     return res.end(data)
                }
            })

        })

        http.createServer(function(req,res){
            let path = url.parse(req.url).pathname
            let match = routes.match(path)

            global.url = function(url){
                let host = 'http://'+req.headers.host + '/' + url
                return host
            }

            global.Auth = {
                user:function(arg){
                    return req.session.get('users',arg)
                }
            }
            
            global.Method = req.method.toString().toUpperCase()
            global.DateTime = datetime
            global.View     = view

            if(match){
                match.fn(req,res)
            }else{
                res.writeHead(404,{
                    'Content-Type': 'text/html'
                })
                res.end("No found")
            }
        }).listen(listen, function(){
            callback(listen)
        })
}

module.exports = { run, route, view }
