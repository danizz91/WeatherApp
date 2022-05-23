const request = require('request')

const forecast = (long,lat,callback)=>{
    const url = `https://api.darksky.net/forecast/b1dab12b1c342c66174034f39e820efb/${lat},${long}?units=si`


    request({url,json:true},(error, response)=>{
        if(error){
            callback('Unable to connect to weather service!',undefined)
        }
        else if(response.error){
            callback('Unable to find location',undefined)
        }
        else{
            callback(undefined,
                ('It is currently '+response.body.currently.apparentTemperature+' degrees out. and the summary is:'+ response.body.currently.summary)
            )
        }
    })
}

module.exports = forecast