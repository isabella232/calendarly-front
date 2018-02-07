var express = require('express')
var app = express()
var path = require('path')

var port = process.env.PORT || 3200

app.use(express.static(path.join(__dirname, "dist")))

app.get('/', (req, res) => {
    console.log(__dirname)
    res.sendFile(__dirname + '/dist/index.html')
})

app.get('**', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html')
})

app.listen(port, () => {
    console.log('Listening on port: ' + port)
})