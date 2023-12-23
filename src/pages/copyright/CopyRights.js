import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaRegCopyright } from "react-icons/fa6";

const CopyRights = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Container fluid className="bg-secondary">
      <Row>
        <Col className="d-flex flex-row align-items-center justify-content-center my-4">
          <p className="mx-2 text-light fs-6 fw-1">
            <FaRegCopyright />
          </p>
          <p className="text-light fs-6 fw-1">
            Copyright {currentYear} Saarthi – Torchit – All Right Reserved
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default CopyRights;
