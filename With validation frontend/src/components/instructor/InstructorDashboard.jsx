import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function InstructorDashboard() {
  const [uid, setUid] = useState();
  const [aproveStatus, setAproveStatus] = useState("no");

  //dashboard count
  const [coursesCnt, setCoursesCnt] = useState(0);
  const [totalEarn, setTotalEarn] = useState(0);
  const [totalEnroll, setTotalEnroll] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

//-------------------------------------- getIdByName -----------------------------------------

  const getIdByName = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      // fetching User Id from database (backend) 
      //destructuring original => res.data
      const { data } = await axios.post(
        "http://localhost:9090/api/elearning/getuid",
        { userName: userInfo },
        config
      );

      setUid(data);

      const d = await axios.get(
        `http://localhost:9090/api/elearning/admin/aprovestatus/${data}`,

        config
      );

      setAproveStatus(d.data);

      //total earn
      const earn = await axios.get(
        `http://localhost:9090/api/elearning/revenue/${uid}`,
        config
      );

      setTotalEarn(earn.data);

      console.log(d);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  getIdByName();

//-------------------------------------------  Get Total Course Count --------------------------------

  //get total course count
  const getCrCount = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      //destructuring original => res.data
      const { data } = await axios.get(
        `http://localhost:9090/api/elearning/instruct/totalcourses/${uid}`,
        config
      );
      setCoursesCnt(data);

      //total earn
      const earn = await axios.get(
        `http://localhost:9090/api/elearning/revenue/${uid}`,
        config
      );

      setTotalEarn(earn.data);
    } catch (error) {
      console.log(error);
    }
  };
  getCrCount();

  //get total earningsa
  // const getTotalEarn = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //     };

  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // getTotalEarn();

//-------------------------------------------- Get Total Enrollment in Course --------------------------

  const getTotalEnroll = async () => {
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const enrollCnt = await axios.get(
        `http://localhost:9090/api/elearning/instruct/enroll/${uid}`,
        config
      );

      setTotalEnroll(enrollCnt.data);
    } catch (error) {
      console.log(error);
    }
  };
  getTotalEnroll();

