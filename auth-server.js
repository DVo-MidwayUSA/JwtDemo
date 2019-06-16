const express = require('express')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
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

app.post('/login', (request, response) => {
    console.log(`POST: '/login'`)
    const user = getUser(request.body)
    if (!user) {
        return response.status(401).send('Not allowed')
    }
    response.status(200).send(`User's name is ${user.username}`)
})

const getUser = (login) => {
    return users.find((user) => {
        return user.username == login.username && user.password == login.password
    })
}