var express = require('express');
var body = require('body-parser');
var cors = require('cors');
var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const web = express();
web.use(cors());
web.use(body.json());
web.use(body.urlencoded({ extended: false }));
web.post('/signin', (req, res) => {
    var user = req.body.user;
    var pass = req.body.pass;
    mongo.connect(url, (err, db) => {
        if (err) throw err;
        var con = db.db('user');
        con.collection('user')
            .findOne({ "user": user, "pass": pass },
                (err, result) => {
                    if (err) throw err;
                    if (result != null) {
                        res.json({ 'status': 'success' });
                    }
                    else {
                        res.json({ 'status': 'failed' });
                        console.log('Invalid Username/pass');
                    }
                });
    });
});
web.post('/register', (req, res) => {
    var user = req.body.user;
    var Fname = req.body.Fname;
    var Contact = req.body.Contact;
    var pass = req.body.pass;
    var obj = { user, Fname, Contact, pass };
    mongo.connect(url, (err, db) => {
        if (err) throw err;
        var con = db.db('user');
        con.collection('user')
            .insertOne(obj,
                (err, result) => {
                    if (err) throw err;
                    if (result != null) {
                        res.json({ 'status': 'success', 'msg': '1 Record Inserted' });
                    }
                    else {
                        res.json({ 'status': 'failed' });
                    }
                });
    });
});
web.get('/getuserdetail', (req, res) => {
    var userID = req.body.userID;
    mongo.connect(url, (err, db) => {
        if (err) throw err;
        var con = db.db('user');
        con.collection('userdetail')
            .find().toArray().then(result => {
                if (err) throw err;
                if (result != null) {
                    res.json({ 'data': result, 'status': 'success', 'msg': '1 Record Added' });
                }
                else {
                    res.json({ 'status': 'failed' });
                }
            });
    });
});
web.post('/adduserdetail', (req, res) => {
    var user = req.body.username;
    var Fname = req.body.first_name;
    var Mname = req.body.middle_name;
    var Lname = req.body.last_name;
    var Email = req.body.email;
    var Address = req.body.address;
    var Contact = req.body.contact;
    var pass = req.body.password;
    var obj = { user, Fname, Mname, Lname, Email, Address, Contact, pass };
    mongo.connect(url, (err, db) => {
        if (err) throw err;
        var con = db.db('user');
        con.collection('userdetail')
            .insertOne(obj,
                (err, result) => {
                    if (err) throw err;
                    if (result != null) {
                        res.json({ 'status': 'success', 'msg': '1 Record Added' });
                    }
                    else {
                        res.json({ 'status': 'failed' });
                    }
                });
    });
});

web.post('/updateuserdetail', (req, res) => {
    var userID = req.body.userID;
    var user = req.body.username;
    var Fname = req.body.first_name;
    var Mname = req.body.middle_name;
    var Lname = req.body.last_name;
    var Email = req.body.email;
    var Address = req.body.address;
    var Contact = req.body.contact;
    var pass = req.body.password;
    var newvalues = { $set: { user, Fname, Mname, Lname, Email, Address, Contact, pass } };

    var query = { _id: userID };

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var con = db.db("user");
        con.collection('userdetail')
            .findOneAndUpdate(query, newvalues, (err, result)=> {
                if (err) throw err;
                if (result != null) {
                    res.json({ 'status': 'success', 'msg': '1 Record Inserted' });
                }
                else {
                    res.json({ 'status': 'failed' });
                }
            });
    });
});

web.post('/deleteuserdetail', (req, res) => {
    var query = { _id: req.body.userID };

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var con = db.db("user");
        con.collection('userdetail')
            .deleteOne(query, (err, obj) =>{
                if (err) throw err;
                console.log("1 document deleted");
                db.close();
            });
    });
});
web.listen(3000, () => {
    console.log('Server Ready');
});
