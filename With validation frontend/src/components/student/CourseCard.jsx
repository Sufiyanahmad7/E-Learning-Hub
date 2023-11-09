import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { increment, reset } from "../../actions/cartAction";
// BrowseCategoryPage called CourseCard component
function CourseCard({ prop }) {
  // console.log(prop);
  const dispatch = useDispatch();
  // let txt = prop.courseTitle;
  // let arr = txt.split(" ");
  // let pName = arr[0].toLowerCase()


  const [isDisable, setIsDisable] = useState(false);

  // const [cartCoursesList, setCartCoursesList] = useState([]);
  // const [counter, setCounter] = useState(0);

  // const result = [];
  // let temp = []; //holding list of previous items

  // const handleBuyCourse = (item) => {
  //   result.push(item);

  //   temp = JSON.parse(localStorage.getItem("Cart"));

  //   if (temp === null || temp === undefined) {
  //     console.log("in if");
  //     localStorage.setItem("Cart", JSON.stringify(result));
  //     // console.log("arr", [...temp, item]);
  //   }
  //   if (temp != null || temp != undefined) {
  //     let prevArr = [];
  //     let currArr = [];

  //     //destructure to new arr
  //     //push item to new arr alogn with fetched arr
  //     currArr = [...temp, item];
  //     console.log("curr arr: ", currArr);

  //     //set with updated arr(cart list)
  //     localStorage.setItem("Cart", JSON.stringify(currArr));
  //   }

  //   // const arr = [];
  //   // const temp = {};
  //   //set buyed(current selected) course to local storage
  //   // temp.courseId = prop.courseId;
  //   // temp.courseDesc = prop.courseDesc;
  //   // temp.coursePrice = prop.coursePrice;
  //   // temp.courseThumbPath = prop.courseThumbPath;
  //   // temp.courseTitle = prop.courseTitle;
  //   // temp.courseType = prop.courseType;
  //   // temp.introVideoPath = prop.introVideoPath;
  //   // temp.courseCategory = prop.courseCategory;
  //   // temp.userID = prop.userID;

  //   // arr.push(temp);

  //   dispatch(increment()); //incment cart count
  // };

  const result = [];
  let temp = []; //holding list of previous items

  const handleBuyCourse = (item) => {
    setIsDisable(true);
    item.isDisabled = true;

    console.log(item);

    result.push(item);

    temp = JSON.parse(localStorage.getItem("Cart"));

    if (temp === null || temp === undefined) {
      console.log("in if");
      localStorage.setItem("Cart", JSON.stringify(result));   // convert into string and set it into item 
    }
    if (temp != null || temp != undefined) {
      let prevArr = [];
      let currArr = [];

      //destructure to new arr
      //push item to new arr alogn with fetched arr
      currArr = [...temp, item];
      console.log("curr arr: ", currArr);

      //set with updated arr(cart list)
      localStorage.setItem("Cart", JSON.stringify(currArr));
    }

    dispatch(increment()); //increment cart count (increment Action is triggred)
  };

  useEffect(() => {
    var list = JSON.parse(localStorage.getItem("Cart"));
    if (list === null || list.length < 1) {
      dispatch(reset());
    }
  }, [handleBuyCourse]);

  return (
    <>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="card" style={{ borderRadius: "15px" }}>
          <div
            className="bg-image hover-overlay ripple ripple-surface ripple-surface-light"
            data-mdb-ripple-color="light"
          >
            {/* Image you can change from here */}
            {/*  // src={require(`../../assets/images/${pName}.jpg`)}   */}
            <img
               src="https://cdn.elearningindustry.com/wp-content/uploads/2021/08/Top-5-Benefits-Of-eLearning-Education.png"
          
              style={{
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
              }}
              className="img-fluid"
              alt="Elearning"
               
            />
            <a href="#!">
              <div className="mask"></div>
            </a>
          </div>
          <div className="card-body pb-0">
            <div className="d-flex justify-content-between">
              <div>
                <p>
                  <a href="#!" className="text-dark">
                    {prop.courseTitle}
                  </a>
                </p>
                <p className="small text-muted">{prop.courseCategory}</p>
              </div>
              <div>
                {/* <div className="d-flex flex-row justify-content-end mt-1 mb-4 text-danger">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                </div> */}
                <p className="small">
                  Rated <span className="text-danger">4.0/5</span>
                </p>
              </div>
            </div>
          </div>
          <hr className="my-0" />
          <div className="card-body pb-0">
            <div className="d-flex justify-content-between">
              <p>
                <a href="#!" className="text-dark">
                  ₹{prop.coursePrice}
                </a>
              </p>
              <p className="text-success">{prop.courseType}</p>
            </div>
          </div>
          <hr className="my-0" />
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center pb-2 mb-1">
              {/* <a href="#!" className="text-dark fw-bold">
                Cancel
              </a> */}
              <button
                type="button"
                className="btn btn-primary"
                // onClick={handleBuyCourse}
                disabled={
                  prop.isDisabled === true ? true : isDisable ? true : false
                }
                onClick={() => {
                  handleBuyCourse(prop);
                }}
              >
                {prop.courseType === "paid" ? "Buy now" : "Enroll now"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseCard;
