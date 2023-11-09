import axios from "axios";
import React, { useEffect, useState } from "react";
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

function VideoUpload() {
  //   const navigate = useNavigate();

  //   const [flag, setFlag] = useState({ 0: "" });

  const [selectedCourse, setSelectedCourse] = useState("");
  const [coursesList, setCoursesList] = useState();

  const [selectedChapter, setSelectedChapter] = useState("");
  const [chaptersList, setChaptersList] = useState([]);

  const [chaptersDataList, setChaptersDataList] = useState([]);

  const [selectedSubtopic, setSelectedSubtopic] = useState("");
  const [subtopicList, setSubtopicList] = useState();

  const [category, setCategory] = useState({});

  const [message, setMessage] = useState("");

  const [selectedSegName, setSelectedSegName] = useState("");

  const [selectedFile, setSelectedFile] = useState();

  const [isFilePicked, setIsFilePicked] = useState(false);

  const [selectedFiles, setSelectedFiles] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);

  const userID = localStorage.getItem("userRoleId")
    ? JSON.parse(localStorage.getItem("userRoleId"))
    : {};

  //---------------------------------------- Get Courses List ---------------------------------

  //get course
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
    // setSelectedCourse("");
    // setSelectedChapter("");
  }, []);

//------------------------------------ Get chapter List -----------------------------------

  //get chapters
  useEffect(() => {
    //get chapters list
    const cId = selectedCourse.value;
    // alert(cId);
    if (coursesList === undefined) {
      // alert(cId);
    } else {
      const getChaptersList = async () => {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          //destructuring original => res.data
          const { data } = await axios.post(
            `http://localhost:9090/api/elearning/chaptersdata/${cId}`,

            config
          );
          console.log(data);
          //splite data for courses dropwdown(label:course name value:course id)
          const result = [];
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let obj = {};

            obj.value = element.chapterId;
            obj.label = element.chapterTitle;

            result.push(obj);
          }

          console.log("result", result);
          // setChaptersDataList(...data);
          console.log("ch data list", chaptersDataList);
          setChaptersDataList(result);

          // setChaptersList(data);
          // console.log(result);
          // console.log("chapters list:", chaptersList);
        } catch (error) {
          console.log(error);
        }
      };
      getChaptersList();
    }
  }, [selectedCourse]);


