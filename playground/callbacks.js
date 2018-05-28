const request = require('request');
var get_user = (id, callback) => {

    var user = {
        name: 'vikram',
        id,
        dog: 'dog'
    }
    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=243%20heritage%20circle'
    request(url, (error, response, body) => {
        callback(user);
        console.log(response);
    });
}
get_user(31, (user) => {
    console.log(`This is the user object = ${user}`)
    console.log(user);
});
console.log('last line')