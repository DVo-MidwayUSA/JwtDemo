const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
app.use(bodyParser.json())
app.use('/', express.static(path.join(__dirname, 'public')))

const PORT = 8888;

app.get('/time', (request, response) => {
    const time = (new Date()).toLocaleTimeString();
    response.status(200)
        .send(`The time is ${time}`)
})

app.get('*', (request, response) => {
    response.sendStatus(404);
})

app.listen(PORT, () => {
    console.log(`Express server is running on port ${PORT}`)
})

app.post('/login', (request, response) => {
    console.log(`POST: '/login'`)
    console.log(request)
    console.log(request.body)
    response.status(200).send('OK')
    // const user = request.body.username
    // response.status(200).send(`User's name is ${user}`)
})