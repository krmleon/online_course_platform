require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const Course = require('./models/course')

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

// get all courses
app.get('/api/courses', (request, response) => {
  Course.find({}).then(courses => {
    response.json(courses.map(course => course.toJSON()))
  })
})

// get course by id
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

// post course
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

// delete course
app.delete('/api/courses/:courseId', (request, response, next) => {
  Note.findByIdAndRemove(request.params.courseId)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// edit course (not tested!)
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

// get all parts of specific course
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

// get specific part of specific course
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

// post course part
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

// delete course part
app.delete('/api/courses/:courseId/parts/:partId', (request, response, next) => {
  Course.findById(request.params.courseId)
  .then(course => {
    const part = course.parts.id(request.params.partId);
    if (part) {      
      part.remove()
      course.save()
      .then(savedCourse => {
        console.log(savedCourse)
        response.status(204).end
      })
      .catch(error => next(error))
    }
    else {
      response.status(404).end() 
    }
  })
  .catch(error => next(error))
})

// error handling
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