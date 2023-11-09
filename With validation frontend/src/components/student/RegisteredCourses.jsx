import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Container, Row } from "reactstrap";
import { Card, Button, CardTitle, CardText } from "reactstrap";

function RegisteredCourses() {
  const navigator = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const { userId } = useParams();

  const loadEnrolledCourse = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        `http://localhost:9090/api/elearning/student/enrolled/courses/${userId}`,
        config
      );

      setEnrolledCourses(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadEnrolledCourse();
  }, []);

  const handleAccess = (cId) => {
    // alert(cId);
    navigator(`/student/access/course/${cId}`);
  };

  return (
    <Container className="py-5">
      <Row className="my-5">
        {enrolledCourses.map((course, index) => (
          <div class="col-xl-3 col-sm-6 py-2 text-center">
            <Card body outline color="danger">
              <CardTitle>
                <h2>{course.courseTitle}</h2>
              </CardTitle>
              <CardText>Continue learning....</CardText>
              <Button
                color="secondary"
                onClick={() => handleAccess(course.cId)}
              >
                Access Course
              </Button>
            </Card>
          </div>
        ))}
      </Row>
    </Container>
  );
}

export default RegisteredCourses;
