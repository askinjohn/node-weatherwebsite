const path=require("path")
const geocode=require("./weather-modules/geocode.js")
const forecast=require("./weather-modules/forecast.js")
// importing express
const express=require("express")
const hbs=require('hbs')

// assigning express
const app=express()
const port=process.env.PORT || 3000

// define paths for express config
const pathDirectory=path.join(__dirname,"../public")
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath)

// define static directory to serve
app.use(express.static(pathDirectory))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"John"

    })
})

app.get('/about',(req,res)=>{
    res.render('about',
    {
        title:"About Me",
        name:"Askin John Samuel"})
})

app.get('/help',(req,res)=>{
    res.render('help',
    {
        helptext:"For frequently asked questions visit FAQ section",
        title:"Help Page",
        name:"Askin"
        
    })
})



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:"Enter a address"})
    }
    geocode(req.query.address,(error,{location,latitude,longitude}={})=>{
        if(error){
           return res.send({error:error})
        }
    forecast(latitude,longitude,(error,forecastdata)=>{
        if(error){
            return res.send({error:"Enter a Valid Location"})
        }
        res.send({
            location,
            forecast:forecastdata,
            address:req.query.address

        })
    })

    }

    
)})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:"Help page not found",
        title:"ERROR",
        name:"Askin"
    })

})

app.get('*',(req,res)=>{

    res.render('404',{
        errorMessage:"Page not found",
        title:"ERROR",
        name:"Askin"
    })

})





app.listen(port,()=>{
    console.log("server is running")
})