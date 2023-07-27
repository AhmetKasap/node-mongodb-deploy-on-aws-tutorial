const express = require('express')
const app = express()

app.get('/', (req,res) => {
    app.send("proje çalışıyor")
})

app.listen(3000)