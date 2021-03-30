const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const vr = require('v-response');
const Pizza = require('./data/models/pizza');
const pizza = require('./data/models/pizza');

//updated dbname
mongoose.connect('mongodb://127.0.0.1:27017/pizzadb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/listpizzas', async (req, res) =>{
    const pizzas = await Pizza.find();
    res.render('pizza/index', { pizzas });
})

//TODO modify this
//create
app.get('/createdummypizza', async (req, res) => {
    const pizzaOne = new Pizza({title: 'Dummy pizza'}); //changed pizza name
    Pizza.exists({title: 'Dummy pizza'}, function(err, result){
        if (err) {
            res.send(err);
            console.log(err);
        } else if (result === false) {
            console.log('Creating dummy pizza');
            pizzaOne.save(function(err){
                var output = "";
                if(err){
                    console.error("Mongoose Error: " + err);
                    output = err;
                    return;
                }
                else{
                    console.log("Pizza created successfully: " + pizzaOne.title);
                    output = pizzaOne;
                };
                //res.render('home');
            })
        } else if (result === true)
            console.log('Dummy pizza exists');
            return res.status(409)
            .json(vr.ApiResponse(true, 409, 'Pizza exists'))
    })
})

app.get('/', (req, res) => {
    res.render('home');
})

//delete all
app.get('/doomAll', async (req, res) => {
    console.error('Deleting all pizzas');
    await Pizza.deleteMany({});
    console.log('pizzas collection purged');
})

app.get('/seeddb', async(req, res) => {
    
})

app.listen(3000, ()=> {
    console.log('Serving on port 3000 \nFuck you Dominos MY')
})