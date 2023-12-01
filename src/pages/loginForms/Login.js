import React, { useState } from "react";
import {  Col, Container, Form, Row } from "react-bootstrap";
import MainLogo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Formik } from "formik";
import { LogAndRegSchema } from "./LoginValidation";
import TextInput from "../../components/TextInput";
import { useLoginUserMutation } from "../../redux/api/AuthApi";
import { toast } from "react-toastify";
import BasicButton from "../../components/BasicButton";

const Login = ({ setAuthenticated }) => {
  const [passwordIcon, setPasswordIcon] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();
  const [loginApi, { isLoading }] = useLoginUserMutation();

  const initialValues = {
    email: "",
    loginPassword: "",
  };

  const showPassword = () => {
    let eye = document.getElementById("password");
    if (eye.type === "password") {
      eye.type = "text";
      setPasswordIcon(true);
    } else {
      eye.type = "password";
      setPasswordIcon(false);
    }
  };

//   const handleLogin = () =>{
// history("/admindashboard")
// setAuthenticated(true)
//   }

  const handleLogin = async () => {
    try {
      const response = await loginApi({
        Email: email,
        Password: password,
      });
      console.log(response);

      if (response.error.originalStatus === 200) {
        setEmail("");
        setPassword("");
        // setTimeout(() => {
          setAuthenticated(true);
          history("/scheme");
        // }, 2000);
        
        toast.success(response.error.data,{autoClose:1000});
        console.log("if part");
        console.log(response.error.data);
      } else {
        toast.error(response.error.data,{autoClose:1000});
        console.log("else part");
        console.log(response.error.data);
        setAuthenticated(true);
        history("/scheme");
      }
    } catch (error) {
      toast.error("An error occurred while logging in.");
      console.error(error);
    }
  };

  return (
    <>
     
          <Container className="vh-100 d-flex flex-column flex-wrap-wrap justify-content-center align-items-center">
            <Row>
              <Col>
                <img
                  src={MainLogo}
                  width={80}
                  className="rounded-circle mb-3"
                  alt="..."
                ></img>
              </Col>
            </Row>
            <Row className="shadow p-3 mb-5 bg-body rounded d-flex flex-column justify-content-center align-items-center">
              <Col className="d-flex flex-column justify-content-center align-items-center">
                <h5>Login</h5>
                <p className="text-secondary">Welcome back! Please enter your details</p>
              </Col>
              <Col>
                <Formik
                  initialValues={initialValues}
                  validationSchema={LogAndRegSchema}
                  onSubmit={handleLogin}
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
                    <Form className="d-flex flex-column justify-content-center">
                      <TextInput
                        htmlFor="email"
                        label={"Email"}
                        name="email"
                        type="email"
                        size="md"
                        id="email"
                        className={`form-control ${
                          touched.email && errors.email ? "is-invalid" : ""
                        }`}
                        onChange={(e) => {
                          setEmail(e.target.value.trim());
                          handleChange(e);
                        }}
                        onBlur={handleBlur}
                        validation={
                          touched.email && errors.email ? (
                            <p className="text-danger">{errors.email}</p>
                          ) : (
                            ""
                          )
                        }
                      />
                      <Row className="d-flex mt-2 flex-row justify align-items-center">
                        <Col className="d-flex flex-row justify-end align-items-center">
                          <Form.Label
                            htmlFor="password*"
                            className="d-flex flex-row justify-start"
                          >
                            Password<span className="text-danger">*</span>
                          </Form.Label>
                        </Col>
                      </Row>
                      <Row className="d-flex flex-row justify-between align-items-center">
                        <Col className="d-flex flex-row justify-content-end align-items-center">
                          <Form.Control
                            name="loginPassword"
                            type="password"
                            size="md"
                            id="password"
                            className={`position-relative form-control ${
                              touched.loginPassword && errors.loginPassword
                                ? "border-danger"
                                : ""
                            }`}
                            onChange={(e) => {
                              setPassword(e.target.value.trim());
                              handleChange(e);
                            }}
                            onBlur={handleBlur}
                          ></Form.Control>
                          <div
                            className="position-absolute m-2 pointer"
                            onClick={showPassword}
                          >
                            {
                              password ?(
                                <>
                                {!passwordIcon ? (
                              <AiOutlineEyeInvisible />
                            ) : (
                              <AiOutlineEye />
                            )}
                                </>
                              ):
                              (
                                ""
                              )
                            }
                          </div>
                        </Col>
                      </Row>
                      {touched.loginPassword && errors.loginPassword ? (
                        <p className="text-danger">{errors.loginPassword}</p>
                      ) : (
                        ""
                      )}

                      <BasicButton
                       className="mt-3 "
                       variant={'primary'}
                       type="button"
                        disabled={isSubmitting}
                        onClick={
                          email === "" ||
                          password === "" ||
                          (touched.email && errors.email) ||
                          (touched.loginPassword && errors.loginPassword)
                            ? handleSubmit
                            : handleLogin
                        }
                        isLoading={isLoading}
                        label={"Login"}
                      />
                      
                    
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Container>
        </>
      
  );
};

export default Login;
