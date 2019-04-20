import React from 'react';
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Course from './Course'

/**
 * Sovelluksen etusivulla kurssilistaa mallintava komponentti.
 * @param {array} courses
 * @param {function} removeCourse
 */
const CourseList = ({courses, removeCourse}) => {

/** Luo listan kursseista. */
const cols = () => courses.map(course =>
  <Course
  remove={() => removeCourse(course.id)}
  key={course.id}
  course={course} /> )

return (
  <Row>
  <Col style={{marginBottom: '10px'}}>
    <Card className="card h-100 text-center" bg="light" style={{margin: '10px', border: 'dashed #cacaca'}}>
      <Card.Body>
        <Card.Title>Luo uusi kurssi</Card.Title>
        <Card.Text>
        <Link to={`/add-course`}>
        <Button
          variant="link"
          style={{fontSize: '400%'}}>
          +
          </Button>
        </Link>            
      </Card.Text>
      </Card.Body>
    </Card>
    
  </Col>        
  {cols()}  
  </Row>  
);
}

export default CourseList;