import React, { useState } from "react";
import {  Container, Row } from "react-bootstrap";
import SCHEME_DATA from "./SCHEME_DATA.json";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import BasicTable from "../../components/BasicTable";
import Header from "../../components/Header";
import DeleteModel from "../../components/DeleteModel";

const Scheme = () => {
  const navigate = useNavigate();
  const handleNavigateAddForm = () => navigate("/schemeAddForm");
  const [deleteShow, setDeleteShow] = useState(false);

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const deleteHandleShow = () => {
    setDeleteShow(true);
  };

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: 'Id'
  },
  {
      Header: 'NAME',
      accessor: 'Name'
  },
  {
      Header: 'ROLE',
      accessor: 'Role'
  },
  {
      Header: 'START DATE',
      accessor: 'Start Date'
  },
  {
      Header: 'END DATE',
      accessor: 'End Date'
  },
  {
      Header: 'STATUS',
      accessor: 'Status'
  },
  {
      Header: 'REASON',
      accessor: 'Reason'
  },
    {
      Header: 'ACTIONS',
      accessor: 'action',
      Cell: () => (
        <div className="d-flex align-items-center justify-content-center flex-row">
          <Link to="/schemeEditForm">
            
              <FaEdit size={20} color="#00C9E5" />
           
          </Link>
          <span  className="m-1" onClick={deleteHandleShow}>
            <MdDelete size={20} color="#00C9E5" />
          </span>
        </div>
      )
    }
  ];

  return (
    <div>
      <Container fluid className="">
        <Row>
          <Header
            ONCLICK={handleNavigateAddForm}
            HEADING="Schemes"
            BUTTON_NAME="Add Scheme"
          />
        </Row>
        <hr className="bg-secondary"/>

        <Row className="">
          <BasicTable COLUMNS={COLUMNS} MOCK_DATA={SCHEME_DATA} />
        </Row>
      </Container>
      <DeleteModel
        DELETESTATE={deleteShow}
        ONCLICK={deleteHandleClose}
        DESCRIPTION="Scheme"
        DELETETITLE="Schemes"
      />
    </div>
  );
};

export default Scheme;