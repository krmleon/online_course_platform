import React from 'react'
import { withRouter } from "react-router-dom"
import useForm from '../hooks/useForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const AddCoursePart = ({addCoursePart, history, course}) => {

  const { values, handleChange, handleSubmit } = useForm(handleForm);

  function handleForm() {
    addCoursePart(course.id, values)
    history.push(`/courses/${course.id}`)
  }
  
  if (course) {
  return (
    <Container>
    <Row className="justify-content-md-center">
    <Col lg={6}>   
      <Form onSubmit={handleSubmit}>
        <h2>Lisää osa kurssille {course.name}</h2>
        <Form.Group controlId="name">
          <Form.Label>Osan nimi</Form.Label>
          <Form.Control
            type="text"
            value={values.name || ''}
            onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="content">
          <Form.Label>Sisältö</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            value={values.content}
            onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Lisää
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

export default withRouter(AddCoursePart);