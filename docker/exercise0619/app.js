const express = require("express")
const redis = require("redis")

const app = express()

// const client = redis.createClient()
const redisOne = redis.createClient({
  host: "redis-one",
  port: 6379,
})
redisOne.set("visits", 0)

const redisTwo = redis.createClient({
  host: "redis-two",
  port: 6379,
})
redisTwo.set("visits", 0)

app.get("/", (req, res) => {
  res.send("<권지용> 홈페이지")
})

app.get("/one", (req, res) => {
  redisOne.get("visits", (err, visits) => {
    res.send("page one :  " + visits)
    redisOne.set("visits", parseInt(visits) + 1)
  })
})

app.get("/two", (req, res) => {
  redisTwo.get("visits", (err, visits) => {
    res.send("page two :  " + visits)
    redisTwo.set("visits", parseInt(visits) + 1)
  })
})

app.listen(8081, () => {
  console.log("Listening 8081 port")
})
