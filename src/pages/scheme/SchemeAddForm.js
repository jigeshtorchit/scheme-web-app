import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { EmployeeShema } from "./Validations/EmployeeFormValidate";
import { AiOutlineArrowLeft } from "react-icons/ai";

const SchemeAddForm = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [company, setCompany] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [employeeData, setEmployeeData] = useState({});
  const handleCancel = () => {
    navigate("/employee");
  };

  const initialValues = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    employeeId: "",
    joiningDate: "",
    mobile: "",
    company: "",
    department: "",
    designation: "",
  };
  function handleAddData() {
    // Handle form submission here
    console.log(employeeData);
    navigate("/employee");
  }

  useEffect(() => {
    const Employeedata = {
      firstName,
      lastName,
      userName,
      email,
      password,
      confirmPassword,
      mobile,
      employeeId,
      joiningDate,
      company,
      department,
      designation,
    };
    setEmployeeData(Employeedata);
  }, [
    firstName,
    lastName,
    userName,
    email,
    password,
    confirmPassword,
    mobile,
    employeeId,
    joiningDate,
    company,
    department,
    designation,
  ]);

  return (
    <div>
      <Container fluid>
        <Formik
          initialValues={initialValues}
          validationSchema={EmployeeShema}
          onSubmit={handleAddData}
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
              <Form>
                <Row className="d-flex flex-row justify-content-between align-items-center mt-2">
                  <Col className="d-flex justify-content-start align-items-center">
                    <AiOutlineArrowLeft
                      onClick={handleCancel}
                      size={25}
                      className="m-1 pointer"
                    />
                    <h4>Add Employee Details</h4>
                  </Col>
                  <Col className="d-sm-none d-none d-md-none d-lg-flex d-xxl-flex d-xl-flex flex-row justify-content-end align-items-center">
                    <Button
                      className="m-1"
                      variant="secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="m-1"
                      type="button"
                      disabled={isSubmitting}
                      onClick={
                        (firstName === ''||
                          lastName === ''||
                          userName === ''||
                          email === ''||
                          password === ''||
                          confirmPassword === ''||
                          mobile === ''||
                          employeeId === ''||
                          joiningDate === ''||
                          company === ''||
                          department === ''||
                          designation === '')||
                        (touched.firstName && errors.firstName) ||
                        (touched.lastName && errors.lastName) ||
                        (touched.userName && errors.userName) ||
                        (touched.email && errors.email) ||
                        (touched.password && errors.password) ||
                        (touched.confirmPassword && errors.confirmPassword) ||
                        (touched.employeeId && errors.employeeId) ||
                        (touched.joiningDate && errors.joiningDate) ||
                        (touched.mobile && errors.mobile) ||
                        (touched.company && errors.company) ||
                        (touched.department && errors.department) ||
                        (touched.designation && errors.designation) 
                          ? handleSubmit
                          : handleAddData
                      }
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
                <Row className="d-flex flex-wrap flex-lg-row flex-xxl-row flex-xl-row flex-column flex-md-column flex-sm-column ">
                  <Col className="m-1 p-4 d-flex w-100 h-100  flex-wrap flex-column shadow rounded">
                    <Col>
                      <h6 className="fw-bold">Registration Information</h6>
                    </Col>
                    <Col className="m-2">
                      <Form.Group className="">
                        <Form.Label>First Name*</Form.Label>
                        <Form.Control
                          name="firstName"
                          className={`form-control ${
                            touched.firstName && errors.firstName
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setFirstName(e.target.value.trim());
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        ></Form.Control>
                        {touched.firstName && errors.firstName ? (
                          <p className="text-danger">{errors.firstName}</p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="m-2">
                      <Form.Group className="">
                        <Form.Label>Last Name*</Form.Label>
                        <Form.Control
                          name="lastName"
                          className={`form-control ${
                            touched.lastName && errors.lastName
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setLastName(e.target.value.trim());
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        ></Form.Control>
                        {touched.lastName && errors.lastName ? (
                          <p className="text-danger">{errors.lastName}</p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="m-2">
                      <Form.Group className="">
                        <Form.Label>User Name*</Form.Label>
                        <Form.Control
                          name="userName"
                          className={`form-control ${
                            touched.userName && errors.userName
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setUserName(
                              (e.target.value = `${firstName + " " + lastName}`)
                            );
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        ></Form.Control>
                        {touched.userName && errors.userName ? (
                          <p className="text-danger">{errors.userName}</p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="m-2">
                      <Form.Group className="">
                        <Form.Label>Mobile No.*</Form.Label>
                        <Form.Control
                          name="mobile"
                          type="number"
                          className={`form-control ${
                            touched.mobile && errors.mobile ? "is-invalid" : ""
                          }`}
                          onChange={(e) => {
                            setMobile(e.target.value.trim());
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        ></Form.Control>
                        {touched.mobile && errors.mobile ? (
                          <p className="text-danger">{errors.mobile}</p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="m-2">
                      <Form.Group className="">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          name="email"
                          className={`form-control ${
                            touched.email && errors.email ? "is-invalid" : ""
                          }`}
                          onChange={(e) => {
                            setEmail(e.target.value.trim());
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        ></Form.Control>
                        {touched.email && errors.email ? (
                          <p className="text-danger">{errors.email}</p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="m-2">
                      <Form.Group className="">
                        <Form.Label>password</Form.Label>
                        <Form.Control
                          name="password"
                          className={`form-control ${
                            touched.password && errors.password
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setPassword(e.target.value.trim());
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        ></Form.Control>
                        {touched.password && errors.password ? (
                          <p className="text-danger">{errors.password}</p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="m-2">
                      <Form.Group className="">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                          name="confirmPassword"
                          className={`form-control ${
                            touched.confirmPassword && errors.confirmPassword
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value.trim());
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        ></Form.Control>
                        {touched.confirmPassword && errors.confirmPassword ? (
                          <p className="text-danger">
                            {errors.confirmPassword}
                          </p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>
                  </Col>
                  <Col className="m-1 p-4 d-flex w-100 h-100  flex-wrap flex-column shadow rounded ">
                    <Col>
                      <h6 className="fw-bold">Employee Information</h6>
                    </Col>
                    <Col className="m-2">
                      <Form.Group className="">
                        <Form.Label>Employee ID</Form.Label>
                        <Form.Control
                          name="employeeId"
                          className={`form-control ${
                            touched.employeeId && errors.employeeId
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setEmployeeId(e.target.value.trim());
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        ></Form.Control>
                        {touched.employeeId && errors.employeeId ? (
                          <p className="text-danger">{errors.employeeId}</p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>

                    <Col className="m-2">
                      <Form.Group>
                        <Form.Label>Joining Date</Form.Label>
                        <Form.Control
                          name="joiningDate"
                          type="date"
                          className={`form-control ${
                            touched.joiningDate && errors.joiningDate
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setJoiningDate(e.target.value);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        ></Form.Control>
                        {touched.joiningDate && errors.joiningDate ? (
                          <p className="text-danger">{errors.joiningDate}</p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>

                    <Col className="m-2">
                      <Form.Group>
                        <Form.Label>Company</Form.Label>
                        <Form.Select
                          name="company"
                          className={`form-control ${
                            touched.company && errors.company
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setCompany(e.target.value.trim());
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        >
                          <option value="" disabled>
                            ----select----
                          </option>
                          <option value="ABC Technologies">
                            ABC Technologies
                          </option>
                          <option value="xyz Technologies">
                            xyz Technologies
                          </option>
                          <option value="pqr Technologies">
                            pqr Technologies
                          </option>
                        </Form.Select>
                        {touched.company && errors.company ? (
                          <p className="text-danger">{errors.company}</p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="m-2">
                      <Form.Group>
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                          name="department"
                          className={`form-control ${
                            touched.department && errors.department
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setDepartment(e.target.value.trim());
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        >
                          <option value="" disabled>
                            ----select----
                          </option>
                          <option value="Web Development">
                            Web Development
                          </option>
                          <option value="IT Management">IT Management</option>
                          <option value="Marketing">Marketing</option>
                        </Form.Select>
                        {touched.department && errors.department ? (
                          <p className="text-danger">{errors.department}</p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="m-2">
                      <Form.Group>
                        <Form.Label>Designation</Form.Label>
                        <Form.Select
                          name="designation"
                          className={`form-control ${
                            touched.designation && errors.designation
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e) => {
                            setDesignation(e.target.value);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        >
                          <option value="" disabled>
                            ----select----
                          </option>
                          <option value="Web Development">
                            Web Development
                          </option>
                          <option value="IT Management">IT Management</option>
                          <option value="Marketing">Marketing</option>
                        </Form.Select>
                        {touched.designation && errors.designation ? (
                          <p className="text-danger">{errors.designation}</p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>
                  </Col>
                </Row>
                <Row className="d-sm-flex d-flex d-md-flex d-lg-none d-xxl-none d-xl-none flex-row justify-content-between align-items-center">
                  <Col className="d-flex justify-content-start align-items-center">
                    <Button
                      className="m-1"
                      variant="secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col className="d-flex justify-content-end align-items-center">
                    <Button
                      className="m-1"
                      type="button"
                      disabled={isSubmitting}
                      onClick={
                        (firstName === ''||
                          lastName === ''||
                          userName === ''||
                          email === ''||
                          password === ''||
                          confirmPassword === ''||
                          mobile === ''||
                          employeeId === ''||
                          joiningDate === ''||
                          company === ''||
                          department === ''||
                          designation === '')||
                        (touched.firstName && errors.firstName) ||
                        (touched.lastName && errors.lastName) ||
                        (touched.userName && errors.userName) ||
                        (touched.email && errors.email) ||
                        (touched.password && errors.password) ||
                        (touched.confirmPassword && errors.confirmPassword) ||
                        (touched.employeeId && errors.employeeId) ||
                        (touched.joiningDate && errors.joiningDate) ||
                        (touched.mobile && errors.mobile) ||
                        (touched.company && errors.company) ||
                        (touched.department && errors.department) ||
                        (touched.designation && errors.designation) 
                          ? handleSubmit
                          : handleAddData
                      }
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>
            </>
          )}
        </Formik>
      </Container>
    </div>
  );
};

export default SchemeAddForm;