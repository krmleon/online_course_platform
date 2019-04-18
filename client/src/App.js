import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import './App.css';
import {Login, Home, Header, CourseForm, CoursePage, EditCoursePart, AddCoursePart, EditCourse} from './views/index'
import courseService from './services/courses'
import partService from './services/parts'

const App = () => {  
  const user = "moi"
  const [courses, setCourses] = useState([])

  // Kurssien haku ja asetus komponentin tilaan
  useEffect(() => {
    courseService
      .getAll().then(initialCourses => {
        setCourses(initialCourses)
      })
}, [])

  // Kurssin lisääminen
  const addCourse = values => {
    const courseObject = {
      name: values.courseName,
      description: values.courseDescription
    }

    courseService
      .create(courseObject)
      .then((returnedCourse) => {
        setCourses(courses.concat(returnedCourse))
  })}

  // Kurssin muokkaaminen
  const editCourse = (id, values) => {
    const course = courseById(id)
    const changedCourse = {
      ...course,
      name: values.name,
      description: values.description
    }

    courseService
      .update(id, changedCourse)
      .then(response => {
        setCourses(courses.map(course =>
          course.id !== id ? course : response))
      })
  }

  // Kurssin poistaminen
  const removeCourse = id => {
    const course = courseById(id)
    if (window.confirm(`Haluatko varmasti poistaa kurssin ${course.name}? Toiminto poistaa kurssin ja kaikki sen osat.`)) {
      courseService
        .remove(id).then(() => {
          setCourses(
            courses.filter(course => course.id !== id)
          )
        })
    }
  }

  // Osan lisääminen kurssille
  const addCoursePart = (id, values) => {
    const partObject = {
      name: values.name,
      content: values.content
    }
    partService
      .create(id, partObject)
      .then(response => {
        setCourses(courses.map(course =>
          course.id !== id ? course : response))
      })
  }

  // Osan poistaminen
  const removeCoursePart = (id, partid) => {
    if (window.confirm(`Haluatko varmasti poistaa tämän osan? Toimintoa ei voi peruuttaa.`)) {
      partService
        .remove(id, partid).then( response => {
          setCourses(courses.map(course =>
            course.id !== id ? course : response))
        })
    }
  }

  // Osan muokkaaminen
  const editCoursePart = (id, partid, values) => {
    const changedCoursePart = {
      name: values.name,
      content: values.content,
      id: partid
    }

    partService
      .update(id, partid, changedCoursePart)
      .then(response => {
        console.log(response)
        setCourses(courses.map(course =>
          course.id !== id ? course : response))
          console.log(courses)
      })
  }

  // Kurssin etsiminen
  function courseById(id) {
    if (courses) {
      const course = courses.find(course => course.id === id)
      return course
    }
    return null
  }

  // Kurssin osan etsiminen
  function partById (id, partid) {
    const course = courseById(id) 
    if (course) { // tarkistetaan, että data on haettu palvelimelta
      const part =  course.parts.find(part => part.id === partid)
      return part
    }
    return null
  }    

  return (
    <div>
    <Router>
    <Header user={user}/>  
      <Route exact path="/" render={() =>
        user ?
        <Home
          courses={courses}
          removeCourse={removeCourse}
        />
        : <Redirect to="/login" />
      } />
      <Route path="/login" render={() =>
        <Login />
      } />
      <Route path="/add-course" render={() =>
        <CourseForm
          addCourse={addCourse}/>
      } />
      <Route exact path="/courses/:id" render={(props) =>
        <CoursePage
          course={courseById(props.match.params.id)}
          removeCourse={removeCourse}
          editCourse={editCourse}
          addCoursePart={addCoursePart}
          removeCoursePart={removeCoursePart}
          {...props}/>
      } />
      <Route path="/courses/:id/add-course-part" render={({match}) =>
        <AddCoursePart
          addCoursePart={addCoursePart}
          course={courseById(match.params.id)}/>
      } />
      <Route path="/courses/:id/edit" render={({match}) =>
        <EditCourse
          editCourse={editCourse}
          course={courseById(match.params.id)}/>
      } />
      <Route path="/courses/:id/parts/:partid/edit" render={({match}) =>
        <EditCoursePart
          course={courseById(match.params.id)}
          part={partById(match.params.id, match.params.partid)}
          editCoursePart={editCoursePart}
        />
      } />
    </Router>
    </div>
  )
}

export default App;
