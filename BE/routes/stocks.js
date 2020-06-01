const { addCategory, addStock, getAllCategories, getStockByCategory, getStockByCategoryNotExpired } = require('../controller/stocks')

exports.routes = (express, app) => {
    const router = express.Router()

    router.post('/addCategory', addCategory)

    router.post('/addStock', addStock)

    router.get('/getAllCategories', getAllCategories)

    router.post('/getStockByCategory', getStockByCategory)

    router.post('/getStockByCategoryNotExpired', getStockByCategoryNotExpired)

    app.use('/api/stock/', router);

}


