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
import { addchapter } from "../../actions/userActions";

function NewCourseChapter() {
  const dispatch = useDispatch();

  const [chapterIndexNo, setChapterIndexNo] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterDesc, setChapterDesc] = useState("");
  // const [course, setCourse] = useState();
  const [chapterThumbPath, setChapterThumbPath] = useState("");
  const [chapterFilePath, setChapterFilePath] = useState("");
  const [chapterVideoPath, setChapterVideoPath] = useState("");

  const [selectedCourse, setSelectedCourse] = useState();
  const [coursesList, setCoursesList] = useState();

  const [optionList, setOptionList] = useState([]);

  const [message, setMessage] = useState("");

  const userID = localStorage.getItem("userRoleId")
    ? JSON.parse(localStorage.getItem("userRoleId"))
    : {};
  console.log("user id: ", userID);

  useEffect(() => {
    const getManufList = async () => {
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

    getManufList();
  }, []);

  useEffect(() => {
    console.log("selected:", selectedCourse);
  }, [selectedCourse]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("course id:", selectedCourse.value);
    const course = selectedCourse.value;

    dispatch(
      addchapter(
        chapterIndexNo,
        chapterTitle,
        chapterDesc,
        chapterThumbPath,
        chapterFilePath,
        chapterVideoPath,
        course
      )
    );

    setChapterIndexNo("");
    setChapterDesc("");
    setChapterTitle("");

    //on submit sucessfull redirec to next form to NewCourseTopic get course details
  };

  return (
    <Container className="mt-5">
      <Row className="pt-5 mb-5">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" outline>
            <CardHeader className="text-center">
              <h3>Add Chapter</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitHandler}>
                <>
                  <Label for="">Select Course</Label>
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
                <FormGroup className="pt-3">
                  <Label for="indexNo">Chapter Index No.</Label>
                  <Input
                    id="indexNo"
                    placeholder="Enter chapter index no."
                    type="text"
                    value={chapterIndexNo}
                    onChange={(e) => {
                      setChapterIndexNo(e.target.value);
                    }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="firstName">Chapter Title</Label>
                  <Input
                    id="userName"
                    placeholder="Enter chapter name"
                    type="text"
                    value={chapterTitle}
                    onChange={(e) => {
                      setChapterTitle(e.target.value);
                    }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="userAddress">Chapter Description</Label>
                  <Input
                    id="userAddress"
                    type="textarea"
                    value={chapterDesc}
                    onChange={(e) => {
                      setChapterDesc(e.target.value);
                    }}
                  />
                </FormGroup>

                {/* <FormGroup>
                  <Label for="userThumb">Upload Thumbnail</Label>
                  <Input
                    id="userThumb"
                    type="file"
                    value={address}
                    onChange={(e) => {}}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="userVideo">Upload Video</Label>
                  <Input
                    id="userVideo"
                    type="file"
                    value={address}
                    onChange={(e) => {}}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="userVideo">Upload File</Label>
                  <Input
                    id="userVideo"
                    type="file"
                    value={address}
                    onChange={(e) => {}}
                  />
                </FormGroup> */}

                {/* <FormGroup>
                  <Label for="courseSelect">Select Course Type</Label>
                  <Input
                    id="courseSelect"
                    name="xyz"
                    type="select"
                    value={category}
                    onChange={(e) => {}}
                  >
                    <option value="0">Paid</option>
                    <option value="2">Free</option>
                  </Input>
                </FormGroup> */}

                <Container className="text-center">
                  <Button type="submit" color="success">
                    Submit
                  </Button>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NewCourseChapter;
