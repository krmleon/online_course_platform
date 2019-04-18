import React from 'react';
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const Course = ({course, remove}) => {
    return (
      <Col style={{marginBottom: '10px'}} lg={4}>
        <Card className="card h-100" style={{margin: '10px'}}>
          <Card.Body>
            <Card.Title><Link to={`/courses/${course.id}`}>{course.name}</Link></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {course.parts ? course.parts.length : 0} osaa
            </Card.Subtitle>
            <Card.Text>
              {course.description}
            </Card.Text>            
            
            {//<Card.Link href="#">Card Link</Card.Link>
            //<Card.Link href="#">Another Link</Card.Link>
          }
          </Card.Body>
          <Card.Footer>
          </Card.Footer>
        </Card>
      </Col>
      
    );
  }


export default Course;