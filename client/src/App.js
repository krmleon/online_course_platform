import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './App.css';
import CourseList from './components/CourseList'
import Login from './components/Login'
import courseService from './services/courses'

const App = () => {
  const user = "moi"
  const [courses, setCourses] = useState([])  
  const [newCourse, setNewCourse] = useState('')

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
  })}

  // Kurssin poistaminen
  const removeCourse = (id) => {
    return () => {
      const url = baseUrl+`/${id}`
      console.log(url)
      const person = this.state.persons.find(n => n.id === id)
      if (window.confirm("Poistetaanko "+person.name+"?")) {
        axios
          .delete(url)
          .then(() => {
            this.setState({
              persons: this.state.persons.filter(person => person.id !== id)
            })
          })
      }
    }
  }*/

  if (user === null) {
    return (
      <Container>
        <Row className="justify-content-md-center">
        <Col lg={6}>
          <Login />
        </Col>
        </Row>
      </Container>
    
  )}
  return (
    <Container>
      <CourseList courses={courses}/>
    </Container>  
  )
}


export default App;
