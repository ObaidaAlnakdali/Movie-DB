const express = require('express')
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
var app = express()
app.use(cors())



const url = `mongodb+srv://obaida:123abo123@cluster0.otnn2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

try {
    mongoose.connect(url);
} catch (error) {
    console.log(error)
}


const client = new MongoClient(url)


const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب', year: 1992, rating: 6.2 }
]


// mongoose.connection.once('open', function () {
//     console.log("connection is success")
// })

// main().catch(console.error())


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

////////////////////////////////////
/////////      CRUD     ////////////
////////////////////////////////////

app.post('/movies/add', function (req, res) {
    if (req.query.title != "" && req.query.title != undefined && req.query.year != 0 && req.query.year != undefined && req.query.year.length == 4 && !isNaN(req.query.year)) {
        newMovie = { title: req.query.title, year: req.query.year, rating: req.query.rating == "" || req.query.rating == undefined ? 4 : req.query.rating }
        movies.push(newMovie)
        res.status(200).send(JSON.stringify(movies[movies.length - 1]))
    } else {
        res.status(404).send({ status: 403, error: true, message: 'you cannot create a movie without providing a title and a year' })
    }
})

app.get('/movies/get', function (req, res) {
    res.status(200).send(`{status:200, data: ${JSON.stringify(movies)} }`)
})

app.get('/movies/get/by-date', function (req, res) {
    movieList = movies;
    function compare(a, b) {
        if (a.year > b.year) {
            return -1;
        }
        if (a.year < b.year) {
            return 1;
        }
        return 0;
    }

    movieList.sort(compare);
    res.status(200).send(`{status:200, data: ${JSON.stringify(movieList)} }`)
})

app.get('/movies/get/by-rating', function (req, res) {
    movieList = movies;
    function compare(a, b) {
        if (a.rating > b.rating) {
            return -1;
        }
        if (a.rating < b.rating) {
            return 1;
        }
        return 0;
    }
    movieList.sort(compare);
    res.status(200).send(`{status:200, data: ${JSON.stringify(movieList)} }`)
})

app.get('/movies/get/by-title', function (req, res) {
    movieList = movies;
    function compare(a, b) {
        if (a.title < b.title) {
            return -1;
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    }
    movieList.sort(compare);
    res.status(200).send(`{status:200, data: ${JSON.stringify(movieList)} }`)
})

app.get('/movies/get/id/:id', function (req, res) {
    if (req.params.id < 0 || req.params.id > movies.length - 1) {
        res.status(404).send(`{status:404, error:true, message:'the movie ${req.params.id} does not exist'}`)
    } else {
        res.status(200).send(`${JSON.stringify(movies[req.params.id])}`)
    }
})

app.put('/movies/edit/:id', function (req, res) {
    if (req.params.id < 0 || req.params.id > movies.length - 1) {
        res.status(404).send(`{status:404, error:true, message:'the movie ${req.params.id} does not exist'}`)
    } else {
        movies[req.params.id].title = req.query.title != undefined || req.query.title != "" ? req.query.title : movies[req.params.id].title
        movies[req.params.id].year = req.query.year != 0 && req.query.year != undefined && req.query.year.length == 4 && !isNaN(req.query.year) ? req.query.year : movies[req.params.id].year
        movies[req.params.id].rating = req.query.rating != "" && req.query.rating != undefined ? req.query.rating : movies[req.params.id].rating
        res.status(200).send(`The movie has been modified as follows ${JSON.stringify(movies[req.params.id])}`)
    }
})

app.delete('/movies/delete/:id', function (req, res) {
    if (req.params.id < 0 || req.params.id > movies.length - 1) {
        res.status(404).send(`{status:404, error:true, message:'the movie ${req.params.id} does not exist'}`)
    } else {
        res.status(200).send(`This movie (${JSON.stringify(movies.splice(req.params.id, 1))}) is deleted`)
    }
})

app.listen(3000)