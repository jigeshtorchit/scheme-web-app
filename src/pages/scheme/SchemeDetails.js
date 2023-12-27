import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSchemeByIdQuery } from "../../redux/api/SchemeApi";
import { Col, Container, Row, Table } from "react-bootstrap";
import Loader from "../loader/Loader";
import { AiOutlineArrowLeft } from "react-icons/ai";

const SchemeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [schemeDetails, setSchemeDetails] = useState({
    ni: "",
    pwds: "",
    schemes: "",
    email: "",
    eligible: "",
    attachmentLink: "",
    websitesLink: "",
    state: "",
    percentofDisability: "",
    annualIncome: "",
    Age: "",
    disabilities: "",
  });

  const { data: schemeData, isLoading } = useGetSchemeByIdQuery(id);

  useEffect(() => {
    if (schemeData) {
      setSchemeDetails({
        ni: schemeData.niProvider || "NILL",
        pwds: schemeData.domainDescription || "NILL",
        schemes: schemeData.schemeName || "NILL",
        email: schemeData.emailAddress || "NILL",
        eligible: schemeData.genderEligibility || "NILL",
        attachmentLink: schemeData.attachments || "NILL",
        websitesLink: schemeData.comments || "NILL",
        state: schemeData.implementedBy || "NILL",
        percentofDisability: schemeData.percentageOfDisability || "NILL",
        annualIncome: schemeData.incomeLimit || "NILL",
        Age: schemeData.Age || "NILL",
        disabilities: schemeData.eligibleDisabilities || "NILL",
      });
    }
  }, [schemeData]);
  const customHeaders = {
    ni: "NI Provider",
    pwds: "Schemes For PWDS",
    schemes: "Schemes",
    email: "Email",
    eligible: "Eligible",
    attachmentLink: "Attachment Link",
    websitesLink: "Website Link",
    state: "State",
    percentofDisability: "Percent of Disability",
    annualIncome: "Annual Income",
    Age: "Age",
    disabilities: "Disabilities",
  };

  return (
    <>
      <Container fluid className="d-flex flex-column w-100">
        <Row className="d-flex flex-row justify-content-start align-items-center mt-2">
          <Col className="d-flex flex-row justify-content-start align-items-center">
            <p
              className="text-center text-dark fs-5"
              style={{ fontWeight: "bold" }}
            >
              <span className="mr-2 pointer" onClick={() => navigate("/")}>
                <AiOutlineArrowLeft size={25} />
              </span>
              Scheme Details
            </p>
          </Col>
        </Row>
        <Row className="d-flex flex-column justify-content-center align-items-center m-2">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <Table bordered hover responsive>
                <thead>
                  <tr style={{ backgroundColor: "white" }}>
                    <th className="text-center">Attribute</th>
                    <th className="text-center">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(schemeDetails).map(([key, value]) => (
                    <tr key={key} style={{ backgroundColor: "white" }}>
                      <th className="text-start">
                        {customHeaders[key] || key}
                      </th>
                      <td className="text-start">
                        {key === "websitesLink" || key === "attachmentLink" ? (
                          <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default SchemeDetails;
