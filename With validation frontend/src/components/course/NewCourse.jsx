import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  FormText,
  Input,
  Label,
  Row,
} from "reactstrap";
import { addcourse } from "../../actions/userActions";
function NewCourse() {
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseType, setCourseType] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [courseCategory, setCourseCategory] = useState("");
  const [loggedInUser, setLoggedInUser] = useState("");

  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userID = localStorage.getItem("userRoleId")
    ? JSON.parse(localStorage.getItem("userRoleId"))
    : {};

  const options = [
    { value: "0", label: "Select" },
    { value: "1", label: "TECHNOLOGY" },
    { value: "2", label: "BUSINESS" },
    { value: "3", label: "HEALTH" },         // changes  and also achange in catRoutes
    { value: "4", label: "LANGUAGES" },
  ];

  useEffect(() => {
    const getSegIdBySegName = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        //destructuring original => res.data
        const { data } = await axios.post(
          "http://localhost:9090/api/elearning/getuid",
          { userName: userInfo },
          config
        );

        setLoggedInUser(data);
        console.log(loggedInUser);
      } catch (error) {
        console.log(error);
      }
    };

    getSegIdBySegName();
  }, [userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    const courseThumbPath = "";
    const introVideoPath = "";
    console.log("useid ", userID);
    console.log("course cat", courseCategory);
    // addCourse Action is  triggered
    dispatch(
      addcourse(
        courseTitle,
        courseDesc,
        courseType,
        coursePrice,
        courseThumbPath,
        introVideoPath,
        userID,
        courseCategory.value
      )
    );

    setCourseCategory("");
    setCourseDesc("");
    setCoursePrice("");
    setCourseTitle("");
    setCourseType("");

    // setMessage("User Register Successfully");
  };

  return (
    <Container className="mt-5">
      <Row className="pt-5 mb-5">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" outline>
            <CardHeader className="text-center">
              <h3>Add New Course</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitHandler}>
                <FormGroup>
                  <Label for="firstName">Course Title</Label>
                  <Input
                    id="userName"
                    placeholder="Enter Course Title"
                    type="text"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="userAddress">Course Description</Label>
                  <Input
                    id="userAddress"
                    type="textarea"
                    value={courseDesc}
                    onChange={(e) => setCourseDesc(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="courseSelect">Select Course Type</Label>
                  <Input
                    id="courseSelect"
                    name="xyz"
                    type="select"
                    value={courseType}
                    onChange={(e) => {
                      setCourseType(e.target.value);
                      if (courseType === "free") {
                        setCoursePrice(0);
                      }
                    }}
                    required
                  >
                    <option value="0">Select</option>
                    <option value="paid">Paid</option>
                    <option value="free">Free</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="coursePrice">Price</Label>
                  <Input
                    id="coursePrice"
                    placeholder="Enter cource price"
                    type="text"
                    value={coursePrice}
                    onChange={(e) => {
                      setCoursePrice(e.target.value);
                      if (courseType === "free") {
                        setCoursePrice(0);
                      }
                    }}
                    required
                  />
                </FormGroup>

                <Select
                  value={courseCategory}
                  onChange={(item) => {
                    setCourseCategory(item);
                  }}
                  options={options}
                  placeholder={
                    courseCategory === "" ? "Select " : courseCategory
                  }
                />

                {/* <FormGroup>
                  <Label for="catSelect">Select Course Category</Label>
                  <Input
                    id="catSelect"
                    name="xyz"
                    type="select"
                    value={courseCategory}
                    onChange={(e) => {
                      setCourseCategory(e.target.value);
                    }}
                    required
                  >
                    <option value="0">Select Category</option>
                    <option value="1">TECHNOLOGY</option>
                    <option value="2">BUSINESS</option>
                    <option value="2">HELTH</option>
                    <option value="3">LANGUAGES</option>
                  </Input>
                </FormGroup> */}

                <Container className="text-center">
                  <Button type="submit" color="success">
                    Submit
                  </Button>

                  <Link to={"/instruct/tutorial/topic"}>
                    Upload new chapter
                  </Link>
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default NewCourse;
