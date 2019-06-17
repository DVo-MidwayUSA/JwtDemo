const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: 'http://localhost:8888',
    credentials: true,
}))
app.options('*', cors())

const PORT = 7777

app.listen(PORT, () => {
    console.log(`App server is running on port ${PORT}`)
})

const secrets = [
    { userid: 1, secret: 'I am Superman'},
    { userid: 1, secret: 'secret 2'},
    { userid: 1, secret: 'sec'},
    { userid: 2, secret: 'I am Batman'},
    { userid: 2, secret: '2'},
    { userid: 2, secret: '3'},
]

app.get('/secrets', (request, response) => {
    const token = request.cookies.access_token
    if (!token) {
        response.sendStatus(401)
        return
    }

    const user = jwt.verify(token, 'mykey')
    response.status(200).send(getSecretsByUser(user))
})

app.get('*', (request, response) => {
    response.sendStatus(404)
})

const getSecretsByUser = (user) => {
    return secrets.filter((secret) => secret.userid == user.id)
}