const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const app = express()

app.use(express.json())

app.use(cors({
    origin: 'http://localhost:8888',
    credentials: true,
}))
app.options('*', cors())

const PORT = 9999;

app.get('*', (request, response) => {
    response.sendStatus(404);
})

app.listen(PORT, () => {
    console.log(`Auth server is running on port ${PORT}`)
})

const users = [
    { id: 1, username: 'clarkKent', password: 'superman' },
    { id: 2, username: 'bruceWayne', password: 'batman' },
]

app.put('/login', (request, response) => {
    const user = getUser(request.body)
    if (!user) {
        return response.status(401).send('Not allowed')
    }

    const token = createToken(user)
    response.cookie('access_token', token, { httpOnly: true })
    response.status(200).send({ id: user.id, username: user.username })
})

app.delete('/login', (request, response) => {
    response.cookie('access_token', null, { maxAge: -1 })
    response.status(200).send({})
})

const getUser = (login) => {
    return users.find((user) => {
        return user.username == login.username && user.password == login.password
    })
}

const createToken = (user) => jwt.sign({
    id: user.id,
    username: user.username
}, 'mykey', { expiresIn: '3 hours' })