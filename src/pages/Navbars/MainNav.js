import React, { useState } from "react";
import MainLogo from "../../assets/images/logo.png";
import "./MainNav.css";
import { Col, Container, Dropdown, Offcanvas, Row } from "react-bootstrap";

import { AiOutlineMenu } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import { sidebarItems } from "./SIDEMENU_DATA";
import ReactSidebar from "./ReactSidebar";

const MainNav = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleNavigateAddForm = () => setShow(true);
  const handleLogin = () => {
    localStorage.clear();
    navigate("/auth/login");
    window.location.reload();
  };

  return (
    <>
      <Container
        fluid
        className="d-flex  flex-row flex-wrap-wrap justify-content-between align-items-center  overflowX-hidden"
        style={{
          position: "sticky",
          top: "0",
          zIndex: 1000,
          backgroundColor: "#5046e5",
        }}
      >
        <Row className="d-flex flex-row flex-wrap-wrap justify-content-around align-items-center p-2">
          <Col className="d-lg-none d-xl-none d-sm-flex">
            <AiOutlineMenu
              size={25}
              onClick={handleNavigateAddForm}
              className="pointer"
            />
          </Col>
          <Col
            className="d-lg-flex d-none d-sm-none flex-row flex-wrap-wrap justify-content-between align-items-center"
            style={{ marginRight: "100px" }}
          >
            <img
              src={MainLogo}
              width={40}
              className="rounded-circle pointer"
              alt="..."
            ></img>
          </Col>
        </Row>

        <Row>
          <Col className='d-lg-none d-sm-flex flex-row flex-wrap-wrap justify-content-between"align-items-center '>
            <img
              src={MainLogo}
              width={60}
              className="rounded-circle p-2 pointer"
              alt="..."
            ></img>
          </Col>
        </Row>

        <Row className="d-flex mt-1">
          <Col className="d-lg-none d-sm-flex">
            <Dropdown>
              <Dropdown.Toggle
                className="mobile-view-dropdown"
                id="dropdown-basic"
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "white",
                }}
              >
                <BsThreeDotsVertical
                  size={25}
                  style={{ cursor: "pointer", color: "white" }}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item></Dropdown.Item>{" "}
                <Dropdown.Item onClick={handleLogin}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>

          <Col className='d-lg-flex d-none d-sm-none flex-row flex-wrap-wrap justify-content-center"align-items-center'>
            <div>
              <Dropdown>
                <Dropdown.Toggle
                  color="white"
                  id="dropdown-basic"
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "white",
                  }}
                >
                  <img
                    src="https://p7.hiclipart.com/preview/636/702/321/computer-icons-user-profile-avatar-black-man.jpg"
                    className="rounded-circle"
                    style={{ width: "30px" }}
                    alt="Avatar"
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={handleLogin}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Col>
        </Row>
      </Container>

      <Row className="d-sm-flex d-lg-none d-xl-none d-xxl-none">
        <Offcanvas scroll={true} show={show} onHide={handleClose}>
          <Offcanvas.Header className="bg-mainColor" closeButton>
            <Offcanvas.Title
              className="custom-title"
              style={{
                fontSize: "16px",
              }}
            >
              <img
                src={MainLogo}
                width={60}
                className="rounded-circle p-2"
                alt="..."
              ></img>
              Demo App
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body style={{ backgroundColor: "#313947" }}>
            <ReactSidebar onClick={handleClose} sidebarItems={sidebarItems} />
          </Offcanvas.Body>
        </Offcanvas>
      </Row>
    </>
  );
};

export default MainNav;
