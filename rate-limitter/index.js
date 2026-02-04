
// Advance implemtation using redis each request has its own timeline
require('dotenv').config()
const express = require("express")
const ip = require("ip")
const app = express();
const {hideIp} =  require("./helpers/hideip")
const redis = require("./helpers/redis")
const MAX_ALLOWED_REQUEST = 5;
const MAX_TIME = 30; // seconds for Redis TTL

app.use(async function (req,res,next){
    try {
const clientIp = req.ip ||ip.address();
const now = Date.now();
const windowStart = now-(MAX_TIME*1000)

// THE PIPELINE 
const pipeline = redis.multi();
pipeline.zremrangebyscore(clientIp,0,windowStart)
pipeline.zcard(clientIp)
pipeline.expire(clientIp,MAX_TIME);

const results = await pipeline.exec();
const requestCount =  results[1][1]

if(requestCount>=MAX_ALLOWED_REQUEST){
    console.log(`BLOCKED ${clientIp} is doing too much.Go touch grass`)
    return res.status(429).json({
        error:"Rate limit exceededd",
        msg:"Either you are trying to mess around or a no lifer"
    })
}
await redis.zadd(clientIp,now,now);
console.log(`${clientIp} passed. Count:${requestCount +1}/5`)
next();

    }
    catch(err) {
console.log("either redis has dies mid way or even idk what is woring ")
    }
})
app.get("/",function(req,res){
    console.log("Received a request!")
    res.status(200).send("Ok")
})

app.listen(3000,()=>console.log("Server is running on port 3000"))


