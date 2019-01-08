let request = require('request');

let getCountry = () => {
    return new Promise((resolve, reject) => {
        request({
            url: 'http://country.io/names.json',
            json: true
        }, (err, res, body) => {
            if (body) {
                resolve({
                    body
                });
            } else if (!body) {
                reject({
                    err
                });
            }
        });
    });
}

module.exports = {
    getCountry
}