//----------------------------------- Get User Approve Status -------------------------------------- 

  useEffect(() => {
    if (uid) {
      // alert("effect", uid);

      const getUserAproveStatus = async () => {
        try {
          const config = {
            headers: {
              "Content-type": "application/json",
            },
          };
          //destructuring original => res.data
          const { data } = await axios.get(
            `http://localhost:9090/api/elearning/admin/aprovestatus/${uid}`,
            config
          );

          setAproveStatus(data);

          console.log("status", aproveStatus);
        } catch (error) {
          console.log(error);
        }
      };

      getUserAproveStatus();
    }
  }, [uid]);

  return (
    <>
      {/* {aproveStatus === "no"
        ? alert("To create new courses, please get approve first")
        : ""} */}
      <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 sidebar">
        <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
          <a
            href="/"
            class="d-flex align-items-center pt-5 mb-md-0 me-md-auto  text-decoration-none"
          >
            <span class="fs-5 d-none d-sm-inline"></span>
          </a>
          <ul
            class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start "
            id="menu"
          >
            <li class="nav-item mt-2">
              <a href="#" class="nav-link align-middle px-0">
                <i class="fa fa-home" aria-hidden="true"></i>

                <span class="ms-1 d-none d-sm-inline">Teacher Dashboard</span>
              </a>
            </li>
            {aproveStatus === "yes" ? (
              <>
                <li>
                  <a
                    href="#submenu3"
                    data-bs-toggle="collapse"
                    class="nav-link px-0 align-middle"
                  >
                    <i class="fa fa-user" aria-hidden="true"></i>
                    <span class="ms-1 d-none d-sm-inline">
                      Manage Tutorials
                    </span>
                    <i class="fa fa-angle-down " aria-hidden="true"></i>
                  </a>
                  <ul
                    class="collapse nav flex-column ms-1 pl-5"
                    id="submenu3"
                    data-bs-parent="#menu"
                    // style={{ backgroundColor: "#57b960" }}
                  >
                    <li class="w-100 ml-2">
                      <Link to="/instruct/tutorial" class="nav-link px-2">
                        <i
                          class="fa fa-arrow-right px-1 "
                          aria-hidden="true"
                        ></i>
                        <span class="d-none d-sm-inline">Create Tutorial</span>
                      </Link>
                    </li>
                    <li class="w-100 ml-2">
                      <Link to="/instruct/videoup" class="nav-link px-2">
                        <i
                          class="fa fa-arrow-right px-1"
                          aria-hidden="true"
                        ></i>
                        <span class="d-none d-sm-inline">Upload Videos</span>
                      </Link>
                    </li>
                    <li class="w-100 ml-2">
                      <Link to="/instruct/fileup" class="nav-link px-2">
                        <i
                          class="fa fa-arrow-right px-1"
                          aria-hidden="true"
                        ></i>
                        <span class="d-none d-sm-inline">Upload Files</span>
                      </Link>
                    </li>
                    <li class="w-100 ml-2">
                      <Link to="/instruct/tutorial" class="nav-link px-2">
                        <i
                          class="fa fa-arrow-right px-1"
                          aria-hidden="true"
                        ></i>
                        <span class="d-none d-sm-inline">Create Tutorial</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/actions" class="nav-link px-2">
                        <i
                          class="fa fa-arrow-right px-1"
                          aria-hidden="true"
                        ></i>
                        <span class="d-none d-sm-inline">Actions</span>
                      </Link>
                    </li>
                  </ul>
                </li>

                <li>
                  <a href="#" class="nav-link px-0 align-middle">
                    <i class="fa fa-inr" aria-hidden="true"></i>

                    <span class="ms-1 d-none d-sm-inline ">Revenue</span>
                  </a>
                </li>
              </>
            ) : (
              ""
            )}

            {aproveStatus === "" ? (
              <li>
                <Link to="/instruct/approve" class="nav-link px-0 align-middle">
                  <i class="fa fa-check" aria-hidden="true"></i>

                  <span class="ms-1 d-none d-sm-inline ">Get Approve</span>
                </Link>
              </li>
            ) : (
              console.log("aprove,", aproveStatus)
            )}

            <li>
              <a
                href="#submenu2"
                data-bs-toggle="collapse"
                class="nav-link px-0 align-middle "
              >
                <i class="fa fa-bell" aria-hidden="true"></i>
                <span class="ms-1 d-none d-sm-inline">Announcements</span>
              </a>
              <ul
                class="collapse nav flex-column ms-1"
                id="submenu2"
                data-bs-parent="#menu"
              ></ul>
            </li>
            {/* <li>
              <a
                href="#submenu3"
                data-bs-toggle="collapse"
                class="nav-link px-0 align-middle"
              >
                <i class="fa fa-user" aria-hidden="true"></i>
                <span class="ms-1 d-none d-sm-inline">Manage Profile</span>{" "}
              </a>
              <ul
                class="collapse nav flex-column ms-1"
                id="submenu3"
                data-bs-parent="#menu"
              >
                <li class="w-100">
                  <a href="#" class="nav-link px-0">
                    {" "}
                    <span class="d-none d-sm-inline">Product</span> 1
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link px-0">
                    {" "}
                    <span class="d-none d-sm-inline">Product</span> 2
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link px-0">
                    {" "}
                    <span class="d-none d-sm-inline">Product</span> 3
                  </a>
                </li>
                <li>
                  <a href="#" class="nav-link px-0">
                    {" "}
                    <span class="d-none d-sm-inline">Product</span> 4
                  </a>
                </li>
              </ul>
            </li> */}
          </ul>
          <hr />
          {/* <div class="dropdown pb-4">
            <a
              href="#"
              class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              id="dropdownUser1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://github.com/mdo.png"
                alt="hugenerd"
                width="30"
                height="30"
                class="rounded-circle"
              />
              <span class="d-none d-sm-inline mx-1">user</span>
            </a>
            <ul class="dropdown-menu dropdown-menu-dark text-small shadow">
              <li>
                <a class="dropdown-item" href="#">
                  New project...
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Sign out
                </a>
              </li>
            </ul>
          </div> */}
        </div>
      </div>
      <div class="col py-3">
        <div class="row mt-5">
          <div class="col-xl-3 col-sm-6 py-2">
            <div class="card bg-success text-white h-100">
              <div
                class="card-body bg-success"
                style={{ backgroundColor: "#57b960" }}
              >
                <div class="rotate">
                  <i class="fa fa-user fa-4x"></i>
                </div>
                <h6 class="text-uppercase">Total Enrollments</h6>
                <h1 class="display-4">{totalEnroll}</h1>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 py-2">
            <div class="card text-white bg-danger h-100">
              <div class="card-body bg-danger">
                <div class="rotate">
                  <i class="fa fa-list fa-4x"></i>
                </div>
                <h6 class="text-uppercase">Total Courses</h6>
                <h1 class="display-4">{coursesCnt}</h1>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 py-2">
            <div class="card text-white bg-info h-100">
              <div class="card-body bg-info">
                <div class="rotate">
                  <i class="fa fa-inr fa-4x"></i>
                </div>
                <h6 class="text-uppercase">Total Earnings</h6>
                <h1 class="display-4">{totalEarn}</h1>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-sm-6 py-2">
            <div class="card text-white bg-warning h-100">
              <div class="card-body">
                <div class="rotate">
                  <i class="fa fa-share fa-4x"></i>
                </div>
                <h6 class="text-uppercase">Shares</h6>
                <h1 class="display-4">36</h1>
              </div>
            </div>
          </div>
        </div>

        <hr />
        {aproveStatus === "" ? (
          <marquee width="100%" behavior="scroll" bgcolor="pink">       {/* scroll strip */}
            Please get approved first, to be an instructor on this platform.
          </marquee>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default InstructorDashboard;
