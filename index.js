const express = require('express')
const app = express()

const date = new Date()
const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes();
const hours = date.getHours()
const TIME = hours + ":" + minutes

app.get('/', function (req, res) {
    res.send('ok')
})

app.get('/test', function (req, res) {
    res.send({ status: 200, message: "ok" })
})

app.get('/time', function (req, res) {
    res.send({status:200, message:TIME})
})

app.listen(3000)