var chat = require('./chat');

module.exports = function(app){
	var io = require('socket.io').listen(app);

	io.configure(function(){
		io.set('log level',3);
		io.set('transports',[
			'websocket'
			,'flashsocket'
			,'htmlfile'
			,'xhr-polling'
			,'jsonp-polling'

			]);
	});

	var Room = io
	 .of('/room')
	 .on('connection',function(socket){
	 	var joinedRoom = null;
	 	socket.on('join',function(data){
	 		if(chat.hasRoom(data.roomname)){
	 			joinedRoom = data.roomname;
	 			socket.join(joinedRoom);
	 			socket.emit('joined',{
	 				isSuccess:true , nickname:data.nickname
	 			});
	 			socket.broadcast.to(joinedRoom).emit('joined',{
	 				isSuccess:true, nickname:data.nickname
	 			});
	 		}else{
	 			socket.emit('joined',{isSuccess:false});
	 		}
	 	});
	 	socket.on('message',function(data){
	 		if(joinedRoom){
	 			socket.broadcast.to(joinedRoom).json.send(data);
	 		}
	 	});
	 });
}