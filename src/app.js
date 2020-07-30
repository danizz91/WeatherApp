
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geoCode.js')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join((__dirname),'../public')
const viewsPath = path.join((__dirname),'../templates/views')
const partialsPath = path.join(__dirname , '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)


// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Daniel Abergel'
    })
})

app.get('/products',(req,res)=>{
    if(!req.query.serach){
        return res.send({
            error:'You must provide a serach term'
        })
    }
    console.log(req.query)
    res.send({
        products:[]
    })

})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about me',
        name:'Daniel abergel'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{msg:'msg screen',
    title:'Help',
        name:'Daniel Abergel'
    })
})

app.get('/weather',(req,res)=> {
    if (!req.query.address) {
        return res.send({
            error: 'U must provide a address'
        })
    }
    geocode(req.query.address, (error, {longitude, latitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {

            if (error) {
                return res.send({error})
            }
            res.send({location: location, forecast: forecastData,address:req.query.address
            })
        })
    })
})



app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Daniel Abergel',
        errorMessage:'Help article not found.'
    })

})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Daniel Abergel',
        errorMessage:'Page not found.'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})