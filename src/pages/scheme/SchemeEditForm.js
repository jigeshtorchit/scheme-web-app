import { Formik } from "formik";
import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { schemSchema } from "./schemSchema";
import TextInput from "../../components/TextInput";
import {
  useEditSchemeMutation,
  useGetSchemeByIdQuery,
} from "../../redux/api/SchemeApi";
import { toast } from "react-toastify";
import BasicButton from "../../components/BasicButton";
import { useEffect } from "react";
const SchemeAddForm = () => {
  const navigate = useNavigate();
  const [ni, setNi] = useState("");
  const [pwds, setPwds] = useState("");
  const [schemes, setSchemes] = useState("");
  const [email, setEmail] = useState("");
  const [eligible, setEligible] = useState("");
  const [attachmentLink, setAttachmentLink] = useState("");
  const [websitesLink, setWebsitesLink] = useState("");
  const [state, setState] = useState("");
  const [percentofDisability, setPercentofDisability] = useState("");
  const [annualIncome, setAnnualIncome] = useState("");
  const [Age, setAge] = useState("");
  const [disabilities, setDisabilities] = useState("");
  const { id } = useParams();
  const Id = id.startsWith(":") ? id.slice(1) : id;
  const [EditSchemeData, { isLoading }] = useEditSchemeMutation();
  const { data: schemeData } = useGetSchemeByIdQuery(Id);

  const handleCancel = () => {
    navigate("/admin/scheme");
  };
  useEffect(() => {
    if (schemeData) {
      setAnnualIncome(schemeData.incomeLimit);
      setAttachmentLink(schemeData.attachments);
      setDisabilities(schemeData.eligibleDisabilities);
      setEligible(schemeData.genderEligibility);
      setEmail(schemeData.emailAddress);
      setAge(schemeData.Age);
      setNi(schemeData.niProvider);
      setPercentofDisability(schemeData.percentageOfDisability);
      setPwds(schemeData.domainDescription);
      setSchemes(schemeData.schemeName);
      setState(schemeData.implementedBy);
      setWebsitesLink(schemeData.comments);
    }
  }, [schemeData]);
  const initialValues = {
    ni: "",
    pwds: "",
    schemes: "",
    email: "",
    eligible: "",
    attachmentLink: "",
    state: "",
    percentofDisability: "",
    websitesLink: "",
    annualIncome: "",
    Age: "",
    disabilities: "",
  };
  const handleEditData = async () => {
    try {
      const response = await EditSchemeData({
        id: Id,
        data: {
          niProvider: ni,
          domainDescription: pwds,
          schemeName: schemes,
          emailAddress: email,
          genderEligibility: eligible,
          attachments: attachmentLink,
          comments: websitesLink,
          implementedBy: state,
          percentageOfDisability: percentofDisability,
          incomeLimit: annualIncome,
          age: Age,
          eligibleDisabilities: disabilities,
        },
      });
      if (response.error.originalStatus === 200) {
        setAnnualIncome("");
        setAttachmentLink("");
        setDisabilities("");
        setEligible("");
        setEmail("");
        setAge("");
        setNi("");
        setPercentofDisability("");
        setPwds("");
        setState("");
        setWebsitesLink("");
        toast.success(response.error.data, { autoClose: 2000 });
        setTimeout(() => navigate("/admin/scheme"), 3000);
      } else {
        toast.error(response.error.data, { autoClose: 2000 });
      }
    } catch (error) {
      console.error(error);
      toast.error("Internal Server Error", { autoClose: 2000 });
    }
  };

  return (
    <div>
      <Container fluid>
        <Formik
          initialValues={initialValues}
          validationSchema={schemSchema}
          onSubmit={handleEditData}
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
                <Row className="d-flex flex-column flex-sm-row justify-content-between align-items-center mt-4">
                  <Col className="d-flex flex-row justify-content-xxl-start justify-content-xl-start justify-content-lg-start justify-content-md-center justify-content-sm-center justify-content-center align-items-center m-0 p-0">
                    <h4 className="fw-bold">Edit Scheme Details</h4>
                  </Col>
                  <Col className="d-sm-none d-none d-md-none d-lg-flex d-xxl-flex d-xl-flex flex-row justify-content-end align-items-center">
                    <Button
                      className="m-2 d-flex justify-content-start align-items-center"
                      variant="secondary"
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>

                    <BasicButton
                      className="m-2 d-flex justify-content-start align-items-center text-light"
                      variant={"warning"}
                      type="button"
                      disabled={isSubmitting}
                      onClick={
                        ni === "" ||
                        pwds === "" ||
                        schemes === "" ||
                        email === "" ||
                        eligible === "" ||
                        attachmentLink === "" ||
                        websitesLink === "" ||
                        state === "" ||
                        percentofDisability === "" ||
                        annualIncome === "" ||
                        Age === "" ||
                        disabilities === "" ||
                        (touched.ni && errors.ni) ||
                        (touched.pwds && errors.pwds) ||
                        (touched.schemes && errors.schemes) ||
                        (touched.email && errors.email) ||
                        (touched.eligible && errors.eligible) ||
                        (touched.attachmentLink && errors.attachmentLink) ||
                        (touched.state && errors.state) ||
                        (touched.percentofDisability &&
                          errors.percentofDisability) ||
                        (touched.websitesLink && errors.websitesLink) ||
                        (touched.annualIncome && errors.annualIncome) ||
                        (touched.Age && errors.Age)
                          ? handleSubmit
                          : handleEditData
                      }
                      isLoading={isLoading}
                      label={"Update"}
                    />
                  </Col>
                </Row>
                <Row className=" m-md-5 d-flex flex-wrap flex-lg-row flex-xxl-row flex-xl-row flex-column flex-md-column flex-sm-column shadow rounded bg-white mt-2 justify-content-center ml-xxl-n2 ml-xl-n2 ml-lg-n2">
                  <Col className="p-4 d-flex w-100 h-100  flex-wrap flex-column ">
                    <Col>
                      <h6 className="fw-bold">
                        Government Schemes Information
                      </h6>
                    </Col>
                    <Col className="m-2">
                      <TextInput
                        label={"Name of the respective NI"}
                        htmlFor={"ni"}
                        name={"ni"}
                        id={"ni"}
                        type={"text"}
                        value={ni}
                        onChange={(e) => {
                          setNi(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        className={`form-control ${
                          touched.ni && errors.ni ? "is-invalid" : ""
                        }`}
                        validation={
                          touched.ni && errors.ni ? (
                            <p className="text-danger">{errors.ni}</p>
                          ) : (
                            ""
                          )
                        }
                      />
                    </Col>
                    <Col className="m-2">
                      <TextInput
                        label={"Scheme for PwDs"}
                        htmlFor={"pwds"}
                        name={"pwds"}
                        id={"pwds"}
                        type={"text"}
                        value={pwds}
                        onChange={(e) => {
                          setPwds(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        className={`form-control ${
                          touched.pwds && errors.pwds ? "is-invalid" : ""
                        }`}
                        validation={
                          touched.pwds && errors.pwds ? (
                            <p className="text-danger">{errors.pwds}</p>
                          ) : (
                            ""
                          )
                        }
                      />
                    </Col>
                    <Col className="m-2">
                      <TextInput
                        label={"Schemes"}
                        htmlFor={"schemes"}
                        name={"schemes"}
                        id={"schemes"}
                        type={"text"}
                        value={schemes}
                        onChange={(e) => {
                          setSchemes(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        className={`form-control ${
                          touched.schemes && errors.schemes ? "is-invalid" : ""
                        }`}
                        validation={
                          touched.schemes && errors.schemes ? (
                            <p className="text-danger">{errors.schemes}</p>
                          ) : (
                            ""
                          )
                        }
                      />
                    </Col>
                    <Col className="m-2">
                      <TextInput
                        label={"Eligible"}
                        htmlFor={"eligible"}
                        name={"eligible"}
                        id={"eligible"}
                        type={"text"}
                        value={eligible}
                        onChange={(e) => {
                          setEligible(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        className={`form-control ${
                          touched.eligible && errors.eligible
                            ? "is-invalid"
                            : ""
                        }`}
                        validation={
                          touched.eligible && errors.eligible ? (
                            <p className="text-danger">{errors.eligible}</p>
                          ) : (
                            ""
                          )
                        }
                      />
                    </Col>
                    <Col className="m-2">
                      <TextInput
                        value={attachmentLink}
                        label={"Attachment Link"}
                        htmlFor={"attachmentLink"}
                        name={"attachmentLink"}
                        id={"attachmentLink"}
                        type={"text"}
                        onChange={(e) => {
                          setAttachmentLink(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        className={`form-control ${
                          touched.attachmentLink && errors.attachmentLink
                            ? "is-invalid"
                            : ""
                        }`}
                        validation={
                          touched.attachmentLink && errors.attachmentLink ? (
                            <p className="text-danger">
                              {errors.attachmentLink}
                            </p>
                          ) : (
                            ""
                          )
                        }
                      />
                    </Col>
                    <Col className="m-2">
                      <TextInput
                        label={"Websites Link"}
                        htmlFor={"websitesLink"}
                        name={"websitesLink"}
                        id={"websitesLink"}
                        type={"text"}
                        value={websitesLink}
                        onChange={(e) => {
                          setWebsitesLink(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        className={`form-control ${
                          touched.websitesLink && errors.websitesLink
                            ? "is-invalid"
                            : ""
                        }`}
                        validation={
                          touched.websitesLink && errors.websitesLink ? (
                            <p className="text-danger">{errors.websitesLink}</p>
                          ) : (
                            ""
                          )
                        }
                      />
                    </Col>
                    <Col className="m-2">
                      <Form.Group className="">
                        <Form.Label>
                          State<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          value={state}
                          name="state"
                          className={`form-control ${
                            touched.state && errors.state ? "is-invalid" : ""
                          }`}
                          onChange={(e) => {
                            setState(e.target.value);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        >
                          <option value="" selected disabled>
                            ---select state---
                          </option>
                          <option value="Andhra Pradesh">Andhra Pradesh</option>
                          <option value="Arunachal Pradesh">
                            Arunachal Pradesh
                          </option>
                          <option value="Assam">Assam</option>
                          <option value="Bihar">Bihar</option>
                          <option value="Chhattisgarh">Chhattisgarh</option>
                          <option value="Goa">Goa</option>
                          <option value="Gujarat">Gujarat</option>
                          <option value="Haryana">Haryana</option>
                          <option value="Himachal Pradesh">
                            Himachal Pradesh
                          </option>
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
                          <option value="Jammu and Kashmir">
                            Jammu and Kashmir
                          </option>
                          <option value="Ladakh">Ladakh</option>
                          <option value="Lakshadweep">Lakshadweep</option>
                          <option value="Puducherry">Puducherry</option>
                        </Form.Select>
                        {touched.state && errors.state ? (
                          <p className="text-danger">{errors.state}</p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                    </Col>
                  </Col>
                  <Col className="p-4 d-flex w-100 h-100  flex-wrap flex-column  ">
                    <Col>
                      <h6 className="fw-bold">Disability Information</h6>
                    </Col>
                    <Col className="m-2">
                      <TextInput
                        label={"Disabilities"}
                        htmlFor={"disabilities"}
                        name={"disabilities"}
                        id={"disabilities"}
                        type={"text"}
                        value={disabilities}
                        onChange={(e) => {
                          setDisabilities(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        className={`form-control ${
                          touched.disabilities && errors.disabilities
                            ? "is-invalid"
                            : ""
                        }`}
                        validation={
                          touched.disabilities && errors.disabilities ? (
                            <p className="text-danger">{errors.disabilities}</p>
                          ) : (
                            ""
                          )
                        }
                      />
                    </Col>
                    <Col className="m-2">
                      <TextInput
                        label={"Disability Percentage"}
                        htmlFor={"percentofDisability"}
                        name={"percentofDisability"}
                        id={"percentofDisability"}
                        type={"number"}
                        value={percentofDisability}
                        onChange={(e) => {
                          setPercentofDisability(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        className={`form-control ${
                          touched.percentofDisability &&
                          errors.percentofDisability
                            ? "is-invalid"
                            : ""
                        }`}
                        validation={
                          touched.percentofDisability &&
                          errors.percentofDisability ? (
                            <p className="text-danger">
                              {errors.percentofDisability}
                            </p>
                          ) : (
                            ""
                          )
                        }
                      />
                    </Col>
                    <Col className="m-2">
                      <TextInput
                        label={"Annual Income"}
                        htmlFor={"annualIncome"}
                        name={"annualIncome"}
                        id={"annualIncome"}
                        type={"number"}
                        value={annualIncome}
                        onChange={(e) => {
                          setAnnualIncome(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        className={`form-control ${
                          touched.annualIncome && errors.annualIncome
                            ? "is-invalid"
                            : ""
                        }`}
                        validation={
                          touched.annualIncome && errors.annualIncome ? (
                            <p className="text-danger">{errors.annualIncome}</p>
                          ) : (
                            ""
                          )
                        }
                      />
                    </Col>

                    <Col className="m-2">
                      <Form.Group controlId="Age">
                        <Form.Label>
                          Age<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Select
                          as="select"
                          value={Age}
                          onChange={(e) => {
                            setAge(e.target.value);
                            handleChange(e);
                          }}
                          className={`form-control ${
                            touched.Age && errors.Age ? "is-invalid" : ""
                          }`}
                          onBlur={handleBlur}
                        >
                          <option value="">Select Age</option>
                          <option value="0">0</option>
                          <option value="0-6">0-6</option>
                          <option value="0-18">0-18</option>
                          <option value="6-18">6-18</option>
                          <option value="18-24">18-24</option>
                          <option value="18-55">18-55</option>
                        </Form.Select>
                        {touched.Age && errors.Age && (
                          <p className="text-danger">{errors.Age}</p>
                        )}
                      </Form.Group>
                    </Col>
                    <Col className="m-2">
                      <TextInput
                        label={"Email Address"}
                        htmlFor={"email"}
                        name={"email"}
                        id={"email"}
                        type={"email"}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        className={`form-control ${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                        validation={
                          touched.email && errors.email ? (
                            <p className="text-danger">{errors.email}</p>
                          ) : (
                            ""
                          )
                        }
                      />
                    </Col>
                  </Col>
                </Row>
                <Row className=" mt-3  d-sm-flex d-flex d-md-flex d-lg-none d-xxl-none d-xl-none flex-row justify-content-between align-items-center">
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
                    <BasicButton
                      className={"text-light"}
                      variant={"warning"}
                      type="button"
                      disabled={isSubmitting}
                      onClick={
                        ni === "" ||
                        pwds === "" ||
                        schemes === "" ||
                        email === "" ||
                        eligible === "" ||
                        attachmentLink === "" ||
                        websitesLink === "" ||
                        state === "" ||
                        percentofDisability === "" ||
                        annualIncome === "" ||
                        Age === "" ||
                        disabilities === "" ||
                        (touched.ni && errors.ni) ||
                        (touched.pwds && errors.pwds) ||
                        (touched.schemes && errors.schemes) ||
                        (touched.email && errors.email) ||
                        (touched.eligible && errors.eligible) ||
                        (touched.attachmentLink && errors.attachmentLink) ||
                        (touched.state && errors.state) ||
                        (touched.percentofDisability &&
                          errors.percentofDisability) ||
                        (touched.websitesLink && errors.websitesLink) ||
                        (touched.annualIncome && errors.annualIncome) ||
                        (touched.Age && errors.Age)
                          ? handleSubmit
                          : handleEditData
                      }
                      isLoading={isLoading}
                      label={"Update"}
                    />
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
