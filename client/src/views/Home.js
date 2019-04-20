import React from 'react'
import CourseList from '../components/CourseList'
import Container from 'react-bootstrap/Container'

/**
 * Kurssilistan sisältävä komponentti.
 * @param {array} courses
 * @param {function} removeCourse
 */
const Home = ({courses, removeCourse}) => {  
  return (
    <Container>
      <CourseList removeCourse={removeCourse} courses={courses}/>
    </Container>
  );
}


export default Home;