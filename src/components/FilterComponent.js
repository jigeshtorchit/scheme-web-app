import React, { useEffect, useState } from "react";
import { Card, Form, Button, ListGroup, Row, Col } from "react-bootstrap";
import DataCard from "./DataCard";
import { Formik } from "formik";
import { FilterSchema } from "./FilterValidation";
import { useGetFilterMutation } from "../redux/api/FilterApi";
import { InfinitySpin } from "react-loader-spinner";

const FilterComponent = () => {
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [additionalFilter, setAdditionalFilter] = useState("");
  const [gender, setGender] = useState("");
  const [state, setState] = useState("");
  const [disabilities, setDisabilities] = useState("");
  const [data , setData] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [getFilterDataFunc, { data: getFilterData, isLoading }] =
  useGetFilterMutation(currentPage);
 
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const response = await getFilterDataFunc();
  
        console.log(response?.data);
  
        if (response.data) {
          setData(response.data);
          setTotalPage(response.totalPages);
          setCurrentPage(response.currentPage);
        } else {
          console.log("Error in API response:", response.error && response.error.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [getFilterDataFunc, currentPage]);
  
   
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
      const response = await getFilterDataFunc({
        implementedBy: state,
        incomeLimit: additionalFilter,
        genderEligibility: gender,
        percentageOfDisability: disabilities,
      });

      if (response.error && response.error.originalStatus === 200) {
        setAdditionalFilter("");
        setGender("");
        setDisabilities("");
        setState("");
        console.log(response.error.data);
      } else {
        console.log("else part");
        console.log(response.error && response.error.data);
        console.log(response);
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
        
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Card.Body>
          <Form className="mb-5 ">
            <Row className="mb-3">
              <Col xs={12} sm={6} md={4}>
                <Form.Group controlId="minAge">
                  <Form.Label>Min Age:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Min Age"
                    value={minAge}
                    onChange={(e) => {
                      setMinAge(e.target.value);
                      handleChange(e);
                    }}
                    className={` mb-2 form-control ${
                      touched.minAge && errors.minAge ? "is-invalid" : ""
                    }`}
                    onBlur={handleBlur}
                  />
                  {touched.minAge && errors.minAge && (
                    <p className="text-danger">{errors.minAge}</p>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Form.Group controlId="maxAge">
                  <Form.Label>Max Age:</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Max Age"
                    value={maxAge}
                    onChange={(e) => {
                      setMaxAge(e.target.value);
                      handleChange(e);
                    }}
                    className={`mb-2 form-control ${
                      touched.maxAge && errors.maxAge ? "is-invalid" : ""
                    }`}
                    onBlur={handleBlur}
                  />
                  {touched.maxAge && errors.maxAge && (
                    <p className="text-danger">{errors.maxAge}</p>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Form.Group controlId="gender">
                  <Form.Label>Gender:</Form.Label>
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
                    <option value="other">Both Male and Female</option>
                  </Form.Select>
                  {touched.gender && errors.gender && (
                    <p className="text-danger">{errors.gender}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col xs={12} sm={6} md={4}>
                <Form.Group controlId="disabilities">
                  <Form.Label>Disabilities:</Form.Label>
                  <Form.Select
                    as="select"
                    value={disabilities}
                    onChange={(e) => {
                      setDisabilities(e.target.value);
                      handleChange(e);
                    }}
                    className={` mb-2 form-control ${
                      touched.disabilities && errors.disabilities
                        ? "is-invalid"
                        : ""
                    }`}
                    onBlur={handleBlur}
                  >
                    <option value="">% of Disability:</option>
                    <option value="100%">100%</option>
                    <option value="Minimum 40%">Minimum 40%</option>
                    <option value="Minimum 60%">Minimum 60%</option>
                    <option value="Minimum 70%">Minimum 70%</option>
                    <option value="Minimum 80%">Minimum 80%</option>
                    <option value="Minimum 90%">Minimum 90%</option>
                  </Form.Select>
                  {touched.disabilities && errors.disabilities && (
                    <p className="text-danger">{errors.disabilities}</p>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Form.Group controlId="additionalFilter">
                  <Form.Label>Income Limit:</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Income Limit"
                    value={additionalFilter}
                    onChange={(e) => {
                      setAdditionalFilter(e.target.value);
                      handleChange(e);
                    }}
                    className={`mb-2  form-control ${
                      touched.additionalFilter && errors.additionalFilter
                        ? "is-invalid"
                        : ""
                    }`}
                    onBlur={handleBlur}
                  />
                  {touched.additionalFilter && errors.additionalFilter && (
                    <p className="text-danger">{errors.additionalFilter}</p>
                  )}
                </Form.Group>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <Form.Group controlId="state">
                  <Form.Label>State:</Form.Label>
                  <Form.Select
                    as="select"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      handleChange(e);
                    }}
                    className={`mb-2 form-control ${
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
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Assam">Assam</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Odisha">Odisha</option>
                    <option value="Pondicherry">Pondicherry</option>
                    <option value="Jharkhand">Jharkhand</option>
                    <option value="Mumbai">Mumbai</option>
                  </Form.Select>
                  {touched.state && errors.state && (
                    <p className="text-danger">{errors.state}</p>
                  )}
                </Form.Group>
              </Col>
            </Row>

            <Row className="justify-content-end">
              <Col xs={12} sm={6} md={4} lg={2} className="mb-3">
                <Button
                  className="w-100 mt-3"
                  variant="primary"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
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

          {isLoading ? (
            <div className="text-center mt-3">
              <InfinitySpin width="200" color="#00d4ff" />
            </div>
          ) : (
            <>
            {data?.length > 0 ? (
  <Card className="mt-5">
    <Card.Body>
      
      <ListGroup variant="flush">
        {data.map((message) => (
          
          <DataCard
          
            key={message._id}
            niProvider={message.niProvider}
            schemeName={message.schemeName}
            implementedBy={message.implementedBy}
            domainDescription={message.domainDescription}
            eligibleDisabilities={message.eligibleDisabilities}
            percentageOfDisability={message.percentageOfDisability}
            minAge={message.minAge}
            maxAge={message.maxAge}
            incomeLimit={message.incomeLimit}
            genderEligibility={message.genderEligibility}
            comments={message.comments}
          />
        ))}
      </ListGroup>
    </Card.Body>
  </Card>
) : (
  <div className="text-center mt-3">
    <Card className="mt-5">
      <Card.Body>
        <p>No data found</p>
      </Card.Body>
    </Card>
  </div>
)}
 <div className="mt-3 d-flex justify-content-center align-items-center">
              <Button
  
  disabled={currentPage === 1}
  onClick={() => setCurrentPage(currentPage - 1)}
  className="mr-2 bg-ccfeff"
>
  Previous
</Button>

<div className="mx-2">
  Page {currentPage} of {totalPage}
</div>

<Button

  disabled={currentPage === totalPage}
  onClick={() => setCurrentPage(currentPage + 1)}
  className="ml-2 bg-ccfeff"
>
  Next
</Button>

</div>

            </>
          )}
        </Card.Body>
      )}
    </Formik>
  );
};

export default FilterComponent;
