import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
import loginvalidation from "../loginvalidation"
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
import axios from "axios";

function LoginScreen() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [pass, setPass] = useState("");

  const [roleName, setRoleName] = useState("");

  const dispatch = useDispatch();
  const [user,setUser]=useState({
    "userid":"",
    "pwd":""
})
const [submitted,setSubmitted]=useState(false)
const [errors,setErrors]=useState({})
const [errmsg,setErrmsg]=useState()

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  // const userLoginRole = useSelector((state) => state.userLoginRole);
  // const { userRole } = userLoginRole;
  // const roleName = localStorage.getItem("userRole")
  //   ? JSON.parse(localStorage.getItem("userRole"))
  //   : {};

  // const userID = localStorage.getItem("userRoleId")
  // ? JSON.parse(localStorage.getItem("userRoleId"))
  // : {};

  useEffect(() => {
    console.log("in use effect");

    if (userInfo) {
      const getRoleName = async () => {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          // findRoleNamebyUsername()  in backed in RegisterRepository
          //destructuring original => res.data
          const { data } = await axios.post(
            "http://localhost:9090/api/elearning/rolename",
            { userName: userInfo },
            config
          );

          setRoleName(data);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      };

      getRoleName();

      // console.log("rolename: ", roleName);

      // const userRole = localStorage.getItem("userRole")
      //   ? JSON.parse(localStorage.getItem("userRole"))
      //   : null;
      // // console.log(roleInfo);
      // if (userRole === "Student") {
      //   navigate("/student");
      // } else if (userRole === "Instructor") {
      //   navigate("/instructor");
      // } else if (userRole === "Admin") {
      //
      // }
    }
  }, [userInfo]);
//---------------------------------------------------------------------------------------
  useEffect(() => {
    if (roleName !== "") {
      // roleName === "Admin" ? navigate("/admin") : navigate("/instructor");

      roleName === "Admin"
        ? navigate("/admin")
        : roleName === "Instructor"
        ? navigate("/instructor")
        : roleName === "Student"
        ? navigate("/student")
        : navigate("/login");
    }
  }, [roleName]);

  const submitHandler = (e) => {
    e.preventDefault();
    setErrors(loginvalidation(user))        // setting login validation 
    setSubmitted(true)
    dispatch(login(userName, pass));      // triggerd login action 
    // setMessage("Login Successfully");
  };

  return (
    <Container className="my-5">
      <br />
      <Row className="py-5">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" outline>
            <CardHeader className="text-center">
              <h3>Login</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitHandler}>
                <FormGroup>
                  <Label for="userEmail">Username</Label>
                  <Input
                    id="userEmail"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter Username"
                    type="text"
                    
                  />
                  {errors.userid && <small className="text-danger float-right">{errors.userid}</small>}
                </FormGroup>

                <FormGroup>
                  <Label for="userPassword">Password</Label>
                  <Input
                    id="userPassword"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    placeholder="Enter password"
                    type="password"
                    
                  />
                   {errors.pwd && <small className="text-danger float-right">{errors.pwd}</small>}
                </FormGroup>

                <Container className="text-center">
                  <Button type="submit" color="success">
                    Login
                  </Button>
                  {errmsg && <p className="alert alert-danger mt-4 text-center font-weight-bold">{errmsg}</p>}
                </Container>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginScreen;
