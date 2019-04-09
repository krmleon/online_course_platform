import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import './App.css';
import {Login, Home, Header, CourseForm, CoursePage} from './views/index'
import courseService from './services/courses'

const App = () => {  
  const user = "moi"
  const [courses, setCourses] = useState([])

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

  // Kurssin poistaminen
  const removeCourse = id => {
    const course = courses.find(n => n.id === id)
    
    if (window.confirm("Poistetaanko "+course.name+"?")) {
      courseService
        .remove(id).then(() => {
          setCourses(
            courses.filter(course => course.id !== id)
          )
        })
    }
  }

  return (
    <div>
    <Header user={user}/>
    <Router>      
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
      <Route path="/courses/:id" render={(props) =>
        <CoursePage courses={courses} {...props}/>
      } />
    </Router>
    </div>
  )
}

export default App;
