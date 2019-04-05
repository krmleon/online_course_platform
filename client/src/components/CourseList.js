import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Course from './Course'

const CourseList = ({courses}) => {

  const cols = () => courses.map(course =>
    <Course key={course.id} course={course} /> )

  return (
      <Row>
      <Col>
      <Card style={{margin: '10px'}}>
        <Card.Body>
          <Card.Title>Lisää uusi kurssi</Card.Title>
          <Card.Text>
            <Button variant="success" size="lg">
            +
            </Button>
          </Card.Text>
        </Card.Body>
      </Card>
      
      </Col>        
      {cols()}  
      </Row>  
  );
}

export default CourseList;