const mongoose = require('mongoose');
const schema = mongoose.Schema

const stockCategories = new schema({
    category: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const StockCategories = mongoose.model('StockCategories', stockCategories)

exports.StockCategories = StockCategories