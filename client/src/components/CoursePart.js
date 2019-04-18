import React from 'react';
import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const CoursePart = ({part, course, removeCoursePart}) => {
    return (
      <Col lg={4}>
        <Card className="card h-100" style={{margin: '10px'}}>
          <Card.Body>
            <Card.Title>{part.name}</Card.Title>
            <Card.Text>
              {part.content}
            </Card.Text>            
            
            {//<Card.Link href="#">Card Link</Card.Link>
            //<Card.Link href="#">Another Link</Card.Link>
          }
          </Card.Body>
          <Card.Footer>            
            <Button onClick={removeCoursePart} className="float-right" size="sm" variant="danger">delete</Button>
            <Link to={`/courses/${course.id}/parts/${part.id}/edit`}>
            <Button
              className="float-right"
              size="sm"
              variant="outline-primary"
              style={{marginRight: '10px'}}>
                edit
            </Button></Link>
          </Card.Footer>
        </Card>
      </Col>
      
    );
  }


export default CoursePart;