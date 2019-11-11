const SlackBot = require('slackbots');
const http = require('http');
const fetch = require('node-fetch');
var URL = require('url').;
var {URLSearchParams} = require('url');

const bot = new SlackBot({
	token: 'xoxb-810148513056-817800946311-Jd2X4TGypOQOLrc8WVCCEzMh',
	name: 'dontTagHere'
});


exports.bot = async (event, context, callback) => {
	if(event.event && event.event.text.includes('<!here>')) {
		var url = new URL('https://slack.com/api/users.info');
		var params = {user:event.event.user, token: 'xoxb-810148513056-817800946311-Jd2X4TGypOQOLrc8WVCCEzMh'};
		url.search = new URLSearchParams(params).toString();
		const response = await fetch(url);
		const myJson = await response.json();
		const name = myJson.user.name;
		return bot.postMessageToUser(name, 'Hi there! Instead of tagging @here in the #flex-manager-support channel, please use @flex-mgr-support to get the attention of the Flex Manager team. Thanks!');
	} else if(event.type === "url_verification") {
		return event.challenge;
	}
};


