const request=require("request")

const geocode=(address,callback)=>{
const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYXNraW5qb2huIiwiYSI6ImNrNjdpODJieTAyeXUzZXFtZjluZHZ2OWIifQ.v8ONPrxrjcHxQKM-bvv4gQ&limit=1"

request({url,json:true},(error,data)=>{
    if (error){
        callback("Cannot connect to internet")
    }
    else if(data.body.features.length===0){
        callback("Address entered is incorrect or not available")
}
    else{
        callback(undefined,{
            location:data.body.features[0].place_name,
            latitude:data.body.features[0].center[1],
            longitude:data.body.features[0].center[0]
        })
    }
})

}
module.exports=geocode