import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import './App.css';
import Login from './views/Login'
import Home from './views/Home'
import courseService from './services/courses'

const App = () => {  
  const user = "moi"
  const [courses, setCourses] = useState([])  
  // const [newCourse, setNewCourse] = useState('')

  useEffect(() => {
    courseService
      .getAll().then(initialCourses => {
        setCourses(initialCourses)
      })
}, [])

  // Kurssin lisääminen
  /*const addCourse = event => {
    event.preventDefault()
    const courseObject = {
      content: newCourse
    }

    axios
      .post('http://localhost:3001/api/courses', courseObject)
      .then(response => {
        console.log(response)
  })}*/

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
    </Router>
  )
}

export default App;
