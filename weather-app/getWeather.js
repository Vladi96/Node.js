let key = '61959ef1333665a09c1562f5fe269099';
let request = require('request');

let getWeather = (lat, lng) => {
    return new Promise((resolve, reject) => {
        request({
            url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
            json: true
        }, (error, response, body) => {
            if (!body) {
                reject({
                    error
                })
            } else if (body) {
                resolve({
                    body
                });
            }
        });
    });
}

module.exports = {
    getWeather
}