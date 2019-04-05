import React from 'react';
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Course = ({course, remove}) => {
  
    return (
      <Col lg={4}>
        <Card style={{margin: '10px'}}>
          <Card.Body>
            <Card.Title>{course.name}</Card.Title>
            <Card.Text>
              {course.description}
            </Card.Text>            
            
            {//<Card.Link href="#">Card Link</Card.Link>
            //<Card.Link href="#">Another Link</Card.Link>
          }
          </Card.Body>
          <Card.Footer>
            <Button onClick={remove} className="float-right" size="sm" variant="danger">delete</Button>
            <Button className="float-right" size="sm" variant="secondary">edit</Button>
          </Card.Footer>
        </Card>
      </Col>
      
    );
  }


export default Course;