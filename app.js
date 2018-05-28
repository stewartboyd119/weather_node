const request = require('request');
const querystring = require('querystring');
const yargs = require('yargs');

const address = 'address';
const argv = yargs.
    option(address, {
        alias: 'a',
        describe: 'Specify and address to query',
        string: true,
        demand: true
    })
    .help()
    .alias('help', 'h')
    .argv;



var url_base = 'https://maps.googleapis.com/maps/api/geocode/json';
var key = 'AIzaSyAY6ErpHabi_J_S5mdpVdKAElxOptI086A';
var url_query = querystring.stringify(
    {address: argv.address,
    key}
);
var url = url_base + '?' + url_query;
console.log(url);
var request_object ={url: url, json: true} ;
request(request_object,
    (error, response, body) => {
        if (error) {
            console.log('Unable to connect to google servers');
        } else if (response.statusCode == 404){
            console.log(`${response.statusCode} is no good`);
        } else if (body.status === 'ZERO_RESULTS') {
            console.log('Unable to find that address');
        } else if (body.status === 'OK') {

            var result = body.results[0];
            console.log(`Address = ${result.formatted_address}`)
            console.log(`Latitue = ${result.geometry.location.lat}`);
            console.log(`Latitue = ${result.geometry.location.lng}`);
        } else {
            console.log('Undefined error');
        }
});