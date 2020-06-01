const { register, login, sendOtp, createAdmin } = require('../controller/registerUser')

exports.routes = (express, app) => {
    const router = express.Router()

    router.post('/register', register)

    router.post('/login', login)


    router.post('/otp', sendOtp)

    router.post('/newAdmin', createAdmin)

    app.use('/api/user/', router);

}


