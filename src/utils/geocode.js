const request = require('request');


const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2FoaWxyb3V0MjEwNCIsImEiOiJja3Y0dDhkYWIxb29nMnJscDJiaDd5YWxnIn0.lYG4c23dtz9bZrHK5mLlrw&limit=1`
    request({ url: url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable To Connect To Location Service', undefined)
        }
        else if (body.features.length === 0) {
            callback('Unable to Find Location.Try another Search', undefined)
        }
        else {
            callback(undefined, {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geocode