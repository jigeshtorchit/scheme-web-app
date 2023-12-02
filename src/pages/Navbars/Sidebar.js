import React from "react";
import { Container } from "react-bootstrap";
import ReactSidebar from "./ReactSidebar";
import { sidebarItems } from "./SIDEMENU_DATA";

const Sidebar = () => {
  return (
    <div className="rounded position-fixed ">
      <Container
        fluid
        className="d-sm-none  sidebar d-md-none d-lg-block d-xxl-block d-xl-block  justify-content-start align-items-start d-none "
        style={{
          backgroundColor: "#fff",
          height: "100vh",
          width: "90%",
          overflowY: "auto",
          marginLeft: "-30px",
        }}
      >
        <ReactSidebar sidebarItems={sidebarItems} />
      </Container>
    </div>
  );
};

export default Sidebar;
