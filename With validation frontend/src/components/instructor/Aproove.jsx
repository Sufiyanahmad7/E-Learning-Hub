import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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

function Aproove() {
  const [qualify, setQualify] = useState("");
  const [exp, setExp] = useState("");
  const [cert, setCert] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("no");
   // initially it set to no instructor can add course only if admin approve his 
  // or her request  , if admin approve request then set it to yes (done in Admin component )
  const [uid, setUid] = useState();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;


//----------------------------------------- Get User-Id By Name --------------------------------

  useEffect(() => {
    const getIdByName = async () => {
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

        setUid(data);
      } catch (error) {
        console.log(error);
      }
    };

    getIdByName();
  }, []);


//------------------------------------ submitHandler ------------------------------------

  const submitHandler = (e) => {
    e.preventDefault();

    const submi = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        //destructuring original => res.data
        const { data } = await axios.post(
          "http://localhost:9090/api/elearning/instructor/getapprove",
          {
            qualification: qualify,
            exp: exp,
            certi: cert,
            desc: desc,
            status: status,
            uiId: uid,
          },
          config
        );

        alert(data);

        setCert("");
        setExp("");
        setQualify("");
        setDesc("");
      } catch (error) {
        console.log(error);
      }
    };

    submi();
  };

  return (
    <Container className="my-5">
      <Row className="pt-5">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" outline>
            <CardHeader className="text-center">
              <h3>Get Approve</h3>
            </CardHeader>
            <CardBody>
              <Form onSubmit={submitHandler}>
                <FormGroup>
                  <Label for="firstName">Qualification</Label>
                  <Input
                    id="userName"
                    placeholder="Enter qualification"
                    type="text"
                    value={qualify}
                    onChange={(e) => setQualify(e.target.value)}
                    required
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="firstName">Experience</Label>
                  <Input
                    id="firstName"
                    placeholder="Enter your experience"
                    type="text"
                    value={exp}
                    onChange={(e) => setExp(e.target.value)}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="lastName">Certifications</Label>
                  <Input
                    id="lastName"
                    placeholder="Enter your certifications"
                    type="text"
                    value={cert}
                    onChange={(e) => setCert(e.target.value)}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="userAddress">Description</Label>
                  <Input
                    id="userAddress"
                    type="textarea"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                  />
                </FormGroup>

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

export default Aproove;
