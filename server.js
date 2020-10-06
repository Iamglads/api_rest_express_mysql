// basic server 

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

const animalRoutes = require('./route/animalRoutes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))

// route 
app.get('/', (req, res, next) => {
    res.json({ message: "Api with Node Express & mysql"})
})

app.use('/api', animalRoutes)

const PORT = 4000

app.listen(PORT, () => {
    console.log("You server is running on port: " + PORT)
})