import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import BasicTable from "../../components/BasicTable";
import Header from "../../components/Header";
import DeleteModel from "../../components/DeleteModel";
import Loader from "../loader/Loader";
import {
  useGetSchemeQuery,
  useDeleteSchemeMutation,
} from "../../redux/api/SchemeApi";
import { toast } from "react-toastify";

const Scheme = () => {
  const navigate = useNavigate();
  const [deleteShow, setDeleteShow] = useState(false);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [idToDelete, setIdToDelete] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { data: getSchemeData, isLoading } = useGetSchemeQuery(currentPage);
  const [deleteSchemeMutation] = useDeleteSchemeMutation();
  const handleNavigateAddForm = () => navigate("/admin/add-scheme");
console.log(getSchemeData);
  useEffect(() => {
    if (getSchemeData && getSchemeData.data) {
      setData(getSchemeData.data);
      setTotalPages(getSchemeData.totalPages);
      setCurrentPage(getSchemeData.currentPage);
    }
  }, [getSchemeData, currentPage]);

  const deleteHandleClose = () => {
    setDeleteShow(false);
  };

  const deleteHandleShow = (id) => {
    setIdToDelete(id);
    console.log(id);
    setDeleteShow(true);
  };

  const delTimeSheetData = async () => {
    try {
      const response = await deleteSchemeMutation(idToDelete);
      setDeleteShow(false);
      setIdToDelete("");
      if (response.error.originalStatus === 200) {
        toast.success(response.error.data, { autoClose: 1000 });
      } else {
        toast.error(response.error.data, { autoClose: 1000 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error");
    }
  };

  const COLUMNS = [
    {
      Header: "ID",
      accessor: (d, i) => i + 1,
    },
    {
      Header: "NI Provider",
      accessor: "niProvider",
      width: 'auto', // Set width to auto or adjust as needed
      minWidth: 100,
    
    },
    {
      Header: "Schemes for PWDS",
      accessor: "domainDescription",
      width: 'auto', // Set width to auto
    minWidth: 100,
    },
    {
      Header: "Shemes",
      accessor: "schemeName",
    },
    {
      Header: "Eligible",
      accessor: "genderEligibility",
    },
   
    {
      Header: "Website Link",
      accessor: "comments",
      Cell: props => (
        <a href={`${props.value}`} target="_blank" rel="noopener noreferrer">
          {props.value}
        </a>
      )    },
    {
      Header: "State",
      accessor: "implementedBy",
    },
    {
      Header: "Disablities",
      accessor: "eligibleDisabilities",
    },
    {
      Header: "Disablitiy Percentage",
      accessor: "disabilityPercentage",
    },
    {
      Header: "Annual Income",
      accessor: "annualIncome",
    },
    {
      Header: " Age",
      accessor: "age",
    },
    {
      Header: "Email Address",
      accessor: "emailAddress",
    },
    {
      Header: "ACTIONS",
      accessor: "action",
      Cell: (props) => {
        const rowIdx = props.row.original._id;

        return (
          <div className="d-flex align-items-center justify-content-center flex-row">
            <Link to={`/admin/edit-scheme/${rowIdx}`}>
              <FaEdit size={20} color="#5046e5" />
            </Link>
            <span className="m-1" onClick={() => deleteHandleShow(rowIdx)}>
              <MdDelete size={20} color="#5046e5" />
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <>
      {!isLoading ? (
        <>
          <Container fluid className="my-4">
            <Row>
              <Col  className="m-4">
                <Header
                  ONCLICK={handleNavigateAddForm}
                  HEADING="Schemes"
                  BUTTON_NAME="Add Scheme"
                  headingClassName="text-center text-md-start m-md-4 m-xl-2"
                />
              </Col>
            </Row>
            <hr className="bg-primary" />
            <Row>
              <Col xs={12} className="table-responsive m-md-4 m-xl-2">
                <BasicTable
                  COLUMNS={COLUMNS}
                  MOCK_DATA={data}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                />
              </Col>
            </Row>
          </Container>
          <DeleteModel
            DELETESTATE={deleteShow}
            ONCLICK={deleteHandleClose}
            YES={delTimeSheetData}
            DESCRIPTION="Scheme"
            DELETETITLE="Schemes"
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Scheme;
