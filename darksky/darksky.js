const request = require('request');
const querystring = require('querystring');
const api_key = require('../api_keys/lock_and_key').darkSkyApiKey;
const urlBase = 'https://api.darksky.net/forecast/';

var formApiRequest = (lat, lng, callback) => {
    var url = `${urlBase}${api_key}/${lat},${lng}`;
    var requestObject = {
        url,
        json: true
    }
    request(requestObject, (error, response, body) => {
        var errorMessage = null;
        var result = null;
        if (!error && response.statusCode === 200) {
            result = body.currently;
        } else {
            errorMessage = 'Could not contact weather server';    
        }
        callback(errorMessage, result);

    });
}

module.exports = {
    formApiRequest
}