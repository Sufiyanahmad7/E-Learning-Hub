import React, { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { logout, register } from "../actions/userActions";
import { onlyChar, onlyPhone } from "../data/Regex";
import Select from "react-select";

function RegisterScreen() {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState({});
  const [phoneNo, setPhoneNo] = useState("");

  // const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  const [pwdError, setPwdError] = useState(false);
  const [phError, setPhError] = useState(false);
  const [unameError, setUnameError] = useState(false);
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [addressError, setAddressError] = useState(false);

  var flag = true;
  //   const [items, setItems] = useState([]);

  // useEffect(() => {
  //   const items = JSON.parse(localStorage.getItem('items'));
  //   if (items) {
  //    setItems(items);
  //   }
  // }, []);

  useEffect(() => {
    if (userInfo) {
      localStorage.clear();
      dispatch(logout());   // userAction 
      navigate("/login");
    }
  }, [userInfo, navigate]);

// -------------------------------------  submitHandler ---------------------------------------
  const submitHandler = (e) => {
    e.preventDefault();

    if (!onlyChar.test(userName)) {
      setUnameError(true);
      flag = true;
    }
    if (!onlyChar.test(firstName)) {
      setFnameError(true);
      flag = true;
    }
    if (!onlyChar.test(lastName)) {
      setLnameError(true);
      flag = true;
    }
    if (pass.length < 6) {
      setPwdError(true);
      flag = true;
    }
    // ----------------------------------------
    if (address.length < 25) {
      setAddressError(false);
      flag = true;
    }

    // if (address.length < 25) {
    //   setAddressError(true);
    //   flag = true;
    // }

    if (!onlyPhone.test(phoneNo)) {
      setPhError(true);
      flag = true;
    } else {
      flag = false;
    }

    console.log("flag", flag);

    if (flag === false) {
      dispatch(
        register(
          userName,
          firstName,
          lastName,
          email,
          pass,
          address,
          phoneNo,
          category.value
        )
      );
    }
    // setMessage("User Register Successfully");
  };

  //--------------------------------------  Reset ---------------------------------------------
  const reset = () => {
    setUserName("");
    setFirstName("");
    setLastName("");
    setAddress("");
    setPass("");
    setEmail("");
    setCategory({});
    setPhoneNo("");

    //err
    setPhError(false);
    setPwdError(false);
    setFnameError(false);
    setLnameError(false);
    setUnameError(false);
    setEmailError(false);
    setAddressError(false);
  };
//--------------------------------- option ----------------------------------------------
  var option = [
    { value: 2, label: "Instructor" },
    { value: 3, label: "Student" },
  ];
  const [Verifed,setVerifed]=useState(false);

  //------------ Captcha -------------------------------------------
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerifed(true);
  }
  return (
    <Container className="my-5">
      <Row className="pt-5">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" outline>
            <CardHeader className="text-center">
              <h3>Register</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitHandler}>
                <FormGroup>
                  <Label for="firstName">User Name</Label>
                  <Input
                    id="userName"
                    placeholder="Enter user name"
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                   
                  />
                  {unameError && (
                  <p style={{ color: "red" }}> Enter valid username.</p>
                )}
                </FormGroup>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter first name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormGroup>
                {fnameError && (
                  <p style={{ color: "red" }}>Only text data allowed.</p>
                )}

                <FormGroup>
                  <Label for="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter last name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                   
                  />
                </FormGroup>
                {lnameError && (
                  <p style={{ color: "red" }}>Only text data allowed.</p>
                )}

                <FormGroup>
                  <Label for="userEmail">Email</Label>
                  <Input
                    id="userEmail"
                    placeholder="Enter email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormGroup>
                {emailError && (
                  <p style={{ color: "red" }}>Enter valid Email-id.</p>
                )}
                <FormGroup>
                  <Label for="userPassword">Password</Label>
                  <Input
                    id="userPassword"
                    placeholder="password placeholder"
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                  />
                </FormGroup>
                {pwdError && (
                  <p style={{ color: "red" }}>
                    Please enter min 6 digits password.
                  </p>
                )}

                <FormGroup>
                  <Label for="phoneNo">Phone No.</Label>
                  <Input
                    id="phoneNo"
                    placeholder="Enter phone no"
                    type="number"
                    value={phoneNo}
                    onChange={(e) => setPhoneNo(e.target.value)}
                    // required
                  />
                </FormGroup>
                {phError && (
                  <p style={{ color: "red" }}>Please enter min 10 mobile no.</p>
                )}

                <FormGroup>
                  <Label for="userAddress">Address</Label>
                  <Input
                    id="userAddress"
                    type="textarea"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormGroup>
                {addressError && (
                  <p style={{ color: "red" }}>Address length should be Min 25 char reuired</p>
                )}
                <>
                  <Label for="">Select User</Label>
                  <Select
                    value={category}
                    onChange={(item) => {
                      setCategory(item);
                    }}
                    options={option}
                    // getOptionValue={(item) => item}
                    // getOptionLabel={(item) => item}
                    placeholder={
                      category === {} ? "Select Category" : category.label
                    }
                    required={true}
                  />
                </>
                {/* -------------------------- Captcha ----------------------------------------------- */}
                
                <div className="" style={{marginLeft:"13px",marginBottom:"20px"}} >
                
                        <ReCAPTCHA className="col-sm-8"
                                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                                onChange={onChange}
                        />
                    </div>
                   
                <Container className="text-center">
               {/* changes */}
                  {/*<Button type="submit" color="success"  disabled={!Verifed} > */}
                  <Button type="submit" color="success"  >
                    Submit
                 </Button>
                  <Button type="button" onClick={reset} color="success">
                    reset
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

export default RegisterScreen;
