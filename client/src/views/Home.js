import React from 'react'
import CourseList from '../components/CourseList'
import Container from 'react-bootstrap/Container'

const Home = ({courses, removeCourse}) => {  
  return (
    <Container>
      <CourseList removeCourse={removeCourse} courses={courses}/>
    </Container>
  );
}


export default Home;