import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import { getCourseCategories } from "../../data/catRoutes";

function Header() {

  let categories = getCourseCategories();

  const navigate = useNavigate();

  // const [cartCounter, setCartCounter] = useState(0);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const roleInfo = localStorage.getItem("userRole")
    ? JSON.parse(localStorage.getItem("userRole"))
    : {};

  // const userCartCounter = useSelector((state) => state.userCartCounter);
  // const { cartCounter } = userCartCounter;

  const counter = useSelector((state) => state.userCartCounter);

  //let buyedCourse = localStorage.getItem("buyedCourseList");
  useEffect(() => {
    // let buyedCourse = localStorage.getItem("cartCounter");
    // if (buyedCourse != null) {
    //   setCartCounter(buyedCourse.length);
    // }
  }, []);

  const dispatch = useDispatch();

  const logoutHandle = () => {
    localStorage.clear();
    dispatch(logout());
    navigate("/");
  };
  const [uid, setUid] = useState();
  const [aproveStatus, setAproveStatus] = useState("no");



  

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

      const d = await axios.get(
        `http://localhost:9090/api/elearning/admin/aprovestatus/${data}`,

        config
      );

      setAproveStatus(d.data);
      console.log(d);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  getIdByName();
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
    <header>
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <span>E-Learning</span>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  About Us
                </Link>
              </li>

              {userInfo && roleInfo === "Admin" ? (
                <li className="nav-item">
                  <Link className="nav-link " aria-current="page" to="/admin">
                    Dashboard
                  </Link>
                </li>
              ) : (
                ""
              )}

              {userInfo && roleInfo === "Instructor" ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to="/instructor"
                    >
                      Dashboard
                    </Link>
                  </li>
                  {aproveStatus==="yes"? <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Manage Modules
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <Link
                          className="dropdown-item"
                          to={"/instruct/tutorial"}
                        >
                          Add new course
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to={"/instruct/tutorial/topic"}
                        >
                          Add chapter
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to={"/instruct/tutorial/subtopic"}
                        >
                          Add subtopic
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to={"/instruct/videoup"}
                        >
                          Upload Video
                        </Link>
                      </li>

                      {/* <li>
                        <Link className="dropdown-item" to={"/instruct/fileup"}>
                          Upload File
                        </Link>
                      </li> */}
                    </ul>
                  </li>:""}
                 
                </>
              ) : (
                <></>
              )}

              {userInfo && roleInfo === "Student" ? (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link "
                      aria-current="page"
                      to="/student"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Browse Courses
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      {categories.map((category) => (
                        <Link
                          className="dropdown-item"
                          to={`/student/browse/${category.courseCatId}`}
                          key={category.courseCatId}
                        >
                          {category.courseCatName}
                        </Link>
                      ))}
                      {/* <li>
                      <Link className="dropdown-item" to="/student/browse">
                        Web Developement
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/student/browse">
                        Data Science
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/student/browse">
                        Machine Learning
                      </Link>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/student/browse">
                        Blockchain
                      </Link>
                    </li> */}
                    </ul>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>

            {userInfo && roleInfo === "Student" ? (
              <>
                <Link to={"/student/cart"} className="mx-2">
                  <i
                    className="fa fa-shopping-cart fa-2x"
                    aria-hidden="true"
                  ></i>
                  <span class="badge rounded-pill badge-notification bg-danger">
                    {counter}
                  </span>
                </Link>
              </>
            ) : (
              <></>
            )}

            {userInfo ? (
              <>
                <span className="user-name mx-2">
                  <i className="fa fa-user fa-lg mx-1" aria-hidden="true"></i>
                  Hello, &nbsp;<strong>{userInfo}</strong>
                </span>
                <button
                  className="btn btn-outline-danger my-2 my-sm-0"
                  onClick={logoutHandle}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="btn btn-outline-light m-1  my-sm-0">
                    Login
                  </button>
                </Link>

                <Link to="/register">
                  <button className="btn btn-outline-light m-1 my-sm-0">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
