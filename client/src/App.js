import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import './App.css';
import {Login, Home, Header, AddCourse, CoursePage, EditCoursePart, AddCoursePart, EditCourse} from './views/index'
import courseService from './services/courses'
import partService from './services/parts'

/**
 * App-komponentti
 * 
 * Sisältää sovelluksen tilan (kurssit), metodit kurssien ja kurssin osien
 * lisäämiseen, muokkaamiseen ja poistamiseen, sekä sovelluksen reitityksen.
 */

const App = () => {  
  /** Apumuuttuja mallintamaan käyttäjää ennen käyttäjäpohjaisuuden toteuttamista. */
  const user = "user"
  /** Komponentin tila. */
  const [courses, setCourses] = useState([])

  /**
   * Hakee kurssit ja asettaa ne komponentin tilaan.
   */
  useEffect(() => {
    courseService
      .getAll().then(initialCourses => {
        setCourses(initialCourses)
      })
}, [])

  /**
   * Suorittaa pyynnön lisätä uusi kurssi palvelimelle. Lisää uuden
   * kurssin komponentin tilaan.
   * @param {object} values 
   */
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

  /**
   * Suorittaa pyynnön muokata palvelimella olevaa kurssia. Vaihtaa komponentin
   * tilassa olevan vanhan kurssin uuteen (muokattuun).
   * @param {string} id 
   * @param {object} values 
   */
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

  /**
   * Suorittaa pyynnön poistaa kurssi palvelimelta. Poistaa kurssin komponentin tilasta.
   * @param {string} id 
   */
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

  /**
   * Suorittaa pyynnön lisätä kurssille uusi osa. Vaihtaa komponentin
   * tilassa olevan vanhan kurssin uuteen (muokattuun).
   * @param {string} id 
   * @param {object} values 
   */
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

  /**
   * Suorittaa pyynnön poistaa kurssin osa. Vaihtaa komponentin
   * tilassa olevan vanhan kurssin uuteen (muokattuun).
   * @param {string} id 
   * @param {string} partid 
   */
  const removeCoursePart = (id, partid) => {
    if (window.confirm(`Haluatko varmasti poistaa tämän osan? Toimintoa ei voi peruuttaa.`)) {
      partService
        .remove(id, partid).then( response => {
          setCourses(courses.map(course =>
            course.id !== id ? course : response))
        })
    }
  }

  /**
   * Suorittaa pyynnön muokata kurssin osaa. Vaihtaa komponentin
   * tilassa olevan vanhan kurssin uuteen (muokattuun).
   * @param {string} id 
   * @param {string} partid 
   * @param {object} values 
   */
  const editCoursePart = (id, partid, values) => {
    const changedCoursePart = {
      name: values.name,
      content: values.content,
      id: partid
    }

    partService
      .update(id, partid, changedCoursePart)
      .then(response => {
        setCourses(courses.map(course =>
          course.id !== id ? course : response))
      })
  }

  /**
   * Apufunktio kurssin etsimiseen komponentin tilasta.
   * @param {string} id 
   */
  function courseById(id) {
    if (courses) {
      const course = courses.find(course => course.id === id)
      return course
    }
    return null
  }

  /**
   * Apufunktio kurssin osan etsimiseen komponentin tilasta.
   * @param {string} id 
   * @param {string} partid 
   */
  function partById (id, partid) {
    const course = courseById(id) 
    if (course) { // tarkistetaan, että data on haettu palvelimelta
      const part =  course.parts.find(part => part.id === partid)
      return part
    }
    return null
  }    

  /** Renderöi komponentin sovelluksen reitin mukaan. */
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
        <AddCourse
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
