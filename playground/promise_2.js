const request = require('request');
const querystring = require('querystring');
const api_key = require('../api_keys/lock_and_key').googleApiKey;


var url_base = 'https://maps.googleapis.com/maps/api/geocode/json';
var geocodeAddress = (address) => {
    var url_query = querystring.stringify(
        {
            address,
            key: api_key
        }
    );
    var url = `${url_base}?${url_query}`;

    var request_object = { url: url, json: true };

    return new Promise((resolve, reject) => {
        request(request_object,
            (error, response, body) => {
                var errorMessage = null;
                var result = null;

                if (body.status === 'OK') {

                    var _result = body.results[0];
                    result = {
                        address: _result.formatted_address,
                        lat: _result.geometry.location.lat,
                        lng: _result.geometry.location.lng
                    }
                    resolve(result);    
                } else {
                    reject('Undefined error');
                }
            })
    });
}

module.exports = {
    geocodeAddress
}