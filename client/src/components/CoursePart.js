import React from 'react';
// import { Link } from 'react-router-dom'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

const Course = ({part}) => {
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
            <Button className="float-right" size="sm" variant="danger">delete</Button>
            <Button className="float-right" size="sm" variant="secondary">edit</Button>
          </Card.Footer>
        </Card>
      </Col>
      
    );
  }


export default Course;