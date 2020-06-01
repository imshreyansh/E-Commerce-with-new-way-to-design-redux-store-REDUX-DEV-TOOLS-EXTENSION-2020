const mongoose = require('mongoose');
const schema = mongoose.Schema


const allStock = new schema({
    stockName: {
        type: String
    },
    stockPhoto: Object,
    category: {
        type: schema.Types.ObjectId,
        ref: "StockCategories"
    },
    date: {
        type: Date,
        default: Date.now
    },
    quantity: {
        type: Number
    },
    sellingPrice: {
        type: Number
    },
    costPrice: {
        type: Number
    },
    expiryDate: {
        type: Date
    }
})

const AllStock = mongoose.model('AllStock', allStock)

exports.AllStock = AllStock
