import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import BasicTable from "../../components/BasicTable";
import Header from "../../components/Header";
import DeleteModel from "../../components/DeleteModel";
import Loader from '../loader/Loader'
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
  const handleNavigateAddForm = () => navigate("/schemeAddForm");
 
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
        toast.success(response.error.data,{autoClose:1000});
      } else {
        toast.error(response.error.data,{autoClose:1000});
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
    },
    {
      Header: "Schemes for PWDS",
      accessor: "domainDescription",
    },
    {
      Header: "Shemes",
      accessor: "schemeName",
    },
    {
      Header: "Eligible",
      accessor: "eligibleDisabilities",
    },
    {
      Header: "Attachment Link",
      accessor: "attachments",
    },
    {
      Header: "State",
      accessor: "implementedBy",
    },
    {
      Header: "Disablities",
      accessor: "",
    },
    {
      Header: "% of Disablitiy",
      accessor: "percentageOfDisability",
    },
    {
      Header: "Annual Income",
      accessor: "incomeLimit",
    },
    {
      Header: "Min Age",
      accessor: "",
    },
    {
      Header: "Max Age",
      accessor: "",
    },
    {
      Header: "Email Address",
      accessor: "emailAddress",
    },
    {
      Header: "ACTIONS",
      accessor: "action",
      Cell: (props) =>{ 
        const rowIdx = props.row.original._id;
        
      return(
        <div className="d-flex align-items-center justify-content-center flex-row">
          <Link to={`/schemeEditForm/${rowIdx}`}>
            <FaEdit size={20} color="#00C9E5" />
          </Link>
          <span className="m-1" onClick={()=>deleteHandleShow(rowIdx)}> 
            <MdDelete size={20} color="#00C9E5" />
          </span>
        </div>
      )
      }
    },
  ];

  return (
   <>
   {
    !isLoading ?(
      <>
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
          <BasicTable
            COLUMNS={COLUMNS}
            MOCK_DATA={data}
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />{" "}
        </Row>
      </Container>
      <DeleteModel
        DELETESTATE={deleteShow}
        ONCLICK={deleteHandleClose}
        YES={delTimeSheetData}
        DESCRIPTION="Scheme"
        DELETETITLE="Schemes"
      />
    </div>
      </>
    ):(
      <Loader/>
    )
   }
   </>
  );
};

export default Scheme;
