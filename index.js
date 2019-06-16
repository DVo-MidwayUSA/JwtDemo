const express = require('express')
const path = require('path')

const app = express()
app.use('/', express.static(path.join(__dirname, 'public')))

const PORT = 8888;

app.get('*', (request, response) => {
    response.sendStatus(404);
})

app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`)
})
