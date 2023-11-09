import React from "react";

import { UncontrolledCarousel } from "reactstrap";

// const Carousel = () => (
//   <UncontrolledCarousel
//     items={[
//       {
//         altText: "Slide 1",
//         caption: "Slide 1",
//         key: 1,
//         src: require("../../assets/1.jpg"),
//       },
//       {
//         altText: "Slide 2",
//         caption: "Slide 2",
//         key: 2,
//         src: require("../../assets/2.jpg"),
//       },
//       {
//         altText: "Slide 3",
//         caption: "Slide 3",
//         key: 3,
//         src: require("../../assets/5.jpg"),
//       },
//     ]}
//   />
// );

function Carousel() {
  return (
    <header>
      <div
        id="carouselExampleInterval"
        class="carousel slide"
        data-bs-ride="carousel"      // must used when we have multiple carousel elements in one single page
        style={{ filter: "brightness(50%)", height: "80%" }}
      >
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="2000">
            <img
              src={require("../../assets/1.jpg")}
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item" data-bs-interval="1000">
            <img
              src={require("../../assets/5.jpg")}
              class="d-block w-100"
              alt="..."
            />
          </div>
          <div class="carousel-item" data-bs-interval="400">
            <img
              src={require("../../assets/5.jpg")}
              class="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </header>
  );
}

export default Carousel;
