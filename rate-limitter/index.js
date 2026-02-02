const express = require("express")
const ip = require("ip")
const app = express();
const {hideIp} =  require("./helpers/hideip")
const MAX_ALLOWED_REQUEST=5;
const MAX_TIME = 10_000;

let ip_mapping = {}

setInterval(()=>{
    ip_mapping={};
    console.log("ip mapping is cleared")
},MAX_TIME)

app.use(function(req,res,next){
    const my_ip = hideIp(ip.address());
    ip_mapping[my_ip] = ip_mapping[my_ip]+1||1

    if(ip_mapping[my_ip]>MAX_ALLOWED_REQUEST){
        console.log(`recived request number ${ip_mapping[my_ip]} from ${my_ip}`)
        return res.status(429).send("TO MANY REQUEST PLEASE WAIT BEFORE TRYING AGAIN")
    }
    next();
})
app.get("/",function(req,res){
    console.log("recived a request!")
    const mp_ip = hideIp(ip.address());
    res.status(200).send("Ok")
})


app.listen(3000,()=>console.log("Server is running on port 3000"))