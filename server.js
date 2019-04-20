/**
 * Sovelluksen palvelin ja REST API. 
 */

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const Course = require('./models/course')

/** Apumetodi http-pyyntöjen loggaukseen. */
const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(cors())
app.use(bodyParser.json())
app.use(logger)

/** 
 * REST API tietokannan kanssa kommunikointiin.
 */

/** Kaikkien kurssien haku */
app.get('/api/courses', (request, response) => {
  Course.find({}).then(courses => {
    response.json(courses.map(course => course.toJSON()))
  })
})

/** Kurssin haku id:n perusteella */
app.get('/api/courses/:courseId', (request, response, next) => {
  Course.findById(request.params.courseId)
  .then(course => {
    if (course) {
      response.json(course.toJSON())
    }
    else {
      response.status(404).end
    }    
  })
  .catch(error => next(error))
})

/** Uuden kurssin lisäys */
app.post('/api/courses', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }

  const course = new Course({
    name: body.name,
    description: body.description,
    parts: body.parts || []
  })

  course.save().then(savedCourse => {
    response.json(savedCourse.toJSON())
  })
})

/** Kurssin poisto */
app.delete('/api/courses/:courseId', (request, response, next) => {
  Course.findByIdAndRemove(request.params.courseId)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

/** Kurssin muokkaus */
app.put('/api/courses/:courseId', (request, response, next) => {
  const body = request.body

  const course = {
    name: body.name,
    description: body.description,
    parts: body.parts
  }

  Course.findByIdAndUpdate(request.params.courseId, course, { new: true })
    .then(updatedCourse => {
      response.json(updatedCourse.toJSON())
    })
    .catch(error => next(error))
})

/** Kurssin kaikkien osien haku */
app.get('/api/courses/:courseId/parts', (request, response, next) => {
  Course.findById(request.params.courseId)
  .then(course => {
    if (course) {
      response.json(course.parts)
    }
    else {
      response.status(404).end() 
    }
  })
  .catch(error => next(error))
})

/** Kurssin osan haku id:n perusteella */
app.get('/api/courses/:courseId/parts/:partId', (request, response, next) => {
  Course.findById(request.params.courseId)
  .then(course => {
    const part = course.parts.id(request.params.partId);
    if (part) {      
      response.json(part)
    }
    else {
      response.status(404).end() 
    }
  })
  .catch(error => next(error))
})

/** Uuden osan lisääminen kurssille */
app.post('/api/courses/:courseId/parts/', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'name missing' })
  }
  Course.findById(request.params.courseId)
  .then(course => {
    course.parts.push({
      name: body.name,
      content: body.content
    })
    course.save().then(savedCourse => {
      response.json(savedCourse.toJSON())
    })
  })
})

/** Kurssin osan poisto */
app.delete('/api/courses/:courseId/parts/:partId', (request, response, next) => {
  Course.findById(request.params.courseId)
  .then(course => {
    const part = course.parts.id(request.params.partId);
    if (part) {      
      part.remove()
      course.save()
      .then(savedCourse => {
          response.json(savedCourse.toJSON())
      })
      .catch(error => next(error))
    }
    else {
      response.status(404).end() 
    }
  })
  .catch(error => next(error))
})

/** Kurssin osan muokkaus */
app.put('/api/courses/:courseId/parts/:partId', (request, response, next) => {
  const body = request.body

  Course.findById(request.params.courseId)
  .then((course) => {
    const part = course.parts.id(request.params.partId)
    part.set(body)    
    course.save().then(savedCourse => {
      response.json(savedCourse.toJSON())
  })
})
  .catch(error => next(error))

})

/** Virheiden käsittely */
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})