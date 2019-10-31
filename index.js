 const SlackBot = require('slackbots');
 const axios = require('axios');
 const http = require('http');
 const fetch = require('node-fetch');


 const bot = new SlackBot({
 	token: 'xoxb-810148513056-797367134898-rCIOc7sPl1uOcjdGi92AlEz4',
 	name: 'dontTagHere'
 });



//Start Handler
bot.on('start', function() {
	const params = {
		icon_emoji: ':dontTagHere1'
	}; 

	const hostname = '127.0.0.1';
	const port = 3000;

	// const server = http.createServer((req, res) => {
	//  	if (req.method === 'POST') {
 //        	console.log('got the request');
 //        	let body = '';
 //        	req.on('data', chunk => {
	// 	        body += chunk.toString(); // convert Buffer to string
	// 	    });
	// 	    req.on('end', () => {
	// 	        body = JSON.parse(body);
	// 	        res.statusCode = 200;
	// 	        res.setHeader('Content-Type', 'text/plain');
	// 			res.end(body.challenge);
	// 	    });
 //    	}
	// });

	const server = http.createServer((req, res) => {
	 	if (req.method === 'POST') {
        	res.statusCode = 200;
		    res.end();
        	let body = '';
        	req.on('data', chunk => {
		        body += chunk.toString(); // convert Buffer to string
		    });
		    req.on('end', async () => {
		        console.log(body);
		        body = JSON.parse(body);
		        if(body.event.text.includes('<!here>')) {
		        	var url = new URL('https://slack.com/api/users.info');
		        	var params = {user:body.event.user, token: 'xoxb-810148513056-797367134898-rCIOc7sPl1uOcjdGi92AlEz4'};
		        	url.search = new URLSearchParams(params).toString();
		        	const response = await fetch(url);
		        	const myJson = await response.json();
		        	const name = myJson.user.name;
		        	bot.postMessageToUser(name, 'Hi there! Instead of tagging @here in the #flex-manager-support channel, please use @flex-mgr-support to get the attention of the Flex Manager team. Thanks!', {icon_emoji: ':dontTagHere1:'});
		        }
		    });
    	}
	});

	server.listen(port, hostname, () => {
		console.log(`Server running at http://${hostname}:${port}/`);
	});

});

// Error handler
bot.on('error', (err) => console.log(err));

