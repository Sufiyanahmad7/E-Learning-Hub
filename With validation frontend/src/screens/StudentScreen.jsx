import React from "react";
import StudentDashboard from "../components/student/StudentDashboard";
import "./common.css";

function StudentScreen() {
  return (
    <div class="container-fluid ">
      <div class="row flex-nowrap">
        <StudentDashboard />
      </div>
    </div>
  );
}

export default StudentScreen;
