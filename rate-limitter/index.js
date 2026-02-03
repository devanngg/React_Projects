
// Advance implemtation using redis each request has its own timeline
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
const clientIp = req.ip||"127.0.0.1"
const now = Date.now();
const windowStart = now-(MAX_TIME*1000)
// Removing the time stamps that are older than 10seconds
await redis.zremrangebyscore(clientIp,0,windowStart);
const requestCount = await redis.zcard(clientIp);

if(requestCount>=MAX_ALLOWED_REQUEST){
    console.log(`!!![SLIDING BLOCK] ${clientIp} is too fast`)
    return res.status(429).json({message:"Too many request -Sliding window black"})
}
// adds the current request timestamp to the set
await redis.zadd(clientIp,now,now);
// expire if the users leaves
await redis.expire(clientIp,MAX_TIME);

console.log(`SLIDING REQUEST ${requestCount+1} for ${clientIp}`)
next();
}
catch(err) {
console.log("Reddis Sliding error",err.message)
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

 