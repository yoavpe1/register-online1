/**
 * Created by yoavp on 9/8/2015.
 */
var express = require('express');
var bodyParser     =         require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//var ObjectId = require('mongodb').ObjectID;
var url1 = 'mongodb://localhost:27017/test1';

var record;
var dataBase;

var createRecord = function(db, user, req, res, cb) {
    db.collection('promotions').insert(
        {
            email: user,
            item: "ABC1",
            details: {
                model: "14Q3",
                manufacturer: "XYZ Company"
            },
            stock: [ { size: "S", qty: 25 }, { size: "M", qty: 50 } ],
            category: "clothing"
        }
    )

    var cursor =db.collection('promotions').find(/*{"email": user}*/);

    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.log(doc);
            record = doc;
        } else {
            cb(req, res);
            return;
        }
    });
};

var updateRecord = function(db, user, req, res, cb) {
    db.collection('promotions').update({
        "email": "david@bla.com"
    }, {
        $set: {
            "managerName": user
        }
    });



    var cursor =db.collection('promotions').find({"email": "david@bla.com"});

    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.log(doc);
            record = doc;
        } else {
            cb(req, res);
            return;
        }
    });
};


MongoClient.connect(url1, function(err, db) {
    assert.equal(null, err);
    dataBase = db;
});


app.post('/a2',function(req, res){
    var user_name=req.body.user;
    var password=req.body.password;
    console.log(user_name);
    createRecord(dataBase, user_name, req, res, function(req, res) {
        console.log("email = "+user_name+", password is "+password);
        res.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "http://localhost:63342"});
        record = JSON.stringify(record);
        res.end(record);

    });
    /*updateRecord(dataBase, user_name, req, res, function(req, res) {
        console.log("User name = "+user_name+", password is "+password);
        res.writeHead(200, {"Content-Type": "text/plain", "Access-Control-Allow-Origin": "http://localhost:63342"});
        record = JSON.stringify(record);
        res.end(record);

    });*/

});

var server = app.listen(3000, function () {
    console.log("Started listening");
});