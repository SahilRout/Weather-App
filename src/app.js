const express = require('express');
const { join } = require('path');
const path = require('path');
const app = express()
const port = process.env.PORT || 3000
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast')
//req is things we get response is the response
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.k = join(__dirname, '../templates')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handelbars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

//setup static directory to serve 
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sahil'
    })//allows us to render handelbar from vies
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sahil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        message: 'To Get any Help Contact ABC@html.com',
        name: 'sahil'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must Provide an Adress"
        })
    }
    geocode(req.query.address, (err, { lat, long, location } = {}) => {
        if (err) {
            return res.send({
                error: err,
                errr: "Geocode"
            })
        }
        forecast(lat, long, (err, forecastData) => {
            if (err) {
                return res.send({
                    error: err,
                    errr: 'Forecast',
                })
            }
            res.send({
                location: location,
                weather: forecastData.weather_desc,
                currently: forecastData.currently,
                feelsLike: forecastData.feelsLike
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        name: 'Sahil',
        error: 'Help Article not found'
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You Must Provide a search term'
        })
    }
    else {
        res.send({
            products: [],
        })
    }
})
app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        name: 'Sahil',
        error: '404 Page Not Found'
    })
})

app.listen(port, () => {
    console.log('Server is Up on Port ' + port)
})