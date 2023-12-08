import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";

const Header = (props) => {
  return (
    <div>
      <Row className="d-flex flex-row justify-content-between align-items-center  mb-2">
        <Col className="d-flex flex-column flex-wrap-wrap align-content-center">
          <h4 className="fw-bold">{props.HEADING}</h4>
        </Col>
        <Col className="d-flex flex-row flex-wrap-wrap justify-content-end align-items-center">
          <Button
            variant="primary"
            className="d-lg-none d-xxl-none d-flex d-sm-flex d-md-flex rounded fw-bold "
            onClick={props.ONCLICK}
          >
            <FaPlus size={18} className=" fw-bold" />
          </Button>
          <Button
            variant="primary"
            className="d-lg-block d-xxl-block d-none d-sm-none rounded fw-bold "
            onClick={props.ONCLICK}
          >
            <FaPlus size={20} className="mr-2 fw-bold" />
            {props.BUTTON_NAME}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
