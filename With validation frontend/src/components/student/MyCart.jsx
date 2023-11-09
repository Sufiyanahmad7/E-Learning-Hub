import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Form, FormGroup, Input, Label, Table } from "reactstrap";
import { decrement, reset } from "../../actions/cartAction";

function MyCart() {
  // const navigator = useNavigate();
  // const dispatch = useDispatch();

  // const [totalAmt, setTotalAmt] = useState(0);
  // const [currentListItems, setCurrentListItems] = useState([]);
  // const [removeItem, setRemoveItem] = useState("");

  // //fetch username
  // const userName = JSON.parse(localStorage.getItem("userInfo"));

  // let temp = [];
  // temp = JSON.parse(localStorage.getItem("Cart"));

  // //get total amt
  // useEffect(() => {
  //   let sum = 0;
  //   setCurrentListItems([...temp]);

  //   const getTotal = () => {
  //     temp.map((el) => {
  //       sum = sum + parseFloat(el.coursePrice);
  //     });

  //     setTotalAmt(sum);
  //   };

  //   getTotal();
  // }, []);

  // //handle payment
  // const paymentSubmitHandler = () => {
  //   let orderData = {
  //     userName: userName,
  //     total: totalAmt,
  //     orderList: temp,
  //   };

  //   //send list userid, total, purchased items list

  //   navigator("/student/confirm");

  //   // reset cart
  //   dispatch(reset());
  // };

  // const handleRemoveCartItem = (courseId) => {
  //   console.log("remove cart clicked");
  //   //update current cart
  //   var ar = [];
  //   ar = currentListItems.filter((i) => i.courseId !== courseId);
  //   console.log("filter :", ar);
  //   //dispatch(decrement());
  // };

  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [totalAmt, setTotalAmt] = useState(0);
  const [shipping, setShipping] = useState(200);
  const [currentListItems, setCurrentListItems] = useState([]);

  //fetch username
  const userName = JSON.parse(localStorage.getItem("userInfo"));

  let temp = [];      // declare array 
  temp = JSON.parse(localStorage.getItem("Cart"));      // storing item in temp from localStorage

  useEffect(() => {
    let sum = 0;
     // if cart is not null then  set item list (all th previous item in it )  
    if (temp != null) {
      setCurrentListItems([...temp]);

      // calculating total amount 
      const getTotal = () => {
        if (currentListItems.length === 0) {  // if list of purchased item is empty then set total amount =0 
          setTotalAmt(0);
        } else {           // if item are present then calculate amount 
          currentListItems.map((el) => {  
            sum = sum + parseFloat(el.coursePrice);
          });

          setTotalAmt(sum);  // after calculating amount set into totalAmt
        }
      };

      getTotal();      // function is called to calculate total Amount
    }
  }, [currentListItems]);

  //------------------------------------- handle payment ------------------------------------------
  
  const paymentSubmitHandler = () => {
    //send list userid, total, purchased items list
    const postOrderData = async () => {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        //destructuring original => res.data
        const { data } = await axios.post(
          "http://localhost:9090/api/elearning/user/order",
          {
            userName: userName,
            totalAmt: totalAmt,
            cources: currentListItems,
          },
          config
        );

        //display message
        alert(data);
      } catch (error) {
        console.log(error);
      }
    };

    postOrderData();

    // reset count and reset cart
    dispatch(reset());
    localStorage.setItem("Cart", JSON.stringify([]));
    setTotalAmt(0);

    navigator("/student/confirm");

    // reset cart
  };
// ---------------------------------------- handle Remove Cart Item ------------------------------------- 

  const counter = useSelector((state) => state.userCartCounter);

  const handleRemoveCartItem = (courseId) => {
    console.log(courseId);
    // alert("id", item.courseId);
    // alert("Are you sure!", courseId);
    if (counter != 0) {
      var ar = currentListItems.filter((val) => val.courseId != courseId);
      console.log(ar);
      localStorage.setItem("Cart", JSON.stringify(ar));
      setCurrentListItems(
        currentListItems.filter((val) => val.courseId != courseId)
      );

      dispatch(decrement());
    }
  };

  return (
    <>
      <section
        class="h-100 gradient-custom"
        style={{ backgroundColor: "#eeeeee" }}
      >
        <div class="container py-5">
          <div class="row d-flex justify-content-center my-4">
            <div class="col-md-8">
              <div className="card mb-4">
                <div className="card-body p-4">
                  <div className="row align-items-center">
                    <Table borderless>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Title</th>
                          <th>Type</th>
                          <th>Price</th>
                          <th>Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentListItems.map((item, index) => {
                          return (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td>{item.courseTitle}</td>
                              <td>{item.courseType}</td>
                              <td>{item.coursePrice}</td>
                              <td>
                                <span>
                                  <i
                                    className="fa fa-times mx-4"
                                    style={{
                                      color: "#FF0000",
                                      cursor: "pointer",
                                    }}
                                    aria-hidden="true"
                                    onClick={() =>
                                      handleRemoveCartItem(item.courseId)
                                    }
                                  ></i>
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                    {/* <hr /> */}

                    {/* <div className="col-md-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Products/1.webp"
                        className="img-fluid"
                        alt="Generic placeholder image"
                      />
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="card mb-4">
                <div class="card-header py-3 text-center">
                  <h5 class="mb-0">Summary</h5>
                </div>
                <div class="card-body">
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                      <div>
                        <strong>Total amount</strong>
                      </div>
                      <span className="text-dark">
                        <strong>{totalAmt}</strong>
                      </span>
                    </li>
                  </ul>

                  {/* <button
                    type="button"
                    class="btn btn-primary btn-lg btn-block"
                  >
                    Go to checkout
                  </button> */}
                </div>
              </div>
              <div class="card mb-4">
                <div class="card-header py-3 text-center">
                  <h5 class="mb-0">Payment</h5>
                </div>
                <div class="card-body">
                  <Form onSubmit={paymentSubmitHandler}>
                    <FormGroup>
                      <Label for="exampleEmail">Cardholder's Name</Label>
                      <Input
                        type="text"
                        name="email"
                        id="exampleEmail"
                        placeholder="Enter cardholer name"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEmai">Card Number</Label>
                      <Input
                        type="text"
                        id="exampleEmai"
                        placeholder="Enter card number"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEma">Expire</Label>
                      <Input
                        type="text"
                        name="email"
                        id="exampleEma"
                        placeholder="Enter expiry date"
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="exampleEm">CVV</Label>
                      <Input
                        type="text"
                        name="email"
                        id="exampleEm"
                        placeholder="Enter cvv"
                        required
                      />
                    </FormGroup>

                    <Button
                      className="btn btn-success btn-lg btn-block"
                      type="submit"
                    >
                      Pay
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MyCart;
