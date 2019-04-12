import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import CoursePart from '../components/CoursePart'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Card from 'react-bootstrap/Card'

const CoursePage = ({history, match, courses, removeCourse}) => {
  const course = courses.find(p => p.id === Number(match.params.id))

  const remove = () => {
    removeCourse(course.id)
    history.push('/')
  }

  const cols = () => course.parts.map(part =>
    <CoursePart
    key={part.id}
    part={part} /> )


  if (course) {
    return (
    <Container>
    <Breadcrumb>
      <Breadcrumb.Item><Link to={`/`}>Home</Link></Breadcrumb.Item>
      <Breadcrumb.Item active>{course.name}</Breadcrumb.Item>
    </Breadcrumb>
    <Row className="justify-content-md-center">
      <Col><h2>{course.name}</h2>
        <p>{course.description}</p>
        <h4>Kurssin osat:</h4>
      </Col>
      <Col>
        <Button onClick={remove} className="float-right" size="sm" variant="danger">delete</Button>
        <Button className="float-right" size="sm" variant="secondary">edit</Button>
      </Col>
    </Row>
    <Row>
    {course.parts ? cols() : <Col>Ei osia!</Col>}
    <Col>
    <Card
      className="card h-100 text-center"
      bg="light"
      style={{margin: '10px', border: 'dashed #cacaca'}}
    >
      <Card.Body>
        <Card.Title>Luo uusi osa</Card.Title>
        <Card.Text>
          <Button
          variant="link"
          style={{fontSize: '400%'}}>
          +
          </Button>        
      </Card.Text>
      </Card.Body>
    </Card>    
    </Col></Row>
    </Container>
  );
}
  else {
    return null
  }}

export default withRouter(CoursePage);