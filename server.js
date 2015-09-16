/*
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});


    for (var ii=1; ii<10; ii++){
        response.write("string" + ii + "\n");
    }


//response.write("Hello World -2");
response.end();
}).listen(8888);*/

/*
var express        =         require("express");
var bodyParser     =         require("body-parser");
var MongoClient    =         require('mongodb').MongoClient;
var app            =         express();
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/index.html',function(req,res){
    res.sendFile("/yoav/node/index.html");
});
app.post('/login',function(req,res){
    var user_name=req.body.user;
    var password=req.body.password;
    console.log("User name = "+user_name+", password is "+password);
    res.end("done");
});

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/test", function(err, db) {
    if(!err) {
        console.log("We are connected");
    }
});
app.listen(3000,function(){
    console.log("Started on PORT 3000");
})*/

/*
var http = require('http'),
    fs = require('fs'),
    url = require('url');
var express        =         require("express");
var app            =         express();
//app.createServer();
app.get("/string", function(req, res) {
    var strings = ["rad", "bla", "ska"]
    var n = Math.floor(Math.random() * strings.length)
    res.send(strings[n])
})
app.listen(3000,function(){
    console.log("Started on PORT 3000");
});

*/

var http = require('http'),
    fs = require('fs'),
    url = require('url')


var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url1 = 'mongodb://localhost:27017/test1';

var findPromotion = function(db, callback) {
    var cursor =db.collection('promotions').find({"email": "david@bla.com"});

    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.log(doc);
        } else {
            console.log("here");
        }
    });
    //console.log(document1);
};

MongoClient.connect(url1, function(err, db) {
    assert.equal(null, err);
    findPromotion(db, function() {
        db.close();
    });
});

http.createServer(function(request, response){
    var path = url.parse(request.url).pathname;
    if (path=="/path1"){
        console.log("request recieved");
        response.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "http://localhost:63342"});
        response.end(document);
    }
    if (path=="/path2"){
        console.log("request recieved");
        response.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "http://localhost:63342"});
        response.end("response 2");
    }
    if(path=="/getstring"){
        console.log("request recieved");
        var string = choices[Math.floor(Math.random()*choices.length)];
        console.log("string '" + string + "' chosen");
        response.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "http://localhost:63342"});
        response.end(string);
        console.log("string sent");
    }else{
        fs.readFile('./index.html', function(err, file) {
            if(err) {
               console.log("error");
                return;
            }
            response.writeHead(200, { 'Content-Type': 'text/html', "Access-Control-Allow-Origin": "http://localhost:63342"});
            response.end(file, "utf-8");
        });
    }
}).listen(8001);
console.log("server initialized");
