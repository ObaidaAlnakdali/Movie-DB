const express = require('express')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var cors = require('cors')
var app = express()
app.use(cors())
dotenv.config()

//Import Routes
const authRoute = require('./routes/auth');

//Route Middlewares
app.use('/api/user', authRoute)

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("connection is success")
}).catch(error => console.log(error));

const movieSchema = new mongoose.Schema({
    title: { type: String, default: "" },
    year: { type: Number, default: 1900 },
    rating: { type: Number, default: 4 },
}, { versionKey: false });

const movies = mongoose.model("movies", movieSchema);

//////////////////////////////////////
//////////  CRUD   Movie  ////////////
//////////////////////////////////////

app.post('/movies/add', function (req, res) {
    if (req.query.title != "" && req.query.title != undefined && req.query.year != 0 && req.query.year != undefined && req.query.year.length == 4 && !isNaN(req.query.year)) {
        newMovie = { title: req.query.title, year: req.query.year, rating: req.query.rating == "" || req.query.rating == undefined ? 4 : req.query.rating }
        movies.create(newMovie).then(movie => res.status(200).json(movie))
    } else {
        res.status(404).send({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' })
    }
})

app.get('/movies/get', function (req, res) {
    movies.find().then(movie => res.status(200).json(movie))
})

app.get('/movies/get/id/:id', function (req, res) {
    movies.findById(req.params.id).then(movie => res.status(200).json(movie))
        .catch(error => res.status(404).send(`{status:404, error:true, message:'the movie ${req.params.id} does not exist'}`))
})

app.get('/movies/get/by-date', function (req, res) {
    function compare(a, b) {
        if (a.year > b.year) {
            return -1;
        } else if (a.year < b.year) {
            return 1;
        }
        return 0;
    }
    movies.find().then(movie => res.status(200).json(movie.sort(compare)));
})

app.get('/movies/get/by-rating', function (req, res) {
    movieList = movies;
    function compare(a, b) {
        if (a.rating > b.rating) {
            return -1;
        } else if (a.rating < b.rating) {
            return 1;
        }
        return 0;
    }
    movies.find().then(movie => res.status(200).json(movie.sort(compare)));
})

app.get('/movies/get/by-title', function (req, res) {
    movieList = movies;
    function compare(a, b) {
        if (a.title < b.title) {
            return -1;
        } else if (a.title > b.title) {
            return 1;
        }
        return 0;
    }
    movies.find().then(movie => res.status(200).json(movie.sort(compare)));
})

app.put('/movies/edit/:id', function (req, res) {
    movies.findById(req.params.id).then(movie => {
        movie.title = req.query.title != undefined || req.query.title != "" ? req.query.title : movie.title
        movie.year = req.query.year != 0 && req.query.year != undefined && req.query.year.length == 4 && !isNaN(req.query.year) ? req.query.year : movie.year
        movie.rating = req.query.rating != "" && req.query.rating != undefined ? req.query.rating : movie.rating
        movie.save();
        res.status(200).json(movie)
    }).catch(error => res.status(404).send(error))
})

app.delete('/movies/delete/:id', function (req, res) {
    movies.findOneAndDelete({ _id: req.params.id })
        .then(movie => res.status(200).json(movie + "the movie is deleted"))
        .catch(error => res.status(404).send(`the id is not correct`))
})

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
    res.status(200).send(`Hello, ${req.params.id}`)
})

app.get('/search', function (req, res) {
    if (req.query.s == "" || req.query.s == undefined) {
        res.status(500).send(`{status:500, error:true, message:"you have to provide a search"}`);
    } else {
        res.status(200).send(`{status:200, message:"ok", data: ${req.query.s}}`);
    }
})

app.listen(3000)