const { UserSchema } = require('../model/users')
const bcrypt = require('bcrypt')
const { upload: { uploadPhoto }, twilios: { twilios } } = require('../config')

exports.register = async (req, res) => {
    if (req.body !== undefined) {
        const checkMail = await UserSchema.findOne({ email: req.body.email })
        if (checkMail) return res.status(400).send('User already exist')
        uploadPhoto(req, res, async (error) => {
            if (error)
                return res.status(400).send("Error while uploading image")
            if (req.files.length > 0) {
                const allData = new UserSchema({ name: req.body.name, email: req.body.email, mobile: req.body.mobile, password: req.body.password, gender: req.body.gender, avatar: req.files[0], role: 'Member' })
                const salt = await bcrypt.genSalt(10)
                allData.password = await bcrypt.hash(allData.password, salt)
                await allData.save()
                res.status(200).send('User Registration Success')
            }
        })
    }
    else {
        res.status(400).send('Bad Request')
    }
}

exports.login = async (req, res) => {
    if (req.body !== undefined) {
        const user = await UserSchema.findOne({ email: req.body.email })
        if (!user) return res.status(400).send('User does not exist')
        const password = await bcrypt.compare(req.body.password, user.password)
        if (password) {
            res.status(200).send(user.generateToken())
        } else {
            res.status(400).send('Incorrect password')
        }
    } else {
        res.status(400).send('Bad Request')

    }
}

exports.sendOtp = async (req, res) => {
    if (req.body !== undefined) {
        const otp = await Math.floor(1000 + Math.random() * 9000)
        twilios(req.body.mobile, otp)
            .then(message =>
                res.status(200).send(otp, '', message)
            )
            .catch(err =>
                res.status(400).send('Bad Request', '', err)
            )
    } else {
        res.status(400).send('Bad Request')

    }
}


exports.createAdmin = async (req, res) => {
    if (req.body !== undefined) {
        const checkMail = await UserSchema.findOne({ email: req.body.email })
        if (checkMail) return res.status(400).send('User already exist')
        uploadPhoto(req, res, async (error) => {
            if (error)
                return res.status(400).send("Error while uploading image")
            if (req.files.length > 0) {
                const allData = new UserSchema({ name: req.body.name, email: req.body.email, mobile: req.body.mobile, password: req.body.password, gender: req.body.gender, avatar: req.files[0], role: 'Admin' })
                const salt = await bcrypt.genSalt(10)
                allData.password = await bcrypt.hash(allData.password, salt)
                await allData.save()
                res.status(200).send('User Registration Success')
            }
        })
    }
    else {
        res.status(400).send('Bad Request')
    }
}