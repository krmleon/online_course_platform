import React from 'react'
import { withRouter } from "react-router-dom"
import useForm from '../hooks/useForm'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CourseForm = (props) => {

  const { values, handleChange, handleSubmit } = useForm(handleForm);

  function handleForm() {
    props.addCourse(values)
    props.history.push("/");
  }
  
    
  return (
    <Container>
    <Row className="justify-content-md-center">
    <Col lg={6}>   
      <Form onSubmit={handleSubmit}>
        <h2>Lisää kurssi</h2>
        <Form.Group controlId="courseName">
          <Form.Label>Kurssin nimi</Form.Label>
          <Form.Control
            type="text"
            value={values.courseName || ''}
            onChange={handleChange}/>
        </Form.Group>
        <Form.Group controlId="courseDescription">
          <Form.Label>Kuvaus</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            value={values.courseDescription}
            onChange={handleChange}/>
        </Form.Group>
        <Button variant="primary" type="submit">
          Lisää
        </Button>
        <Button variant="secondary">Takaisin</Button>
      </Form>
    </Col></Row></Container>
  );
}

export default withRouter(CourseForm);