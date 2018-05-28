const request = require('request');

var key = 'AIzaSyAY6ErpHabi_J_S5mdpVdKAElxOptI086A';
var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=243%20heritage%20circle' + `&key=${key}`;
var request_object ={url: url, json: true} ;
request(request_object,
    (error, response, body) => {
        if (error) {
            console.log('error occured');
            return;
        }
        var result = body.results[0];
        console.log(`Address = ${result.formatted_address}`)
        console.log(`Latitue = ${result.geometry.location.lat}`);
        console.log(`Latitue = ${result.geometry.location.lng}`);
});