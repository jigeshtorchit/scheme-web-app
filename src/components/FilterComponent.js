import React, { useEffect, useState } from "react";
import { Card, Form, Button, ListGroup, Row, Col } from "react-bootstrap";
import DataCard from "./DataCard";
import {
  useGetFilterQuery,
  useDataFilterMutation,
} from "../redux/api/FilterApi";
import { InfinitySpin } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import "./FilterComponent.css";
import { toast } from "react-toastify";

const FilterComponent = () => {
  const [Age, setAge] = useState("");
  const [additionalFilter, setAdditionalFilter] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [disabilities, setDisabilities] = useState("");
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalFilterPage, setTotalFilterPage] = useState(1);
  const [currentFilterPage, setCurrentFilterPage] = useState(1);
  const { data: getFilterDataFunc, isLoading: isLoadingGetFilter } = useGetFilterQuery(currentPage);
  const [dataFilter,{isLoading: isLoadingDataFilter}] = useDataFilterMutation();
  useEffect(() => {
    if (getFilterDataFunc && getFilterDataFunc.data) {
      setData(getFilterDataFunc.data);
      setTotalPage(getFilterDataFunc.totalPages);
      setCurrentPage(currentPage);
    }
  }, [getFilterDataFunc, currentPage]);

  const onClearFilter = () => {
    setAge("");
    setAdditionalFilter("");
    setGender("");
    setState("");
    setDisabilities("");
    setFilterData([]);
    setCurrentPage(1);
    setTotalPage(1);
  };

  const handleFilterSubmit = async (page) => {
    try {
      const response = await dataFilter(
        {
          data:{
            implementedBy: state,
            incomeLimit: additionalFilter,
            genderEligibility: gender,
            percentageOfDisability: disabilities,
            age: Age,
          },
          page:page
        }
        
      );
      console.log(currentFilterPage);
      if (response?.data) {
        console.log(response?.data);
        setFilterData(response?.data.data);
        setTotalFilterPage(response?.data.totalPages);
        setCurrentFilterPage(response?.data.currentPage)
        console.log(data);
        console.log(response?.data.currentPage);
      } else {
        console.log("else part");
        console.log(response?.error.data);
        toast.warning(response?.error.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderData = filterData.length > 0 ? filterData : data;

  return (
    <>
      <Card.Body>
        <Form className="mb-5 ">
          <Row className="mb-3">
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="Age">
                <Form.Label className="text-dark" style={{fontWeight:"bolder"}}>Age:</Form.Label>
                <Form.Select
                value={Age}
                  as="select"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                >
                  <option value="">Select Age</option>
                  <option value="0">0</option>
                  <option value="0-6">0-6</option>
                  <option value="0-18">0-18</option>
                  <option value="6-18">6-18</option>
                  <option value="18-24">18-24</option>
                  <option value="18-55">18-55</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="gender">
                <Form.Label className="text-dark" style={{fontWeight:"bolder"}}>Gender:</Form.Label>
                <Form.Select
                value={gender}
                  as="select"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Both Male and Female</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="state">
                <Form.Label className="text-dark" style={{fontWeight:"bolder"}}>State:</Form.Label>
                <Form.Select
                  as="select"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  className={`mb-2 `}
                >
                  <option value="" selected disabled>
                    select state
                  </option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                  <option value="Assam">Assam</option>
                  <option value="Bihar">Bihar</option>
                  <option value="Chhattisgarh">Chhattisgarh</option>
                  <option value="Goa">Goa</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Haryana">Haryana</option>
                  <option value="Himachal Pradesh">Himachal Pradesh</option>
                  <option value="Jharkhand">Jharkhand</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Kerala">Kerala</option>
                  <option value="Madhya Pradesh">Madhya Pradesh</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Manipur">Manipur</option>
                  <option value="Meghalaya">Meghalaya</option>
                  <option value="Mizoram">Mizoram</option>
                  <option value="Nagaland">Nagaland</option>
                  <option value="Odisha">Odisha</option>
                  <option value="Punjab">Punjab</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="Sikkim">Sikkim</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tripura">Tripura</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Uttarakhand">Uttarakhand</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Andaman and Nicobar Islands">
                    Andaman and Nicobar Islands
                  </option>
                  <option value="Chandigarh">Chandigarh</option>
                  <option value="Dadra and Nagar Haveli and Daman and Diu">
                    Dadra and Nagar Haveli and Daman and Diu
                  </option>
                  <option value="Delhi">Delhi</option>
                  <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                  <option value="Ladakh">Ladakh</option>
                  <option value="Lakshadweep">Lakshadweep</option>
                  <option value="Puducherry">Puducherry</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="disabilities">
                <Form.Label className="text-dark" style={{fontWeight:"bolder"}}>Disabilities:</Form.Label>
                <Form.Select
                value={disabilities}
                  as="select"
                  onChange={(e) => {
                    setDisabilities(e.target.value);
                  }}
                  className={` mb-2 form-control`}
                >
                  <option value="">Disability Percentage</option>
                  <option value="100%">100%</option>
                  <option value="Minimum 40%">Minimum 40%</option>
                  <option value="Minimum 60%">Minimum 60%</option>
                  <option value="Minimum 70%">Minimum 70%</option>
                  <option value="Minimum 80%">Minimum 80%</option>
                  <option value="Minimum 90%">Minimum 90%</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="additionalFilter">
                <Form.Label className="text-dark" style={{fontWeight:"bolder"}}>Annual Income:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Income Limit"
                  value={additionalFilter}
                  onChange={(e) => {
                    setAdditionalFilter(e.target.value);
                  }}
                  className={`mb-2`}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="justify-content-end">
            <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
              <Button
                className="w-100 mt-3"
                variant="primary"
                onClick={handleFilterSubmit}
              >
                Submit
              </Button>
            </Col>
            <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
              <Button
                variant="danger"
                onClick={onClearFilter}
                className="w-100 mt-3"
              >
                Clear Filter
              </Button>
            </Col>
          </Row>
        </Form>

        {(!filterData.length>0 ?isLoadingGetFilter : isLoadingDataFilter) ? (
          <div className="text-center mt-3">
            <InfinitySpin width="200" color="#007BFF"/>
          </div>
        ) : (
          <>
            {renderData.length > 0 ? (
              <Card className="mt-5">
                <Card.Body>
                  <ListGroup variant="flush">
                    {renderData.map((message) => (
                      <DataCard key={message._id} {...message} />
                    ))}
                  </ListGroup>
                </Card.Body>
              </Card>
            ) : (
              <div className="text-center  mt-3">
                <Card className="mt-5">
                  <Card.Body>
                    <p>No data found</p>
                  </Card.Body>
                </Card>
              </div>
            )}
          </>
        )}
        <div className="d-flex flex-sm-column flex-md-row  flex-column justify-content-between flex-xxl-row  flex-xl-row flex-lg-row  align-items-center my-4 mx-2">
          {/* <Button
                disabled={
                  filterData.length > 0
                    ? currentFilterPage === 1
                    : currentPage === 1
                }
                onClick={() =>
                  filterData.length > 0
                    ? setCurrentFilterPage(currentFilterPage - 1)
                    : setCurrentPage(currentPage - 1)
                }
                className="mr-2 bg-ccfeff"
              >
                Previous
              </Button>

              <div className="mx-2">
                Page {filterData.length > 0 ? currentFilterPage : currentPage}{" "}
                of {filterData.length > 0 ? totalFilterPage : totalPage}
              </div>

              <Button
                disabled={
                  filterData.length > 0
                    ? currentFilterPage ===
                      (filterData.length > 0 ? totalFilterPage : totalPage)
                    : currentPage === totalPage
                }
                onClick={() =>
                  filterData.length > 0
                    ? setCurrentFilterPage(currentFilterPage + 1)
                    : setCurrentPage(currentPage + 1)
                }
                className="ml-2 bg-ccfeff"
              >
                Next
              </Button> */}
          <div className="text-center">
            <strong>Page</strong> {filterData.length > 0 ? currentFilterPage : currentPage} of{" "}
            {filterData.length > 0 ? totalFilterPage : totalPage}
          </div>
          <div className="my-4">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={filterData.length > 0 ? totalFilterPage : totalPage}
              marginPagesDisplayed={-1}
              pageRangeDisplayed={-1}
              onPageChange={(selected) => {
                if (filterData.length > 0) {
                  const selectedFilterPage = selected.selected + 1;
                  console.log('====================================');
                  console.log(selectedFilterPage);
                  console.log('====================================');
                  handleFilterSubmit(selectedFilterPage); 
                } else {
                  const selectedPage = selected.selected + 1;

                  setCurrentPage(selectedPage);
                }
              }}
              containerClassName={"pagination"}
              activeClassName={"active"}
              pageLinkClassName={"page-link"}
              previousLinkClassName={"page-link custom-prev-next"}
              nextLinkClassName={"page-link custom-prev-next"}
              disabledClassName={"disabled"}
              breakLinkClassName={"page-link"}
              initialPage={
                filterData.length > 0 ? currentFilterPage - 1 : currentPage - 1
              }
            />
          </div>
        </div>
      </Card.Body>
    </>
  );
};

export default FilterComponent;