//--------------------------------------------- Get Sub-topic List -----------------------------------

  //get subtopics

  useEffect(() => {
    //get chapters list
    const sId = selectedChapter.value;
    // alert(cId);
    if (chaptersDataList === undefined) {
      // alert("subt", sId);
    } else {
      const getSubtList = async () => {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          //destructuring original => res.data
          const { data } = await axios.post(
            `http://localhost:9090/api/elearning/subtdata/${sId}`,

            config
          );
          console.log(data);
          //splite data for courses dropwdown(label:course name value:course id)
          const result = [];
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let obj = {};

            obj.value = element.subtId;
            obj.label = element.subtTitle;

            result.push(obj);
          }

          console.log(
            "data..",
            selectedCourse.value,
            selectedChapter.value + " " + selectedSubtopic.value
          );
          console.log("result", result);
          // setChaptersDataList(...data);
          // console.log("ch data list", chaptersDataList);
          setSubtopicList(result);

          // setChaptersList(data);
          // console.log(result);
          // console.log("chapters list:", chaptersList);
        } catch (error) {
          console.log(error);
        }
      };
      getSubtList();
    }
  }, [selectedChapter]);

  // useEffect(() => {

  //   //get chapters list
  //   const cid = selectedCourse.value;
  //   if(selectedChapter!=""){
  //     const getChaptersList = async () => {
  //       try {
  //         const config = {
  //           headers: {
  //             "Content-type": "application/json",
  //           },
  //         };
  //         //destructuring original => res.data
  //         const { data } = await axios.post(
  //           "http://localhost:9090/api/elearning/getchapters",
  //           { courseId: cid },
  //           config
  //         );

  //         //splite data for courses dropwdown(label:course name value:course id)
  //         const result = [];
  //         for (let index = 0; index < data.length; index++) {
  //           const element = data[index];
  //           let obj = {};
  //           let temp = element.split(",");

  //           obj.value = temp[0];
  //           obj.label = temp[1];
  //           result.push(obj);
  //         }

  //         setChaptersList(result);
  //         // console.log(result);
  //         console.log("subtopic list:", subtopicList);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };
  //     getChaptersList();
  //   }

  // }, [selectedChapter]);

  // useEffect(() => {
  //   //get courses list
  //   if (selectedSegName !== "") {
  //     const getCoursesList = async () => {
  //       try {
  //         const config = {
  //           headers: {
  //             "Content-type": "application/json",
  //           },
  //         };
  //         //destructuring original => res.data
  //         const { data } = await axios.post(
  //           "http://localhost:9090/api/elearning/getcourses",
  //           { userId: userID },
  //           config
  //         );

  //         //splite data for courses dropwdown(label:course name value:course id)
  //         const result = [];
  //         for (let index = 0; index < data.length; index++) {
  //           const element = data[index];
  //           let obj = {};
  //           let temp = element.split(",");

  //           obj.value = temp[0];
  //           obj.label = temp[1];
  //           result.push(obj);
  //         }

  //         setCoursesList(result);
  //         console.log(result);
  //         console.log("course list:", coursesList);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     getCoursesList();
  //     setSelectedCourse("");
  //     setSelectedChapter("");
  //   }
  // }, [selectedSegName]);

  // useEffect(() => {
  //   alert("get chapter");
  //   //get chapters list
  //   const cid = selectedCourse.value;

  //   if (
  //     selectedCourse.label === "Chapter" ||
  //     selectedCourse.label === "Subtopic"
  //   ) {
  //     const getChaptersList = async () => {
  //       try {
  //         const config = {
  //           headers: {
  //             "Content-type": "application/json",
  //           },
  //         };
  //         //destructuring original => res.data
  //         const { data } = await axios.post(
  //           "http://localhost:9090/api/elearning/getchapters",
  //           { courseId: cid },
  //           config
  //         );

  //         //splite data for courses dropwdown(label:course name value:course id)
  //         const result = [];
  //         for (let index = 0; index < data.length; index++) {
  //           const element = data[index];
  //           let obj = {};
  //           let temp = element.split(",");

  //           obj.value = temp[0];
  //           obj.label = temp[1];
  //           result.push(obj);
  //         }

  //         setChaptersList(result);
  //         // console.log(result);
  //         console.log("chapters list:", chaptersList);
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     };

  //     getChaptersList();
  //   }
  // }, [selectedCourse]);

  const selectFile = (event) => {
    setSelectedFiles(event.target.files);
    // setSelectedFile(event.target.files[0]);
  };

  // -------------------------------------- Upload Video --------------------------------------------
  const upload = (e) => {
    e.preventDefault();
    let currentFile = selectedFiles[0];
    setCurrentFile(currentFile);

    const uploadImage = async () => {
      let formData = new FormData();
      formData.append("image", selectedFiles[0]);

      try {
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
          },
        };
        //destructuring original => res.data
        const { data } = await axios.post(
          "http://localhost:9090/api/elearning/file/uploadimg",
          {
            image: currentFile,
            courseId: selectedCourse.value,
            userId: userID,
            chapterId: selectedChapter.value,
            subtId: selectedSubtopic.value,
          },
          config
        );

        //getCoursesList();
        setSelectedCourse("");
        setSelectedChapter("");
        setSelectedSubtopic("");

        // setMnfId(data);
        // console.log(mnfId);
        alert(data.message);
      } catch (error) {
        console.log(error);
      }
    };

    // if (selectedSegName.value === "1") {
    //   // submit chapter details along with uploaded file
    //   const submitCourse = async () => {};
    // }
    // //else submit course and chapter details along with uploaded file
    // if (selectedSegName.value === "2") {
    //   //
    //   const submitChapter = async () => {};
    // }

    // //else submit course, chapter and subtopic details along with uploaded file
    // if (selectedSegName.value === "3") {
    //   //
    //   const submitSubt = async () => {};
    // }

    uploadImage();
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files);
    // setIsSelected(true);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setMessage("User Register Successfully");
    //on submit sucessfull redirec to next form to NewCourseTopic get course details

    // navigate("/instructor/newtutorial/newchapter")
  };

  //   const handleChange = (e) => {
  //   const handleChange = (e) => {
  //   const handleChange = (e) => {

  //   const handleChange = (e) => {
  //     setFlag(e.target.value);
  //     console.log("flag", flag);
  //   };

  // useEffect(() => {
  //   console.log("cat: ", selectedSegName);
  // }, [selectedSegName]);

  const options = [
    { value: "0", label: "Select" },
    { value: "1", label: "Course" },
    { value: "2", label: "Chapter" },
    { value: "3", label: "Subtopic" },
  ];

  return (
    <Container className="mt-5">
      <Row className="pt-5 mb-5">
        <Col sm={{ size: 6, offset: 3 }}>
          <Card color="dark" outline>
            <CardHeader className="text-center">
              <h3>Upload Videos</h3>
            </CardHeader>
            <CardBody>
              <>
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
                      selectedCourse === ""
                        ? "Select course for you want to upload"
                        : selectedCourse
                    }
                    required={true}
                  />
                </>

                <>
                  <Label for="">Select Chapter Title</Label>
                  <Select
                    value={selectedChapter}
                    onChange={(item) => {
                      setSelectedChapter(item);
                    }}
                    options={chaptersDataList}
                    // getOptionValue={(item) => item}
                    // getOptionLabel={(item) => item}
                    placeholder={
                      selectedChapter === ""
                        ? "Select chapter"
                        : selectedChapter
                    }
                  />
                </>

                <>
                  <Label for="">Select Subtopic Title</Label>
                  <Select
                    value={selectedSubtopic}
                    onChange={(item) => {
                      setSelectedSubtopic(item);
                    }}
                    options={subtopicList}
                    // getOptionValue={(item) => item}
                    // getOptionLabel={(item) => item}
                    placeholder={
                      selectedSubtopic === ""
                        ? "Select subtopic under u wanna upload "
                        : selectedSubtopic
                    }
                  />
                </>

                <>
                  <label className="btn btn-default">
                    <input type="file" onChange={selectFile} />
                  </label>

                  <button className="btn btn-success" onClick={upload}>
                    Upload
                  </button>
                </>

                {/* <Label for="">Select upload type</Label>
                <Select
                  value={selectedSegName}
                  onChange={(item) => {
                    setSelectedSegName(item);
                  }}
                  options={options}
                />
                <hr />

                {selectedSegName.value === "1" ? (
                  <>
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
                          selectedCourse === ""
                            ? "Select course for you want to upload"
                            : selectedCourse
                        }
                        required={true}
                      />
                    </>
                    <>
                      <label className="btn btn-default">
                        <input type="file" onChange={selectFile} />
                      </label>

                      <button className="btn btn-success" onClick={upload}>
                        Upload
                      </button>
                    </>
                  </>
                ) : selectedSegName.value === "2" ? (
                  <>
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
                          selectedCourse === ""
                            ? "Select course for you want to upload"
                            : selectedCourse
                        }
                        required={true}
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

                    <Form onSubmit={submitHandler}>
                      <FormGroup>
                        <Label for="userVideo">Upload Videos for Chapter</Label>
                        <Input
                          id="userVideo"
                          type="file"
                          // value={address}
                          onChange={(e) => {}}
                        />
                      </FormGroup>

                      <Container className="text-center">
                        <Button type="submit" color="success">
                          Submit
                        </Button>
                      </Container>
                    </Form>
                  </>
                ) : selectedSegName.value === "3" ? (
                  <Form onSubmit={submitHandler}>
                    <>
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
                            selectedCourse === ""
                              ? "Select course under u wanna upload"
                              : selectedCourse
                          }
                          required={true}
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
                            selectedChapter === ""
                              ? "Select chapter under u wanna upload"
                              : selectedChapter
                          }
                        />
                      </>

                      <>
                        <Label for="">Select Subtopic Title</Label>
                        <Select
                          value={selectedSubtopic}
                          onChange={(item) => {
                            setSelectedSubtopic(item);
                          }}
                          options={subtopicList}
                          // getOptionValue={(item) => item}
                          // getOptionLabel={(item) => item}
                          placeholder={
                            selectedSubtopic === ""
                              ? "Select subtopic under u wanna upload "
                              : selectedSubtopic
                          }
                        />
                      </>
                    </>
                    <FormGroup>
                      <Label for="userVideo">Upload Videos for Subtopic</Label>
                      <Input
                        id="userVideo"
                        type="file"
                        // value={address}
                        onChange={(e) => {}}
                      />
                    </FormGroup>

                    <Container className="text-center">
                      <Button type="submit" color="success">
                        Submit
                      </Button>
                    </Container>
                  </Form>
                ) : (
                  <></>
                
                
                )} */}

                <hr />
              </>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default VideoUpload;
