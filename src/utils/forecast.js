//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const request = require("request")

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=01c583eca48f1f5d75a6245015b2c14b&query=${lat},${long}`
    request({ url: url, json: true }, (err, { body }) => {
        if (err) {
            callback('Unable To Connect To Weather Service', undefined)
        }
        else if (body.error) {
            callback('Unable to Find Location', undefined)
        }
        else {
            callback(undefined, {
                weather_desc: body.current.weather_descriptions[0],
                currently: body.current.temperature,
                feelsLike: body.current.feelslike
            })
        }
    })
}

module.exports = forecast