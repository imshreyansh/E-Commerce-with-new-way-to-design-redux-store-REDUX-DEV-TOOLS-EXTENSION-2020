const { StockCategories } = require('../model/stockCategories')
const { AllStock } = require('../model/allStock')
const { upload: { uploadPhoto } } = require('../config')

exports.addCategory = async (req, res) => {
    if (req.body !== undefined) {
        const newCategory = new StockCategories({ category: req.body.category })
        await newCategory.save()
        res.status(200).send(newCategory)
    } else {
        res.status(400).send('Bad Request')
    }
}

exports.addStock = async (req, res) => {
    if (req.body !== undefined) {
        uploadPhoto(req, res, async (error) => {
            if (error)
                return res.status(400).send("Error while uploading image")
            if (req.files.length > 0) {
                const stock = new AllStock({ stockName: req.body.stockName, category: req.body.category, costPrice: req.body.costPrice, sellingPrice: req.body.sellingPrice, quantity: req.body.quantity, stockPhoto: req.files[0], expiryDate: req.body.expiryDate })
                await stock.save()
                res.status(200).send(stock)
            }
        })
    } else {
        res.status(400).send('Bad Request')
    }
}

exports.getAllCategories = async (req, res) => {
    const allCategories = await StockCategories.find({})
    res.status(200).send(allCategories)
}

exports.getStockByCategory = async (req, res) => {
    const stocks = await AllStock.find({ category: req.body.category })
    res.status(200).send(stocks)
}

exports.getStockByCategoryNotExpired = async (req, res) => {
    const stock = await AllStock.find({ category: req.body.category, expiryDate: { $gte: new Date() } })
    res.status(200).send(stock)
}

exports.getStockById = async (req, res) => { }