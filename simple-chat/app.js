
/**
 * Module dependencies.
 */

var express = require('express')
  , chat = require('./chat');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret: 'secret key'}));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', function(req,res){
	res.render('index');
});

app.post('/enter',function(req,res){
	var isSuccess = false
	,nickname = req.body.nickname;

	if(nickname && nickname.trim() !== ''){
		if(!chat.hasUser(nickname)){
			chat.addUser(nickname);
			req.session.nickname = nickname;
			isSuccess = true;
		}
	}
	res.render('enter',{
		isSuccess: isSuccess
		,nickname: nickname
		,roomList: chat.getRoomList()
	});
});

app.get('/enter',function(req,res){

	var isSuccess = false
	,nickname = req.body.nickname;
	
	res.render('enter',{
		isSuccess: isSuccess
		,nickname: nickname
	});
});

app.post('/makeroom',function(req,res){
	var isSuccess = false
	,roomname = req.body.roomname;

	if(roomname && roomname.trim() !== ''){
		if(!chat.hasRoom(roomname)){
			chat.addRoom(roomname);
			isSuccess = true;
		}
	}

	res.render('makeroom',{
		isSuccess: isSuccess
		,roomname: roomname
	});
});

app.get('/enter',function(req,res){
	if(req.session.nickname){
		res.render('enter',{
			isSuccess: true
			,nickname: req.session.nickname
			,roomList: chat.getRoomList()
		});
	}else{
		res.render('enter',{
			isSuccess: false
			,nickname: ''
		});
	}
});

app.get('/join/:id', function(req,res){
	var isSuccess = false
	,roomname = req.params.id;

	if(chat.hasRoom(roomname)){
		isSuccess = true;
	}

	res.render('room',{
		isSuccess: isSuccess
		,roomname: roomname
		,nickname:req.session.nickname
		//,attendants:chat.getAttendantsList(roomname);
	});

});

app.listen(3000);
require('./rooms')(app);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
