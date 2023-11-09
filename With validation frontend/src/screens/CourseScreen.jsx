import React from "react";
import { useParams } from "react-router-dom";
import Course from "../components/course/Course";

function CourseScreen() {
  // const { cId } = useParams();

  // alert(cId);

  return (
    <div class="container">
      <div class="row flex-nowrap">
        <Course />
      </div>
    </div>
  );
}

export default CourseScreen;
