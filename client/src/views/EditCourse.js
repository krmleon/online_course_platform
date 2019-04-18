import React, {useState} from 'react'
import { LinkContainer } from "react-router-bootstrap"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const EditCourse = ({editCourse, course}) => {
  if (course) { // tarkistetaan, että course on alustettu

  const [formCourse, setFormCourse] = useState(course)

  const handleChange = (event) => {
    setFormCourse({
      ...formCourse, [event.target.id]: event.target.value
    })
  }
  
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
  else {
    return null
  }
}

export default EditCourse;