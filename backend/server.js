require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./config/db.js')
const cors = require('cors')
// const logger = require('logger')

connectDB()
const port = process.env.PORT
app.use(cors())
app.use(express.json()); //this needs to be used instead of bodyparser

app.use('/api/todos', require('./routes/api/todos'))

// app.use(logger('dev'))
// app.use(favicon(path.join(__dirname, 'build','favicon.ico' )))
// app.use(express.static(path.join(__dirname, 'build')))
app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname, "build, 'index.html"))
})


app.listen(port, ()=>{
    console.log(`Listening on PORT: ${port}`)
})