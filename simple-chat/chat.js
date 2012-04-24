var chat = module.exports = {
	users: []
	, rooms: []

	//user 관련
	,hasUser: function(nickname){
		var users = this.users.filter(function(element){
			return(element === nickname);
		});

		if(users.length > 0){
			return true;
		}else{
			return false;
		}
	}
	, addUser: function(nickname){
		this.users.push(nickname);
	}

	//room 관련
	,hasRoom: function(roomname){
		var rooms= this.rooms.filter(function(element){
			return(element.name === roomname);
		});

		if(rooms.length > 0){
			return true;
		}else{
			return false;
		}
	}
	,addRoom: function(roomname){
		this.rooms.push({name:roomname,attendants:[]});
	}
	
	,getRoomList: function(){
		return this.rooms.map(function(element){
			return element.name;
		});
	}

}