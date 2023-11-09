import axios from "axios";
import {
  USER_ADD_CHAPTER_FAIL,
  USER_ADD_CHAPTER_REQUEST,
  USER_ADD_CHAPTER_SUCCESS,
  USER_ADD_COURSE_FAIL,
  USER_ADD_COURSE_REQUEST,
  USER_ADD_COURSE_SUCCESS,
  USER_ADD_SUBTOPIC_FAIL,
  USER_ADD_SUBTOPIC_REQUEST,
  USER_ADD_SUBTOPIC_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../constants/userConstants";
import { cartCntr, reset } from "./cartAction";

// ------------------------------- Login Action -------------------------------------

// here we stored information about user in localStorages
export const login = (userName, pass) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    //destructuring original => res.data
    // checking values of username and password in database if find then login is successful
    const { data } = await axios.post(
      "http://localhost:9090/api/elearning/login",
      { userName: userName, pass: pass },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    if (data === "") {
      alert("please enter valid credentials");
    }
    localStorage.setItem("userInfo", JSON.stringify(data));

    // User Role -> Admin , Instructor , Student
    {
      const { data } = await axios.post(
        "http://localhost:9090/api/elearning/rolename",
        { userName: userName },
        config
      );
      localStorage.setItem("userRole", JSON.stringify(data));
    }


    //set userid
    {
      const { data } = await axios.post(
        "http://localhost:9090/api/elearning/getuid",
        { userName: userName },
        config
      );
      localStorage.setItem("userRoleId", JSON.stringify(data));
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
//------------------------------------ Logout action ----------------------------------------
export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("userRoleId");
  // dispatch(cartCntr(0));
  dispatch(reset());     //  call to RegisterScreen -> reset() 
  dispatch({ type: USER_LOGOUT });
};

// ----------------------------------- Register Action ------------------------------------
export const register =
  (userName, firstName, lastName, email, pass, address, phoneNo, category) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:9090/api/elearning/register",
        {
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          email: email,
          pass: pass,
          address: address,
          phoneNo: phoneNo,
          category: category,
        },
        config
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,     // data = userName
      });

      alert("Username Registered Successfully.", data);
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  //--------------------------------------- Add Course -------------------------------------
export const addcourse =
  (
    courseTitle,
    courseDesc,
    courseType,
    coursePrice,
    courseThumbPath,
    introVideoPath,
    user,
    courseCategory
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_ADD_COURSE_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:9090/api/elearning/addcourse",
        {
          courseTitle: courseTitle,
          courseDesc: courseDesc,
          courseType: courseType,
          coursePrice: coursePrice,
          courseThumbPath: courseThumbPath,
          introVideoPath: introVideoPath,
          user: user,
          courseCategory: courseCategory,
        },
        config
      );
      if (data) {
        alert(data);
      } else {
        alert("Please try again");
      }

      dispatch({
        type: USER_ADD_COURSE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_ADD_COURSE_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  //--------------------------------------  Add Chapter -------------------------------------
export const addchapter =
  (
    chapterIndexNo,
    chapterTitle,
    chapterDesc,
    chapterThumbPath,
    chapterFilePath,
    chapterVideoPath,
    course
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_ADD_CHAPTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:9090/api/elearning/addchapter",
        {
          chapterIndexNo: chapterIndexNo,
          chapterTitle: chapterTitle,
          chapterDesc: chapterDesc,
          chapterThumbPath: chapterThumbPath,
          chapterFilePath: chapterFilePath,
          chapterVideoPath: chapterVideoPath,
          course: course,
        },
        config
      );
      if (data) {
        alert(data);
      } else {
        alert("Please try again");
      }

      dispatch({
        type: USER_ADD_CHAPTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_ADD_CHAPTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

  //------------------------------------------- Add Sub-Topic --------------------------------------- 
export const addsubtopic =
  (
    subtIndexNo,
    subtTitle,
    subtDesc,
    subtThumbPath,
    subtFilePath,
    subtVideoPath,
    chapter,
    courseid
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_ADD_SUBTOPIC_REQUEST,
      });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:9090/api/elearning/addsubtopic",
        {
          subtIndexNo: subtIndexNo,
          subtTitle: subtTitle,
          subtDesc: subtDesc,
          subtThumbPath: subtThumbPath,
          subtFilePath: subtFilePath,
          subtVideoPath: subtVideoPath,
          chapter: chapter,
          courseid: courseid,
        },
        config
      );
      if (data) {
        alert(data);
      } else {
        alert("Please try again");
      }

      dispatch({
        type: USER_ADD_SUBTOPIC_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_ADD_SUBTOPIC_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };
