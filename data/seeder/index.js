const mongoose = require('mongoose');
const Pizza = require('../models/pizza');
const sh = require('./seedHelpers');

sh.importLog();

//updated dbname
mongoose.connect('mongodb://127.0.0.1:27017/pizzadb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected for seeder");
});

const seedDb = async() => {
    await Pizza.deleteMany({});
    console.error('Deleting pizzas');
    for(let i = 0; i < 20; i++)
    {
        const random5 = Math.floor(Math.random() * 5);
        const pizza = new Pizza({
            title: `${sh.pizzaName[random5]}`,
        })
        await pizza.save();
    }
}

seedDb()