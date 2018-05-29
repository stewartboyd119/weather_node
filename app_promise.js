const yargs = require('yargs');
const axios = require('axios');
const querystring = require('querystring');
const lock_and_key = require('./api_keys/lock_and_key');
const darkSkipApiKey = lock_and_key.darkSkyApiKey;
const googleApiKey = lock_and_key.googleApiKey;
const darksky_url_base = 'https://api.darksky.net/forecast/';
const google_url_base = 'https://maps.googleapis.com/maps/api/geocode/json';

const address= "address";
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

var url_query = querystring.stringify(
    {address: argv.address,
    key: googleApiKey}
);
var google_url = `${google_url_base}?${url_query}`;
axios.get(google_url)
    .then((mapResponse) => {
        var _result = mapResponse.data.results[0];
        result = {
            address: _result.formatted_address,
            lat: _result.geometry.location.lat,
            lng: _result.geometry.location.lng
        }
        console.log(result.address);
        var url = `${darksky_url_base}${darkSkipApiKey}/${result.lat},${result.lng}`;
        return axios.get(url);
    })
    .then((weatherResponse) => {
        result = {
            temperature: weatherResponse.data.currently.temperature,
            apparentTemperature: weatherResponse.data.currently.apparentTemperature
        }
        console.log(result);
    })
    .catch((reason) => {
        console.log("Error: ", reason);
    });