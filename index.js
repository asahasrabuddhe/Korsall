var express = require('express');
var bodyparser = require('body-parser');
var session = require('express-session');
var db = require('./db/config.js');

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(session({secret: "secret",  resave : true,  saveUninitialized : false}));

/*
* API ROUTES
*/
app.post('/createMessage', db.sendMessageHandler); //Send messages
app.put('/updateMessage', db.updateStatusHandler);  //Update Message Status 
app.get('/getAllMessages/:id', db.getAllMessageHandler); //Get all messages id: User id
app.get('/getMessage/:id', db.getMessageHandler); // Get message detail  id: Message id
app.delete('/deleteMessage/:id', db.deleteMessageHandler); // Delete message id: Message id


var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('HTTP server is listening on port: ' + port);
});