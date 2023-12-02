import React from "react";
import { Outlet } from "react-router-dom";
import MainNav from "../Navbars/MainNav";
import Sidebar from "../Navbars/Sidebar";
import { Col, Container, Row } from "react-bootstrap";

export default function DashboardLayout() {
  return (
    <div>
      <MainNav />
      <Container fluid>
        <Row>
          <Col lg={2} xxl={2} xl={2}>
            <Sidebar />
          </Col>
          <Col lg={10} xxl={10} xl={10} md={12} sm={12}>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
