import React from "react";
import { Container } from "reactstrap";
import "./orderConfr.css";

function OrderConfirmation() {
  return (
    <Container className="my-5" style={{ height: "65vh" }}>
      <Container className="py-5 text-center">
        <i className="fa fa-check fa-4x text-success" aria-hidden="true"></i>

        <h1 className="text-success">Thank you.</h1>
        <h2>Order completed.</h2>

        <h6>Purchasing details has been send on registered mail.</h6>
      </Container>
    </Container>
  );
}

export default OrderConfirmation;
