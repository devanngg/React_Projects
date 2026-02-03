// This is the basic version implemtation using redis all request resetf after the time 
require('dotenv').config()
const express = require("express")
const ip = require("ip")
const app = express();
const {hideIp} =  require("./helpers/hideip")
const redis = require("./helpers/redis")
const MAX_ALLOWED_REQUEST = 5;
const MAX_TIME = 30; // seconds for Redis TTL

app.use(async function(req, res, next) {
    try {
        const clientIp = req.ip || ip.address();
        const requestCount = await redis.incr(clientIp);

        if (requestCount === 1) {
            await redis.expire(clientIp, MAX_TIME);
        }

        if (requestCount > MAX_ALLOWED_REQUEST) {
            return res.status(429).json({ message: "Too many requests" });
        }
        next();
    } catch (err) {
        console.error("Redis Error:", err);
        // Fallback: If Redis is down, let the request through or send 500
        next(); 
    }
});

app.get("/",function(req,res){
    console.log("Received a request!")
    res.status(200).send("Ok")
})


app.listen(3000,()=>console.log("Server is running on port 3000"))


//We would be using redis for it 
/// It is stored in memory
// redis gives time to live 

// A BIT ON THE HIGHER DIFFICULT SIDE ?

// shjhdvih
// This 