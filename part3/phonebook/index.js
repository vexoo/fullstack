const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())

morgan.token("req-body", (request) => {
    return request.method === "POST" ? JSON.stringify(request.body) : " "
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/info', (request, response) => {
    const currentTime = new Date().toString()
    //response.send(`<p>Phonebook has info for ${persons.length} people</p>
    //<p>Current time is ${currentTime}</p>`)
    response.send(`Phonebook has info for ${persons.length} people<br><br>
    Current time is ${currentTime}`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }

})

const generateId = () => {
    const randomId = Math.floor(Math.random() * 1000000)
    //console.log(randomId)
    return randomId
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    //console.log(body)

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'missing name or number'
        })
    }

    const duplicate = persons.find(person => person.name === request.name)
    if (duplicate) {
        return response.status(409).json({
            error: 'name must be unique'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number,
    }

    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})