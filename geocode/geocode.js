const request = require('request');
const querystring = require('querystring');
const api_key = require('../api_keys/lock_and_key').googleApiKey;


var url_base = 'https://maps.googleapis.com/maps/api/geocode/json';
var geocodeAddress = (address, callback) => {
    var url_query = querystring.stringify(
        {address,
        key: api_key}
    );
    var url = `${url_base}?${url_query}`;

    var request_object ={url: url, json: true} ;

    request(request_object,
        (error, response, body) => {
            var errorMessage = null;
            var result = null;
            if (error) {
                errorMessage  = ('Unable to connect to google servers');
            } else if (response.statusCode == 404){
                errorMessage = (`${response.statusCode} is no good`);
            } else if (body.status === 'ZERO_RESULTS') {
                errorMessage = ('Unable to find that address');
            } else if (body.status === 'OK') {

                var _result = body.results[0];
                 result = {
                     address: _result.formatted_address,
                     lat: _result.geometry.location.lat,
                     lng: _result.geometry.location.lng

                 }
            } else {
                errorMessage = ('Undefined error');
            }
            callback(errorMessage, result);
    });
}

module.exports = {
    geocodeAddress
}