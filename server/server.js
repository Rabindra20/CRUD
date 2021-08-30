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
web.get('/getuser', (req, res) => {
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
    var user = req.body.user;
    var Fname = req.body.Fname;
    var Mname = req.body.Mname;
    var Lname = req.body.Lname;
    var Email = req.body.Email;
    var Address = req.body.Address;
    var Contact = req.body.Contact;
    var pass = req.body.pass;
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
    var user = req.body.user;
    var Fname = req.body.Fname;
    var Mname = req.body.Mname;
    var Lname = req.body.Lname;
    var Email = req.body.Email;
    var Address = req.body.Address;
    var Contact = req.body.Contact;
    var pass = req.body.pass;
    var newvalues = { $set: { user, Fname, Mname, Lname, Email, Address, Contact, pass } };

    var query = { _id: userID };

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var con = db.db("user");
        con.collection('userdetail')
            .findOneAndUpdate(query, newvalues, function (err, result) {
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
            .deleteOne(query, function (err, obj) {
                if (err) throw err;
                console.log("1 document deleted");
                db.close();
            });
    });
});
web.listen(3000, () => {
    console.log('Server Ready');
});
