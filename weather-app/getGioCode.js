let request = require('request');
let getCountry = require('./getCountry.js');

let country;

getCountry.getCountry().then((res) => {
    country = res.body
})

let geoCode = (address) => {
    return new Promise((resolve, reject) => {
        let encodeAddress = encodeURIComponent(address);

        request({
            url: `http://www.mapquestapi.com/geocoding/v1/address?key=vYBIb1xaeb9uGqaT93AzzQGjVGhBqhTq&location=${encodeAddress}`,
            json: true
        }, (error, response, body) => {
            if (!body) {
                reject('Wrong url address!');
            }
            else if (body) {
                let code, latitude, longitude, city;
                try {
                    code = body.results[0].locations[0].adminArea1;
                    latitude = body.results[0].locations[0].latLng.lat;
                    longitude = body.results[0].locations[0].latLng.lng;
                    city = body.results[0].locations[0].adminArea5;
                } catch (e) {

                }
                if (country[code] && latitude && longitude, city) {
                    resolve({
                        country: country[code],
                        latitude,
                        longitude,
                        city
                    });
                }
            }
            if (!body) {
                reject(`Canno't find address: ${address}!`);
            } else {
                reject(error)
            }
        }, (err) => {
            reject('Wrong address!')
        });
    });
};

module.exports = {
    geoCode
}