import React, { useEffect, useState } from "react";
import { Button, Container, Row, Table } from "reactstrap";
import Course from "../course/Course";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function ManageCourses() {
  const [course, setCourse] = useState([]);
  const [deleteMessage, setDeleteMessage] = useState("");

  const { id } = useParams();

  const loadCourse = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.get(
        "http://localhost:9090/api/elearning/admin/courses",

        config
      );

      setCourse(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCourse();
  }, []);

  const deleteCourse = async (courseId) => {
    const { data } = await axios.delete(
      `http://localhost:9090/api/elearning/admin/deleteplant/${courseId}`
    );
    setDeleteMessage(data);
    alert(deleteMessage);
    loadCourse();
  };

  return (
    <Container className="my-5 ">
      <Row className="pt-5 ">
        <Table dark hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Type</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {course.map((c, index) => (
              <tr>
                <th scope="row" key={index}>
                  {index + 1}
                </th>
                <td>{c.courseTitle}</td>
                <td>{c.courseDesc}</td>
                <td>{c.courseType}</td>
                <td>{c.coursePrice}</td>
                <td> {/*changes -> Helth to  Health*/}
                  {c.courseCategory === 1
                    ? "Technology"
                    : c.courseCategory === 2
                    ? "Business"
                    : c.courseCategory === 3
                    ? "Health"                             
                    : c.courseCategory === 4
                    ? "Language"
                    : ""}
                </td>

                <td>
                 
                  <Button
                    onClick={() => deleteCourse(c.courseId)}
                    color="danger"
                    outline
                    size="sm"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}

export default ManageCourses;
