import React, { useEffect, useState } from "react";
import { Card, Form, Button, ListGroup, Row, Col } from "react-bootstrap";
import DataCard from "./DataCard";
import {
  useGetFilterQuery,
  useDataFilterMutation,
  useGetAgeQuery,
  useGetGenderQuery,
  useGetStatesQuery,
  useGetDisablitiesQuery,
  useGetIncomeQuery,
} from "../redux/api/FilterApi";
import { InfinitySpin } from "react-loader-spinner";
import ReactPaginate from "react-paginate";
import "./FilterComponent.css";
import { toast } from "react-toastify";
import { BiLeftArrow, BiRightArrow } from "react-icons/bi";
import CopyRights from "../pages/copyright/CopyRights";
import banner from "../assets/images/banner.jpg";

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
  const [ageData, setAgeData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [statesData, setStatesData] = useState([]);
  const [disabilityData, setDisabilityData] = useState([]);
  const [incomeData, setIncomeData] = useState([]);
  const { data: getFilterDataFunc, isLoading: isLoadingGetFilter } =
    useGetFilterQuery(currentPage);
  const [dataFilter, { isLoading: isLoadingDataFilter }] =
    useDataFilterMutation();
  const { data: getAge } = useGetAgeQuery();
  const { data: getGender } = useGetGenderQuery();
  const { data: getStates } = useGetStatesQuery();
  const { data: getdisability } = useGetDisablitiesQuery();
  const { data: getIncome } = useGetIncomeQuery();

  useEffect(() => {
    setAgeData(getAge);
    setGenderData(getGender);
    setStatesData(getStates);
    setDisabilityData(getdisability);
    setIncomeData(getIncome);
    if (getFilterDataFunc && getFilterDataFunc.data) {
      setData(getFilterDataFunc.data);
      setTotalPage(getFilterDataFunc.totalPages);
      setCurrentPage(currentPage);
    }
  }, [
    getFilterDataFunc,
    currentPage,
    getAge,
    getGender,
    getStates,
    getdisability,
    getIncome,
  ]);

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
      const response = await dataFilter({
        data: {
          implementedBy: state,
          incomeLimit: additionalFilter,
          genderEligibility: gender,
          percentageOfDisability: disabilities,
          age: Age,
        },
        page: page,
      });
      if (response?.data) {
        setFilterData(response?.data.data);
        setTotalFilterPage(response?.data.totalPages);
        setCurrentFilterPage(response?.data.currentPage);
      } else {
        toast.warning(response?.error.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const renderData = filterData.length > 0 ? filterData : data;

  return (
    <>
      <img src={banner} alt="Banner" className="img-fluid" />
      <Card.Body>
        <Form className="mb-5 ">
          <Row className="mb-3">
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="Age">
                <Form.Label
                  className="text-dark"
                  style={{ fontWeight: "bolder" }}
                >
                  Age:
                </Form.Label>
                <Form.Select
                  value={Age}
                  as="select"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    Select Age
                  </option>{" "}
                  {ageData && ageData.length > 0 ? (
                    ageData.map((data, index) => (
                      <option key={index} value={data.option}>
                        {data.option}
                      </option>
                    ))
                  ) : (
                    <option value="">No age options available</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="gender">
                <Form.Label
                  className="text-dark"
                  style={{ fontWeight: "bolder" }}
                >
                  Gender:
                </Form.Label>
                <Form.Select
                  value={gender}
                  as="select"
                  onChange={(e) => {
                    setGender(e.target.value);
                  }}
                >
                  <option value="" disabled selected>
                    Select Gender
                  </option>
                  {genderData && genderData.length > 0 ? (
                    genderData.map((data, index) => (
                      <option key={index} value={data.option}>
                        {data.option}
                      </option>
                    ))
                  ) : (
                    <option value="">No Gender options available</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="state">
                <Form.Label
                  className="text-dark"
                  style={{ fontWeight: "bolder" }}
                >
                  State:
                </Form.Label>
                <Form.Select
                  as="select"
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  className={`mb-2 `}
                >
                  <option value="" selected disabled>
                    Select State
                  </option>
                  {statesData && statesData.length > 0 ? (
                    statesData.map((data, index) => (
                      <option key={index} value={data.option}>
                        {data.option}
                      </option>
                    ))
                  ) : (
                    <option value="">No State options available</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="disabilities">
                <Form.Label
                  className="text-dark"
                  style={{ fontWeight: "bolder" }}
                >
                  Disabilities:
                </Form.Label>
                <Form.Select
                  value={disabilities}
                  as="select"
                  onChange={(e) => {
                    setDisabilities(e.target.value);
                  }}
                  className={` mb-2 form-control`}
                >
                  <option value="" selected disabled>
                    Select Disability{" "}
                  </option>
                  {disabilityData && disabilityData.length > 0 ? (
                    disabilityData.map((data, index) => (
                      <option key={index} value={data.option}>
                        {data.option}
                      </option>
                    ))
                  ) : (
                    <option value="">No Disabilities options available</option>
                  )}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col xs={12} sm={6} md={4}>
              <Form.Group controlId="additionalFilter">
                <Form.Label
                  className="text-dark"
                  style={{ fontWeight: "bolder" }}
                >
                  Income:
                </Form.Label>
                <Form.Select
                  value={additionalFilter}
                  as="select"
                  onChange={(e) => {
                    setAdditionalFilter(e.target.value);
                  }}
                  className={` mb-2 form-control`}
                >
                  <option value="" selected disabled>
                    Select Income{" "}
                  </option>
                  {incomeData && incomeData.length > 0 ? (
                    incomeData.map((data, index) => (
                      <option key={index} value={data.option}>
                        {data.option}
                      </option>
                    ))
                  ) : (
                    <option value="">No Income options available</option>
                  )}
                </Form.Select>
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

        {(!filterData.length > 0 ? isLoadingGetFilter : isLoadingDataFilter) ? (
          <div className="text-center mt-3">
            <InfinitySpin width="200" color="#007BFF" />
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
        <div className="d-flex  flex-row  text-center justify-content-between align-items-center my-4 mx-2">
          <div className="d-flex  flex-row  text-center justify-content-center align-items-center">
            <p>
              <strong>Page </strong>{" "}
              {filterData.length > 0 ? currentFilterPage : currentPage} of{" "}
              {filterData.length > 0 ? totalFilterPage : totalPage}
            </p>
          </div>
          <div className="d-none d-lg-flex d-xxl-flex d-xl-flex d-md-none d-sm-none justify-content-center align-items-center">
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              pageCount={filterData.length > 0 ? totalFilterPage : totalPage}
              marginPagesDisplayed={-1}
              pageRangeDisplayed={-1}
              onPageChange={(selected) => {
                if (filterData.length > 0) {
                  const selectedFilterPage = selected.selected + 1;

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
          <div className="my-4 d-flex d-lg-none d-xxl-none d-xl-none d-md-flex d-sm-flex justify-content-between align-items-center">
            <ReactPaginate
              previousLabel={<BiLeftArrow size={16} />}
              nextLabel={<BiRightArrow size={16} />}
              pageCount={filterData.length > 0 ? totalFilterPage : totalPage}
              marginPagesDisplayed={-1}
              pageRangeDisplayed={-1}
              onPageChange={(selected) => {
                if (filterData.length > 0) {
                  const selectedFilterPage = selected.selected + 1;
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
      <CopyRights />
    </>
  );
};

export default FilterComponent;
