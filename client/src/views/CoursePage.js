import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { LinkContainer } from "react-router-bootstrap"
import CoursePart from '../components/CoursePart'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import Card from 'react-bootstrap/Card'

/**
 * Kurssisivua mallintava komponentti. 
 * @param {object} history
 * @param {object} course
 * @param {function} removeCourse
 * @param {function} removeCoursePart
 */
const CoursePage = ({history, course, removeCourse, removeCoursePart}) => {

  /** Metodi kurssin poistamiseen. Kutsuu removeCourse-metodia, jonka jälkeen palauttaa
   * käyttäjän etusivulle.
   */
  const remove = () => {
    removeCourse(course.id)
    history.push('/')
  }
  
  /** Luo listan kurssin osista. */
  const cols = () => course.parts.map(part =>
    <CoursePart
    course={course}
    key={part.id}
    part={part}
    removeCoursePart={() => removeCoursePart(course.id, part.id)} /> )


  if (course) { // tarkistetaan, että kurssi-olio on haettu palvelimelta
    return (
    <Container>
    <Breadcrumb>
      <LinkContainer to="/">
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </LinkContainer>
      <Breadcrumb.Item active>{course.name}</Breadcrumb.Item>
    </Breadcrumb>
    <Row className="justify-content-md-center">
      <Col>
      <h2>{course.name}</h2>
      <p>{course.description}</p>
      <h4>Kurssin osat:</h4>
      </Col>        
      
      <Col><Link to={`/courses/${course.id}/edit`}>
        <Button
        className="float-left"
        size="sm"
        variant="outline-primary"
        style={{marginRight: '10px'}}>edit</Button></Link>
        <Button onClick={remove} className="float-left" size="sm" variant="danger">delete</Button>
      </Col>
    </Row>
    <Row>
    {course.parts? cols() : <Col>Ei osia!</Col>}
    <Col>
    <Card
      className="card h-100 text-center"
      bg="light"
      style={{margin: '10px', border: 'dashed #cacaca'}}
    >
      <Card.Body>
        <Card.Title>Luo uusi osa</Card.Title>
        <Card.Text>
        <Link to={`/courses/${course.id}/add-course-part`}>
          <Button
          variant="link"
          style={{fontSize: '400%'}}>
          +
          </Button>     
          </Link>   
      </Card.Text>
      </Card.Body>
    </Card>    
    </Col></Row>
    </Container>
  );
}
  else { // palautetaan null, jos kurssi-oliota ei ole haettu palvelimelta
    return null
  }}

export default withRouter(CoursePage);