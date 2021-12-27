const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.status(200).send(`Ok`)
})

app.get('/test', function (req, res) {
    res.status(200).send(`Ok`)
})

app.get('/time', function (req, res) {
    const date = new Date()
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : '' + date.getMinutes();
    const hours = date.getHours();
    const TIME = hours + ":" + minutes;
    res.status(200).send(`time now is ${TIME}`)
})

app.get('/hello/:id', function (req, res) {
    //console.log("req",req);
    //console.log("res",res);
    res.status(200).send(`Hello, ${req.params.id}`)
})

app.get('/search', function (req, res) {
    if(req.query.s=="" || req.query.s == undefined){
        res.status(500).send(`{status:500, error:true, message:"you have to provide a search"}`);
    }else{
        res.status(200).send(`{status:200, message:"ok", data: ${req.query.s}}`);
    }
})

app.listen(3000)