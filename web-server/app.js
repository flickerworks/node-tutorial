const path = require('path');
const hbs = require('hbs');
const express = require('express');
const axios = require('axios').default;
const app = express();
const port = process.env.PORT || 3000;
const staticExpressPath = path.join(__dirname, '../public');
// const viewsPath = path.join(__dirname, '../src');
 const partialsPath = path.join(__dirname, '/partials');
hbs.registerPartials(partialsPath)

app.set('view engine', 'hbs')

//to change handler default dir (views) to src
// app.set('views', viewsPath) 


//setup static directory to serve pages
app.use(express.static(staticExpressPath)) 

app.get('', function(req, res){
    res.render('index', {
        title: 'NodeJs Tutorial',
        name: 'Arpit Chauhan'
    })
})

app.get('/about', function(req, res){
    res.render('about', {
        title: 'About',
        about: '"Handle bars" to render dynamic template!'
    })
})

app.get('/users', function(req, res){
    res.render('users', {
        title: 'Employees',
        about: 'List of all employees'
    })
})

app.get('/employees', function(req, res){
    if(!req.query.page){
        return res.send({
            error: 'No page index found!'
        })
    }
    axios.get(`https://reqres.in/api/users?page=${req.query.page}`)
    .then(function (response) {
        // handle success
        res.send(response.data.data)
    })
    .catch(function (error) {
        // handle error
        return res.send({
            error
        })
    })
    .then(function () {
        // always executed
    })    
})


app.listen(port, function(){
    console.log('server is up on port '+port)
})