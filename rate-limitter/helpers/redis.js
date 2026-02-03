const Redis = require("ioredis")

const client = new Redis({
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
    password: process.env.REDIS_PASSWORD || undefined
})

client.on("connect", () => console.log("Connected to Redis"))
client.on("ready", () => console.log("Redis is ready"))
client.on("error", (err) => console.log("Redis error:", err))
client.on("close", () => console.log("Redis connection closed"))

module.exports = client;

