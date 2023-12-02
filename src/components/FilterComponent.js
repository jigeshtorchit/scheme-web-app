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

const FilterComponent = ({
  onFilterSubmit,
  onClearFilter,
  isLoading,
  filteredMessages,
}) => {
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [additionalFilter, setAdditionalFilter] = useState("");
  const [gender, setGender] = useState("");
  const [disabilities, setDisabilities] = useState("");

  const handleFilterSubmit = () => {
    onFilterSubmit({
      minAge,
      maxAge,
      additionalFilter,
      gender,
      disabilities,
    });
  };

  return (
    <Card.Body>
      <Form>
        <Row className="mb-2">
          <Col xs={12} sm={4} md={12} lg={2} xl={2} className="pr-1">
            <Form.Group controlId="minAge" className="mb-0">
              <Form.Label className="mb-0">Min Age:</Form.Label>
              <Form.Control
                type="number"
                value={minAge}
                onChange={(e) => setMinAge(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={4} md={12} lg={2} xl={2} className="pr-1">
            <Form.Group controlId="maxAge" className="mb-0">
              <Form.Label className="mb-0">Max Age:</Form.Label>
              <Form.Control
                type="number"
                value={maxAge}
                onChange={(e) => setMaxAge(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={4} md={12} lg={2} xl={2} className="pr-1">
            <Form.Group controlId="gender" className="mb-0">
              <Form.Label className="mb-0">Gender:</Form.Label>
              <Form.Control
                as="select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} sm={4} md={12} lg={2} xl={2} className="pr-1">
            <Form.Group controlId="disabilities" className="mb-0">
              <Form.Label className="mb-0">Disabilities (%):</Form.Label>
              <Form.Control
                type="number"
                value={disabilities}
                onChange={(e) => setDisabilities(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} sm={4} md={12} lg={2} xl={2} className="pr-1">
            <Form.Group controlId="additionalFilter" className="mb-0">
              <Form.Label className="mb-0">Additional Filter:</Form.Label>
              <Form.Control
                type="text"
                value={additionalFilter}
                onChange={(e) => setAdditionalFilter(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={4}
            lg={1}
            xl={1}
            className="pr-1 d-flex align-items-end justify-content-center"
          >
            <Button
              variant="primary"
              onClick={handleFilterSubmit}
              className="w-100"
              disabled={true}
            >
              Submit
            </Button>
          </Col>
          <Col
            xs={12}
            sm={12}
            md={4}
            lg={1}
            xl={1}
            className="d-flex align-items-end justify-content-center"
          >
            <Button variant="danger" onClick={onClearFilter} className="w-100">
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

      {filteredMessages?.length > 0 ? (
        <Card>
          <Card.Body>
            <ListGroup variant="flush">
              {filteredMessages.map((message) => (
                <ListGroup.Item key={message.id}>
                  {/* Render your filtered message data here */}
                  {message.text}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
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
        minimumPercentage="Minimum 40%"
        male="Both"
        female="Both"
        website="https://www.scd.tn.gov.in/state_resource_cum_tr_centre.php"
      />
    </Card.Body>
  );
};

export default FilterComponent;
