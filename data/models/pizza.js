const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PizzaTypeEnum = require('../../common/enum.js')

const PizzaSchema = new Schema({
    title: String,
    type: {
        type: Number,
        default: PizzaTypeEnum.favourites
    },
    description: {
        type: String,
        default: "Mmm pizza"
    },
    pizzaImgUrl: {
        type: String,
        default: "https://www.indianhealthyrecipes.com/wp-content/uploads/2015/10/pizza-recipe-1-500x500.jpg"
    }
})

//schemaname, in-project schemaname, collectioname
//added 'pizzas' collection 
module.exports = mongoose.model('Pizza', PizzaSchema, 'pizzas');