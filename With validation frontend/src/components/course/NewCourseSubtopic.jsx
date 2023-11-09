import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { addsubtopic } from "../../actions/userActions";

function NewCourseSubtopic() {
  const dispatch = useDispatch();

  const [selectedCourse, setSelectedCourse] = useState("");
  const [coursesList, setCoursesList] = useState();

  const [selectedChapter, setSelectedChapter] = useState("");
  const [chaptersList, setChaptersList] = useState();

  const [userName, setUserName] = useState("");
  const [subtIndexNo, setSubtIndexNo] = useState("");
  const [subtTitle, setSubtTitle] = useState("");
  const [subtDesc, setSubtDesc] = useState("");
  const [subtThumbPath, setSubtThumbPath] = useState("");
  const [subtFilePath, setSubtFilePath] = useState("");
  const [subtVideoPath, setSubtVideoPath] = useState("");
  // const [chapter, setChapter] = useState("");
  const [courseID, setCourseID] = useState("");

  const [message, setMessage] = useState("");

  const userID = localStorage.getItem("userRoleId")
    ? JSON.parse(localStorage.getItem("userRoleId"))
    : {};


//----------------------------------------  Get Courses List ---------------------------

  useEffect(() => {
    //get courses list
    const getCoursesList = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        //destructuring original => res.data
        const { data } = await axios.post(
          "http://localhost:9090/api/elearning/getcourses",
          { userId: userID },
          config
        );

        //splite data for courses dropwdown(label:course name value:course id)
        const result = [];
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          let obj = {};
          let temp = element.split(",");

          obj.value = temp[0];
          obj.label = temp[1];
          result.push(obj);
        }

        setCoursesList(result);
        console.log(result);
        console.log("course list:", coursesList);
      } catch (error) {
        console.log(error);
      }
    };

    getCoursesList();
  }, []);

//---------------------------------- Get Chapter List -------------------------------------

  useEffect(() => {
    //get chapters list
    const cid = selectedCourse.value;

    const getChaptersList = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        //destructuring original => res.data
        const { data } = await axios.post(
          "http://localhost:9090/api/elearning/getchapters",
          { courseId: cid },
          config
        );

        //splite data for courses dropwdown(label:course name value:course id)
        const result = [];
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          let obj = {};
          let temp = element.split(",");

          obj.value = temp[0];
          obj.label = temp[1];
          result.push(obj);
        }

        setChaptersList(result);
        // console.log(result);
        console.log("chapters list:", chaptersList);
      } catch (error) {
        console.log(error);
      }
    };

    getChaptersList();
  }, [selectedCourse]);

//---------------------------------------- submit Handler ----------------------------------------

  const submitHandler = (e) => {
    e.preventDefault();

    const courseid = selectedCourse.value; //get course id
    const chapter = selectedChapter.value; //get chapter id

    dispatch(
      addsubtopic(
        subtIndexNo,
        subtTitle,
        subtDesc,
        subtThumbPath,
        subtFilePath,
        subtVideoPath,
        chapter,
        courseid
      )
    );

    setSubtIndexNo("");
    setSubtTitle("");
    setSubtDesc("");
    setSelectedCourse("");
    setSelectedChapter("");
    setChaptersList("");
    //on submit sucessfull redirec to next form to NewCourseTopic get course details
  };

  return (
    <Container className="mt-5">
      <Row className="pt-5 mb-5">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" outline>
            <CardHeader className="text-center">
              <h3>Add Sub-Topic</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitHandler}>
                <>
                  <Label for="">Select Course Title</Label>
                  <Select
                    value={selectedCourse}
                    onChange={(item) => {
                      setSelectedCourse(item);
                    }}
                    options={coursesList}
                    // getOptionValue={(item) => item}
                    // getOptionLabel={(item) => item}
                    placeholder={
                      selectedCourse === "" ? "Select " : selectedCourse
                    }
                  />
                </>

                <>
                  <Label for="">Select Chapter Title</Label>
                  <Select
                    value={selectedChapter}
                    onChange={(item) => {
                      setSelectedChapter(item);
                    }}
                    options={chaptersList}
                    // getOptionValue={(item) => item}
                    // getOptionLabel={(item) => item}
                    placeholder={
                      selectedChapter === "" ? "Select " : selectedChapter
                    }
                  />
                </>

                <FormGroup>
                  <Label for="subtindx">Subtopic Index No.</Label>
                  <Input
                    id="subtindx"
                    placeholder="Enter subtopic index no"
                    type="text"
                    value={subtIndexNo}
                    onChange={(e) => setSubtIndexNo(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="firstName">Subtopic Title</Label>
                  <Input
                    id="userName"
                    placeholder="Enter subtopic title"
                    type="text"
                    value={subtTitle}
                    onChange={(e) => setSubtTitle(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="userAddress">Subtopic Description</Label>
                  <Input
                    id="userAddress"
                    type="textarea"
                    value={subtDesc}
                    onChange={(e) => setSubtDesc(e.target.value)}
                  />
                </FormGroup>

                <Container className="text-center">
                  <Button type="submit" color="success">
                    Submit
                  </Button>
                  <span className="">
                    <Link to="/instruct/tutorial/topic">Add chapter</Link>
                  </span>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NewCourseSubtopic;
