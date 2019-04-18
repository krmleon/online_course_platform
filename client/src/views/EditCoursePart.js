import React, {useState} from 'react'
import { LinkContainer } from "react-router-bootstrap"
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'

const EditCoursePart = ({course, editCoursePart, part}) => {
  if (course && part) { // tarkistetaan, että part on alustettu
    

  const [formPart, setFormPart] = useState(part)

  const handleChange = (event) => {
    setFormPart({
      ...formPart, [event.target.id]: event.target.value
    })
  }
  
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
  else {
    return null
  }
}

export default EditCoursePart;