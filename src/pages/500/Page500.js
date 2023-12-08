import React from "react";
import BasicButton from "../../components/BasicButton";
import { Container } from "react-bootstrap";
import { AiOutlineArrowLeft } from "react-icons/ai";
const Page500 = () => {
  return (
    <div>
      <Container className="d-flex flex-column vh-100 justify-content-center align-items-center">
        <p className="fs-100">
          5<span className="mainColor">0</span>0
        </p>
        <h2>Server Error</h2>
        <p className="fs-800"> SORRY, SOMETHING WENT WRONG</p>
        <BasicButton icon={AiOutlineArrowLeft} label={"Go Back"} />
      </Container>
    </div>
  );
};
export default Page500;
