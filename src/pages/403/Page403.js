import React from "react";
import { Container } from "react-bootstrap";

const Page403 = () => {
  return (
    <div>
      <Container className="d-flex flex-column vh-100 justify-content-center align-items-center">
        <p className="fs-100">
          4<span className="mainColor">0</span>3
        </p>
        <h2>FORBIDDEN</h2>
        <p className="fs-800">
          {" "}
          ACCESS TO THIS RESOURCE ON THE SERVER IS DENIED!
        </p>
      </Container>
    </div>
  );
};

export default Page403;
