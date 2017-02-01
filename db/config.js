var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'messaging'
});

connection.connect();

/*
* Send Message
*/
exports.sendMessageHandler = function (req, res){
	var sender_id = req.body.sender_id;
	var receiver_id = req.body.receiver_id;
	var message_text = req.body.message_text;
	var message_image = req.body.message_image;

	connection.query('INSERT INTO `tbl_message`( `sender_id`, `receiver_id`, `message_text`, `message_image`) VALUES ("'+sender_id+'","'+receiver_id+'","'+message_text+'","'+message_image+'")', function (error, results, fields) {
		  	if (error){
		  		throw error;
		 	}
		  	else{
			  	console.log('Record inserted successfully');
			  	var data = 'Record inserted successfully';
				res.send({Message:data, message_code:101});
		  	}
	});
};

/*
* Update message
*/

exports.updateStatusHandler = function (req, res){

	var message_id = req.body.id;
	var status     = req.body.status; 	
	
	connection.query('UPDATE `tbl_message` SET `status`= "'+status+'" WHERE id = "'+message_id+'"', function (error, results, fields) {
			if (error){
			  	throw error;
			}else{
			  	var data = 'Message status change successfully';
				res.send({Message:data, message_code:102});
			}
	});
};

/*
* get all Messages
*/

exports.getAllMessageHandler = function (req, res){

	var user_id = req.params.id;
	
	connection.query('SELECT * FROM `tbl_message` WHERE receiver_id = "'+user_id+'"', function (error, results, fields) {
			if (error){
			  	throw error;
			}else{
			  	console.log('Message get successfully');
		  		res.json(results);
			}
	});
};

/*
* get single Message
*/

exports.getMessageHandler = function (req, res){

	var message_id = req.params.id;
	
	connection.query('SELECT * FROM `tbl_message` WHERE id = "'+message_id+'"', function (error, results, fields) {
			if (error){
			  	throw error;
			}else{
			  	console.log('Message get successfully');
		  		res.json(results);
			}
	});
};

/*
* Delete Message
*/

exports.deleteMessageHandler = function (req, res){

	var message_id = req.params.id;
	
	connection.query('UPDATE `tbl_message` SET `is_deleted`= 0 WHERE id = "'+message_id+'"', function (error, results, fields) {
			if (error){
			  	throw error;
			}else{
			  	console.log('Message deleted successfully');
			  	var data = 'Message deleted successfully';
			  	res.send({Message:data, message_code:105});
		  	}
	});
};
















