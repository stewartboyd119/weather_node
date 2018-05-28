const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const darksky = require('./darksky/darksky');

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

geocode.geocodeAddress(argv.address, (errorMessage, result) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else if (result) {

        console.log(result.address);

        darksky.formApiRequest(result.lat, result.lng, (errorMessage, response) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else if (response) {
                console.log(JSON.stringify(response, undefined, 2));
            }
        })
    }

});