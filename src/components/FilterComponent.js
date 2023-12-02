import React, { useState } from "react";
import {
  Card,
  Form,
  Button,
  ListGroup,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";
import DataCard from "./DataCard";
import { Formik } from "formik";
import { FilterSchema } from "./FilterValidation";  
import { useGetFilterQuery } from "../redux/api/FilterApi";
const FilterComponent = ({ onFilterSubmit, isLoading, filteredMessages }) => {
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [additionalFilter, setAdditionalFilter] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [disabilities, setDisabilities] = useState("");
  const { data: getFilterData } = useGetFilterQuery();
  console.log(getFilterData);
  // const handleFilterSubmit = () => {
  //   onFilterSubmit({
  //     minAge,
  //     maxAge,
  //     additionalFilter,
  //     gender,
  //     disabilities,
  //     state,
  //   });
  // };
  const initialValues = {
    minAge: "",
    maxAge: "",
    additionalFilter: "",
    gender: "",
    disabilities: "",
    state: "",
  };
  const onClearFilter = () => {
    setMinAge("");
    setMaxAge("");
    setAdditionalFilter("");
    setGender("");
    setState("");
    setDisabilities("");
  };
  const handleFilterSubmit = async () => {
    try {
      const response = await getFilterData({
        implementedBy: state,
        incomeLimit: additionalFilter,
        genderEligibility: gender,
        percentageOfDisability: disabilities,
      });
      console.log(response);
      if (response.error.originalStatus === 200) {
        setMinAge("");
        setMaxAge("");
        setAdditionalFilter("");
        setGender("");
        setDisabilities("");
        setState("");
        console.log(response.error.data);
      } else {
        console.log("else part");
        console.log(response.error.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FilterSchema}
      onSubmit={handleFilterSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <>
          <Card.Body>
            <Form>
              <Row className="d-flex flex-wrap flex-lg-noWrap flex-xxl-noWrap flex-xl-noWrap">
                <Col className="m-0" xs={12} sm={6} md={4} lg={4}>
                  <Form.Group controlId="minAge" className="mb-1">
                    <Form.Label className="mb-1">Min Age:</Form.Label>
                    <Form.Control
                      type="number"
                      value={minAge}
                      onChange={(e) => {
                        setMinAge(e.target.value);
                        handleChange(e);
                      }}
                      className={`form-control ${
                        touched.minAge && errors.minAge ? "is-invalid" : ""
                      }`}
                      onBlur={handleBlur}
                    />
                    {touched.minAge && errors.minAge ? (
                      <p className="text-danger">{errors.minAge}</p>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                </Col>
                <Col className="m-0" xs={12} sm={6} md={4} lg={4}>
                  <Form.Group controlId="maxAge" className="mb-1">
                    <Form.Label className="mb-1">Max Age:</Form.Label>
                    <Form.Control
                      type="number"
                      value={maxAge}
                      onChange={(e) => {
                        setMaxAge(e.target.value);
                        handleChange(e);
                      }}
                      className={`form-control ${
                        touched.maxAge && errors.maxAge ? "is-invalid" : ""
                      }`}
                      onBlur={handleBlur}
                    />
                    {touched.maxAge && errors.maxAge ? (
                      <p className="text-danger">{errors.maxAge}</p>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                </Col>
                <Col className="m-0" xs={12} sm={6} md={4} lg={4}>
                  <Form.Group controlId="gender" className="mb-1">
                    <Form.Label className="mb-1">Gender:</Form.Label>
                    <Form.Select
                      as="select"
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                        handleChange(e);
                      }}
                      className={`form-control ${
                        touched.gender && errors.gender ? "is-invalid" : ""
                      }`}
                      onBlur={handleBlur}
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Both</option>
                    </Form.Select>
                    {touched.gender && errors.gender ? (
                      <p className="text-danger">{errors.gender}</p>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col className="m-0" xs={12} sm={6} md={4} lg={4}>
                  <Form.Group controlId="disabilities" className="mb-1">
                    <Form.Label className="mb-1">Disabilities:</Form.Label>
                    <Form.Select
                      as="select"
                      value={disabilities}
                      onChange={(e) => {
                        setDisabilities(e.target.value);
                        handleChange(e);
                      }}
                      className={`form-control ${
                        touched.disabilities && errors.disabilities
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={handleBlur}
                    >
                      <option value="">percentageOfDisability:</option>
                      <option value="100%">100%,</option>
                      <option value="Minimum 40%">Minimum 40%,</option>
                      <option value="Minimum 60%">Minimum 60%,</option>
                      <option value="Minimum 70%">Minimum 70%,</option>
                      <option value="Minimum 80%">Minimum 80%,</option>
                      <option value="Minimum 90%">Minimum 90%</option>
                    </Form.Select>
                    {touched.disabilities && errors.disabilities ? (
                      <p className="text-danger">{errors.disabilities}</p>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                </Col>
                <Col className="m-0" xs={12} sm={6} md={4} lg={4}>
                  <Form.Group controlId="additionalFilter" className="mb-1">
                    <Form.Label className="mb-1">Income Limit:</Form.Label>
                    <Form.Control
                      type="text"
                      value={additionalFilter}
                      onChange={(e) => {
                        setAdditionalFilter(e.target.value);
                        handleChange(e);
                      }}
                      className={`form-control ${
                        touched.additionalFilter && errors.additionalFilter
                          ? "is-invalid"
                          : ""
                      }`}
                      onBlur={handleBlur}
                    />
                    {touched.additionalFilter && errors.additionalFilter ? (
                      <p className="text-danger">{errors.additionalFilter}</p>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                </Col>
                <Col className="m-0" xs={12} sm={6} md={4} lg={4}>
                  <Form.Group controlId="state" className="mb-1">
                    <Form.Label className="mb-1">State:</Form.Label>
                    <Form.Select
                      as="select"
                      value={state}
                      onChange={(e) => {
                        setState(e.target.value);
                        handleChange(e);
                      }}
                      className={`form-control ${
                        touched.state && errors.state ? "is-invalid" : ""
                      }`}
                      onBlur={handleBlur}
                    >
                      <option value="">Select State</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Andra Pradesh">Andra Pradesh</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="New Delhi">New Delhi</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="Maharastara">Maharastara</option>
                      <option value="Assam">Assam</option>
                      <option value="Uttar pradesh">Uttar pradesh</option>
                      <option value="Odissa">Odissa</option>
                      <option value="Pondicherry">Pondicherry</option>
                      <option value="Jharchand">Jharchand</option>
                      <option value="Mumbai">Mumbai</option>
                    </Form.Select>
                    {touched.state && errors.state ? (
                      <p className="text-danger">{errors.state}</p>
                    ) : (
                      ""
                    )}
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-end align-items-end">
                <Col
                  xs={12}
                  sm={12}
                  md={4}
                  lg={1}
                  xl={1}
                  className="d-flex align-items-end justify-content-center"
                >
                  <Button
                    className="mt-4"
                    variant="primary"
                    disabled={isSubmitting}
                    onClick={
                      minAge === "" ||
                      maxAge === "" ||
                      gender === "" ||
                      disabilities === "" ||
                      additionalFilter === "" ||
                      state === "" ||
                      (touched.minAge && errors.minAge) ||
                      (touched.maxAge && errors.maxAge) ||
                      (touched.gender && errors.gender) ||
                      (touched.disabilities && errors.disabilities) ||
                      (touched.additionalFilter && errors.additionalFilter) ||
                      (touched.state && errors.state)
                        ? handleSubmit
                        : handleFilterSubmit
                    }
                  >
                    Submit
                  </Button>
                </Col>
                <Col
                  xs={12}
                  sm={12}
                  md={4}
                  lg={2}
                  xl={2}
                  className="d-flex align-items-end justify-content-center"
                >
                  <Button
                    variant="danger"
                    onClick={onClearFilter}
                    className=" mt-4 text-noWrap"
                  >
                    Clear Filter
                  </Button>
                </Col>
              </Row>
            </Form>
            {isLoading && (
              <div className="text-center mt-3">
                <Spinner animation="border" variant="primary" />
              </div>
            )}
            {getFilterData?.length > 0 ? (
              <Card>
                {/* <Card.Body>
           <ListGroup variant="flush">
              {getFilterData.map((message) => (
        //         <ListGroup.Item key={message._id}> */}
                {/*
        //           {message.niProvider}
        //         </ListGroup.Item>
        //       ))}
        //     </ListGroup>
        //   </Card.Body>*/}
              </Card>
            ) : (
              !isLoading && <></>
            )}
            <hr className="bg-primary" />
            <DataCard
              date="9/8/2023 16:02:15"
              instituteName="National Institute for Empowerment of Persons with Multiple Disabilities (NIEPMD), Chennai"
              centerName="State Resource Cum Training Center-Chennai"
              state="TAMIL NADU"
              servicesProvided="Specialized service/ information are provided under one roof to all categories of differently-abled persons"
              disabilities="All the 21 disabilities"
              minimumPercentage="Minimum 40"
              male="Both"
              female="Both"
              website="https://www.scd.tn.gov.in/state_resource_cum_tr_centre.php"
            />
          </Card.Body>
        </>
      )}
    </Formik>
  );
};
export default FilterComponent;
