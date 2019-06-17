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

app.get('/secrets', (request, response) => {
    const token = request.cookies.access_token
    if (!token) {
        response.sendStatus(401)
        return
    }

    const decoded = jwt.verify(token, 'mykey')
    console.log(decoded)
    
    response.status(200).send({})
})

app.get('*', (request, response) => {
    response.sendStatus(404)
})