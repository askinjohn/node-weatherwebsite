const request=require("request")



const forecast=(latitude,longitude,callback)=>{

const url="https://api.darksky.net/forecast/b9b3074309f17cc9ef25f3c08e211735/"+latitude+","+longitude+"?units=si"


request({url,json:true},(error,data)=>{
if(data.body.error){
    callback(error)
}
else{
    callback(undefined,"The weather Report: Summary: "+ data.body.currently.summary +
    " Rain Probability: "+data.body.currently.precipProbability + " Temperature: "+data.body.currently.temperature )
}

})





}































module.exports=forecast