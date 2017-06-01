const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const session = require('express-session')
const config = require('./.config')


// Add Middleware
app.use(express.static('./public'))
app.use(bodyParser.json())
app.use(session({
    secret: config.secret
    , resave: false
    , saveUninitialized: false
}))


//End Points
app.post('/api/cart', function (req, res) {
    const newProduct = req.body
    if (!req.session.cart) {
        req.session.cart = []
    }

    req.session.cart.push(newProduct)

    return res.status(200).send('ok')
})

app.get('/api/cart', function (req, res) {
    return res.status(200).send(req.session.cart)
})



app.listen(3000, function () {
    console.log('listening on port 3000')
})