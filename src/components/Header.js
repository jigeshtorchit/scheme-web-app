import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";

const Header = (props) => {
  return (
    <div>
    <Row className="d-flex flex-row justify-content-between align-items-center mt-2 mb-2">
      <Col className="d-flex flex-column flex-wrap-wrap align-content-center">
        <h4 className="fw-bold">{props.HEADING}</h4>
      </Col>
      <Col className="d-flex flex-row flex-wrap-wrap justify-content-end align-items-center">
      <Button
            variant="primary"
            className="d-lg-none d-xxl-none d-flex d-sm-flex d-md-flex rounded fw-bold m-2"
            size="sm"
            onClick={props.ONCLICK}
           >
            <FaPlus  size={25}className="m-2" />
          </Button>
          <Button
            variant="primary"
            className="d-lg-block d-xxl-block d-none d-sm-none rounded fw-bold m-2 p-2"
            size="sm"
            onClick={props.ONCLICK}
          >
            <FaPlus size={23} className="me-2 fw-bold" />
            {props.BUTTON_NAME}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
