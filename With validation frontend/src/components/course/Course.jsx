import React, { useEffect, useState } from "react";
// import mov_bbb from "../../assets/video/mov_bbb.mp4";
import thumb from "../../assets/2.jpg";
import "./Course.css";
import { Button, Container, Row } from "reactstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function Course() {
  //course id
  const { cId } = useParams();

  //get user id

  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setimageUrl] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");
  const [courseData, setCourseData] = useState([]);

  //load user
  const [userId, setUserId] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //fetch user id by name
  const loadUid = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.post(
        `http://localhost:9090/api/elearning/user/getuid/${userInfo}`,
        config
      );
      setUserId(data);
      // alert(userId);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
//------------------------------------------  load Chapters Data -----------------------------------
  useEffect(() => {
    loadUid();
  }, []);

  //fetch chapters list belogs to that course
  const loadChaptersData = async () => {
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

      setCourseData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadChaptersData();
  }, []);

  // const downImage = async () => {
  //   let formData = new FormData();
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "multipart/form-data",
  //       },
  //     };
  //     //destructuring original => res.data
  //     formData = await axios.get(
  //       "http://localhost:9090/api/elearning/download/image-9-66_233.mp4",

  //       config
  //     );

  //     // setMovbbb(formData.data);
  //     console.log(formData);

  //     var myVid = document.getElementById("vidObj");
  //     myVid.setAttribute(
  //       "src",
  //       "http://localhost:9090/api/elearning/download/image-9-66_233.mp4"
  //     );
  //     myVid.play(); //# test playback

  //     //setVideo(url);

  //     // setMnfId(data);
  //     // console.log(mnfId);
  //     // alert(data.message);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const downImage = async () => {
  //   //destructuring original => res.data
  //   // let data = new FormData();
  //   // data = await axios.get(
  //   //   "http://localhost:9090/api/elearning/download/image-9-66_233.mp4"
  //   // );

  //   // axios
  //   //   .get("http://localhost:9090/api/elearning/download/image-9-66_233.mp4", {
  //   //     headers: { Accept: "video/mp4;charset=UTF-8" },
  //   //   })
  //   //   .then((response) => {
  //   //     let myUrl = (window.URL || window.webkitURL).createObjectURL(
  //   //       new Blob([response.data])
  //   //     ); // response.data.data

  //   //     var myVid = document.getElementById("vidObj");
  //   //     myVid.setAttribute("src", myUrl);
  //   //     myVid.play(); //# test playback

  //   //     //setVideo(url); //# is this needed?
  //   //   });

  //   // setMnfId(data);
  //   // setMovbbb(data);
  //   // console.log(data);
  // };

  // useEffect( () => {
  //   axios.get( pathToVideo, { headers: { Accept: 'video/mp4;charset=UTF-8' } } )
  //   .then( response => {
  //           myUrl = (window.URL || window.webkitURL).createObjectURL( new Blob([response.data]) ); // response.data.data

  //           var myVid = document.getElementById('vidObj');
  //           myVid.setAttribute("src", myUrl);
  //           myVid.play(); //# test playback

  //           //setVideo(url); //# is this needed?
  //       })
  //   });

//------------------------------------- load Video ----------------------------------

  const loadVideo = (chaptid, subtid) => {
    //prepare string
    let vidName = "vid" + "_" + cId + "-" + chaptid + "-" + subtid;
    // alert("lead video", vidName);
    console.log(vidName);
    // let url = `http://localhost:9090/api/elearning/download/image-9-66_233.mp4`;

    let url = `http://localhost:9090/api/elearning/download/${vidName}.mp4`;

    setVideoUrl(url);
  };

  return (
    <Container>
      <Row>
        <div className="col-auto col-md-3 col-xl-3 px-sm-2 px-0 my-3 courseSidebar">
          <div class="d-flex flex-column justify-content-start align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <ul
              class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start pt-5 w-100"
              id="menu"
            >
              {/* <hr /> */}

              {courseData.map((item, index) => {
                return (
                  <>
                    {/* <hr /> */}
                    <li>
                      <a
                        href="#submenu2"
                        data-bs-toggle="collapse"
                        class="nav-link px-0 align-middle "
                      >
                        <span class="ms-1 d-none d-sm-inline text-dark">
                          {index + 1}.{item.chapterTitle}
                        </span>
                        &nbsp;
                        <i
                          class="fa fa-caret-down text-dark"
                          aria-hidden="true"
                        ></i>
                      </a>
                      <ul
                        class="collapse nav flex-column ms-1"
                        id="submenu2"
                        data-bs-parent="#menu"
                      >
                        {item.subtpics.map((subt) => (
                          <li class="w-100">
                            <a href="#" class="nav-link px-0 ">
                              <span
                                class="d-none d-sm-inline text-primary"
                                onClick={() =>
                                  loadVideo(item.chapterId, subt.subtId)
                                }
                              >
                                {subt.subtIndexNo}&nbsp;
                                {subt.subtTitle}
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <hr />
                  </>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="col py-3">
          <div className="row mt-5 d-flex flex-row justify-content-center justify-content-sm-start">
            <div className="col-xl-2 col-sm-2">
              {/* <div class="card text-white bg-danger h-100">
              <div class="card-body bg-danger">
                <div class="rotate">
                  <i class="fa fa-list fa-4x"></i>
                </div>
                <h6 class="text-uppercase">Posts</h6>
                <h1 class="display-4">87</h1>
              </div>
            </div> */}
            </div>
            <div className="col-xl-8 col-sm-6 py-3 ">
              <div className="card bg-success">
                <div
                  className="card-body bg-success"
                  style={{ backgroundColor: "#57b960" }}
                >
                  <video
                    id="vidObj"
                    controls
                    src={videoUrl}
                    poster={thumb}
                    width="auto"
                    className="vid"
                  >
                    Sorry, your browser doesn't support embedded videos, but
                    don't worry, you can
                    <a href="#">download it</a>
                    and watch it with your favorite video player!
                  </video>
                </div>
              </div>
            </div>
            <div class="col-xl-2 col-sm-2">
              {/* <div class="card text-white bg-danger h-100">
              <div class="card-body bg-danger">
                <div class="rotate">
                  <i class="fa fa-list fa-4x"></i>
                </div>
                <h6 class="text-uppercase">Posts</h6>
                <h1 class="display-4">87</h1>
              </div>
            </div> */}
            </div>
          </div>
          <hr />
        </div>
      </Row>
    </Container>
  );
}

export default Course;
