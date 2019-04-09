const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

let courses = [
  {
    name: "Gerbiilikurssi",
    description: "Kurssi gerbiileistä kaikille gerbiilinmielisille.",
    id: 1,
    parts: [
    {
      id: 1,
      name: "Värit",
      content: "Gerbiileillä on monia värejä, esimerkiksi punainen, keltainen ja musta."
    },
    {
      id: 2,
      name: "Hoito",
      content: "Gerbiilit tarvitsevat ruokaa ja vettä."
    }
    ]
  },
  {
    name: "Valokuvauskurssi",
    description: "Kurssi valokuvauksesta.",
    id: 2
  },
  {
    name: "Vihanhallintakurssi",
    description: "Kurssi vihanhallinnasta.",
    id: 3
  },
  {
    name: "Kaktuskurssi",
    description: "Kurssi kaktuksista.",
    id: 4
  },
  {
    name: "Mustikkakurssi",
    description: "Kurssi mustikoista.",
    id: 5
  }
]

  const generateId = () => {
    const maxId = courses.length > 0
      ? Math.max(...courses.map(n => n.id))
      : 0
    return maxId + 1
  }

  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  // get all
  app.get('/api/courses', (req, res) => {
    res.json(courses)
  })

  // get one
  app.get('/api/courses/:id', (request, response) => {
    const id = Number(request.params.id)
    const course = courses.find(course => course.id === id)
    if (course) {
      response.json(course)
    } else {
      response.status(404).end()
    }
  })

  // post  
  app.post('/api/courses', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
  
    const course = {
      name: body.name,
      description: body.description || '',
      id: generateId(),
    }
  
    courses = courses.concat(course)
  
    response.json(course)
  })

  // delete
  app.delete('/api/courses/:id', (request, response) => {
    const id = Number(request.params.id);
    courses = courses.filter(course => course.id !== id);
  
    response.status(204).end();
  });
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })