(function(){
	var port = process.env.PORT || 3000;
	var app = require('express')();
	var bodyParser = require('body-parser');
	var shortId = require('shortid');
	
	//parse application/json
	app.use(bodyParser.json());
	
	//temp memory storage of users accounts
	var accounts = [ { login: 'Max', pwd: '123', email: 'max@test.com', playerId: 'eWRhpRV' } ];
	
	// -------- Routes --------
	app.get('/', function(req, res){
		res.send('Nothing here');
	})
	
	app.post('/login', function(req, res){
		var login = req.body.login;
		var pwd = req.body.pwd;
		var resContent = {};
		
		console.log('Login request for ' + login + ' - ' + pwd);
		
		var player = null;
		accounts.each(function(a){
			if (a.login == login && a.pwd == pwd)
				player = a;
		})
		
		if (player){
			resContent.result = 'OK';
			resContent.playerId = player.playerId;
			resContent.playerName = player.login;
		}
		else {
			resContent.result = 'NOK';
			resContent.reason = 'Incorrect credentials';
		}
		res.json(resContent);
	})
	
	app.get('/username', function(req, res){
		var result = {};
		result.name = [];
		
		accounts.each(function(a){
			result.name.push(a.login);
		});
		
		res.json(result);
	})
	
	app.post('/signup', function(req, res){
		var login = req.body.login;
		var pwd = req.body.pwd;
		var email = req.body.email;
		var playerId = shortId.generate();
		
		accounts.push({ login: login, pwd: pwd, email: email, playerId: playerId });
		
		res.sendStatus({ login: login, playerId: playerId });
	})
	
	app.listen(port, function(){
		console.log('express started');
	})
})()