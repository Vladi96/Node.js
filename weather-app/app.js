let yargs = require('yargs');
let geoCode = require('./getGioCode.js');
let weather = require('./getWeather');


geoCode.geoCode('Sofia').then((response) => {
    weather.getWeather(response.latitude, response.longitude).then((res) => {
        let currentTemperature = farentToCel(res.body.currently.temperature);
        let itsFeels = farentToCel(res.body.currently.apparentTemperature)

        console.log(`\n----\nThe current temperature in ${response.city}, ${response.country} is ${currentTemperature} C. It feels like ${itsFeels} C.\n----\n`);
    }, (err) => {
        console.log('\n------\n' + err + '\n-----\n');
    })
}, (error) => {
    console.log('\n------\n' + error + '\n-----\n');
});

function farentToCel(temp) {
    return ((temp - 32) * 5 / 9).toFixed(2);
}
