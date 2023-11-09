import React from "react";
import Typewriter from "typewriter-effect";

const Welcome = () => {
  return (
    <div className="welcome">
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .typeString("Welcome To E-Learning Platform.")
            .start();
        }}
      />
    </div>
  );
};

export default Welcome;
