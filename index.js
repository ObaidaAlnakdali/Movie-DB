const express = require('express')
const app = express()

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]

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

////////////////////////////////////
/////////      CRUD     ////////////
////////////////////////////////////

app.get('/movies/add', function (req, res) {
    res.status(200).send(`Ok`)
})

app.get('/movies/get', function (req, res) {
    res.status(200).send(`{status:200, data: ${JSON.stringify(movies)} }`)
})

app.get('/movies/edit', function (req, res) {
    res.status(200).send(`Ok`)
})

app.get('/movies/delete', function (req, res) {
    res.status(200).send(`Ok`)
})


app.listen(3000)