import React, {useState} from 'react'
import { LinkContainer } from "react-router-bootstrap"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

/**
 * Komponentti kurssin muokkaamiseen.
 * @param {function} editCourse
 * @param {object} course
 */
const EditCourse = ({editCourse, course}) => {
  if (course) { // tarkistetaan, että kurssi-olio on haettu palvelimelta

  /** Asetetaan kurssi-olio komponentin tilaan. */
  const [formCourse, setFormCourse] = useState(course)

  /** 
   * Käsittelee muutokset lomakkeessa. Luo spread-operaatiolla kopion vanhasta kurssi-oliosta,
   * jonka jälkeen asettaa uuden arvon käyttäjän muuttamalle arvolle.
   */
  const handleChange = (event) => {
    setFormCourse({
      ...formCourse, [event.target.id]: event.target.value
    })
  }
  
  /** 
   * Tapahtumankäsittelijä lomakkeen lähetykseen. Kutsuu editCourse-metodia ja antaa parametreiksi
   * kurssin id:n ja uuden, muokatun kurssi-olion.
   */
  const handleSubmit = (event) => {
    event.preventDefault()
    editCourse(formCourse.id, formCourse)
  }

    return (
      
      <Container>
        <Breadcrumb>
          <LinkContainer to="/">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </LinkContainer>
          <LinkContainer to={`/courses/${course.id}`}>
            <Breadcrumb.Item>{course.name}</Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>Muokkaa kurssia</Breadcrumb.Item>
        </Breadcrumb>
      <Row className="justify-content-md-center">
      <Col lg={6}>   
        <Form onSubmit={handleSubmit}>
          <h2>Muokkaa kurssia</h2>
          <Form.Group controlId="name">
            <Form.Label>Osan nimi</Form.Label>
            <Form.Control
              type="text"
              value={formCourse.name || ''}
              onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Sisältö</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={formCourse.description || ''}
              onChange={handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Muokkaa
          </Button>
          <Button variant="secondary">Takaisin</Button>
        </Form>
      </Col></Row></Container>
    )
  }
  else { // palautetaan null, jos kurssi-oliota ei ole haettu palvelimelta
    return null
  }
}

export default EditCourse;