import React, {useState} from 'react'
import { LinkContainer } from "react-router-bootstrap"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

/**
 * Komponentti kurssin osan muokkaamiseen.
 * @param {function} editCourse
 * @param {object} course
 * @param {object} part
 */
const EditCoursePart = ({course, editCoursePart, part}) => {
  if (course && part) { // tarkistetaan, että kurssi- ja osa-oliot on haettu palvelimelta
    
  /** Asetetaan osa-olio komponentin tilaan. */
  const [formPart, setFormPart] = useState(part)

  /** 
   * Käsittelee muutokset lomakkeessa. Luo spread-operaatiolla kopion vanhasta psa-oliosta,
   * jonka jälkeen asettaa uuden arvon käyttäjän muuttamalle arvolle.
   */
  const handleChange = (event) => {
    setFormPart({
      ...formPart, [event.target.id]: event.target.value
    })
  }
  
  /** 
   * Tapahtumankäsittelijä lomakkeen lähetykseen. Kutsuu editCoursePart-metodia ja antaa parametreiksi
   * kurssin id:n, osan id:n ja uuden, muokatun osa-olion.
   */
  const handleSubmit = (event) => {
    event.preventDefault()
    editCoursePart(course.id, formPart.id, formPart)
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
          <Breadcrumb.Item active>{part.name}</Breadcrumb.Item>
        </Breadcrumb>
      <Row className="justify-content-md-center">
      <Col lg={6}>   
        <Form onSubmit={handleSubmit}>
          <h2>Muokkaa osaa</h2>
          <Form.Group controlId="name">
            <Form.Label>Osan nimi</Form.Label>
            <Form.Control
              type="text"
              value={formPart.name || ''}
              onChange={handleChange}/>
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Sisältö</Form.Label>
            <Form.Control
              as="textarea"
              rows="3"
              value={formPart.content || ''}
              onChange={handleChange}/>
          </Form.Group>
          <Button variant="primary" type="submit">
            Tallenna
          </Button>
          <LinkContainer to={`/courses/${course.id}`}>
            <Button variant="secondary">Takaisin</Button>
          </LinkContainer>
        </Form>
      </Col></Row></Container>
    )
  }
  else { // palautetaan null, jos kurssi- ja osa-olioita ei ole haettu palvelimelta
    return null
  }
}

export default EditCoursePart;