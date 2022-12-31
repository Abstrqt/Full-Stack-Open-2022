const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const PORT = process.env.PORT || 3001
const RANGE = 5000

app.use(express.json())
app.use(cors())
app.use(express.static("build"))
morgan.token("data", request => {
    return request.method === "POST" || request.method === "PUT" ? JSON.stringify(request.body) : " "
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :data"))

let notes = [
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

const generateID = () => {
    let id = Math.floor(Math.random() * RANGE)
    while(notes.find(note => note.id === id)) id = Math.floor(Math.random() * RANGE)
    return id
}

app.get("/api/persons", (request, response) => {
    response.json(notes)
})

app.get("/api/persons/:id", (request, response) => {
    let id = Number(request.params.id)
    let note = notes.find(note => note.id === id)
    // console.log(note)
    if(note) response.json(note)
    else response.status(404).end()
})

app.delete("/api/persons/:id", (request, response) => {
    let id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
    // console.log(notes)
    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    let body = request.body
    if(!body.name) return response.status(400).json({error: "name missing"})
    if(!body.number) return response.status(400).json({error: "number missing"})
    if(notes.find(note => note.name === body.name)) return response.status(400).json({error: "name must be unique"})
    let note = {id: generateID(), ...body}
    // console.log(note)
    notes = notes.concat(note)
    response.json(note)
})

app.put("/api/persons/:id", (request, response) => {
    let body = request.body
    let id = Number(request.params.id)
    if(!body.number) return response.status(400).json({error: "number missing"})
    let note = notes.find(note => note.id === id)
    note = {...note, number: body.number}
    // console.log(note)
    notes = notes.filter(note => note.id !== id)
    notes = notes.concat(note)
    response.json(note)
})

app.get("/info", (request, response) => {
    response.send(`
    <div>
        <p>Phonebook has info for ${notes.length} people</p>
        <p>${new Date()}</p>
    </div>
    `)
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})