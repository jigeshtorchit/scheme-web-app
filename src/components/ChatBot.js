import React, { useState, useEffect } from "react";
import { Button, Card, ListGroup, Form, Row, Col } from "react-bootstrap";
import { FaWhatsapp, FaTimes, FaAngleDown } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import FilterComponent from "./FilterComponent";
import notificationSound from "../assets/images/notification.mp3";
import { useDataFilterMutation } from "../redux/api/FilterApi";
import * as Yup from "yup";
import { Formik } from "formik";
import TextArea from "./TextArea";
import {
  BsEmojiAngry,
  BsEmojiExpressionless,
  BsEmojiFrown,
  BsEmojiLaughing,
  BsEmojiSmile,
} from "react-icons/bs";

export const schema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
});

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [getFilterDataFunc] = useDataFilterMutation(1);
  const [audio] = useState(new Audio(notificationSound));

  const [allMessages, setAllMessages] = useState([]);
  const [phone, setPhone] = useState("");
  const [sendInput, setSendInput] = useState(false);
  const [startChat, setStartChat] = useState(true);
  const [showFeedBack, setShowFeedBack] = useState(false);
  const [rating, setRating] = useState(null);
  const [feedback, setFeedback] = useState("");

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };
  const initialValues = {
    phone: "",
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const closeChat = () => {
    setShowFeedBack(true);
    setSuggestions([]);
    setAllMessages([]);
    setSendInput(false)
    setStartChat(false)
  };

  const addMessage = (text, sender) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      time: new Date().toLocaleTimeString(),
    };

    setAllMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  useEffect(() => {
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const handleSuggestionClick = async (suggestion) => {
    audio.play();
    const indianStates = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
    ];

    if (suggestion === "View Scheme") {
      const newMessages = [
        {
          id: Date.now(),
          text: suggestion,
          sender: "You",
          time: new Date().toLocaleTimeString(),
        },
        {
          id: Date.now() + 1,
          text: "Please select Disabilities",
          sender: "Bot",
          time: new Date().toLocaleTimeString(),
        },
      ];
      const key = {
        test: suggestion,
      };
      setSelectedSuggestions((prevSuggestions) => [...prevSuggestions, key]);

      setAllMessages((prevMessages) => [...prevMessages, ...newMessages]);

      setSuggestions(["100%", "Minimum 40%", "Minimum 60%", "Minimum 80%"]);
    } else if (
      ["100%", "Minimum 40%", "Minimum 60%", "Minimum 80%"].includes(suggestion)
    ) {
      const newMessages = [
        {
          id: Date.now(),
          text: suggestion,
          sender: "You",
          time: new Date().toLocaleTimeString(),
        },
        {
          id: Date.now() + 1,
          text: "Please select Gender",
          sender: "Bot",
          time: new Date().toLocaleTimeString(),
        },
      ];
      const key = {
        genderEligibility: suggestion,
      };
      setSelectedSuggestions((prevSuggestions) => [...prevSuggestions, key]);

      setAllMessages((prevMessages) => [...prevMessages, ...newMessages]);

      if (
        suggestion === "100%" ||
        suggestion === "Minimum 40%" ||
        suggestion === "Minimum 60%" ||
        suggestion === "Minimum 80%"
      ) {
        setSuggestions(["Male", "Female", "Other"]);
      }
    } else if (["Male", "Female", "Other"].includes(suggestion)) {
      const newMessages = [
        {
          id: Date.now(),
          text: suggestion,
          sender: "You",
          time: new Date().toLocaleTimeString(),
        },
        {
          id: Date.now() + 1,
          text: "Please select Age Group",
          sender: "Bot",
          time: new Date().toLocaleTimeString(),
        },
      ];
      const key = {
        age: suggestion,
      };
      setSelectedSuggestions((prevSuggestions) => [...prevSuggestions, key]);

      setAllMessages((prevMessages) => [...prevMessages, ...newMessages]);

      if (
        suggestion === "Male" ||
        suggestion === "Female" ||
        suggestion === "Other"
      ) {
        setSuggestions(["0-6", "0-18", "6-18", "18-24", "18-55"]);
      }
    } else if (["0-6", "0-18", "6-18", "18-24", "18-55"].includes(suggestion)) {
      const newMessages = [
        {
          id: Date.now(),
          text: suggestion,
          sender: "You",
          time: new Date().toLocaleTimeString(),
        },
        {
          id: Date.now() + 1,
          text: "Please select State",
          sender: "Bot",
          time: new Date().toLocaleTimeString(),
        },
      ];
      const key = {
        State: suggestion,
      };
      setSelectedSuggestions((prevSuggestions) => [...prevSuggestions, key]);

      setAllMessages((prevMessages) => [...prevMessages, ...newMessages]);

      if (
        suggestion === "0-6" ||
        suggestion === "0-18" ||
        suggestion === "6-18" ||
        suggestion === "18-24" ||
        suggestion === "18-55"
      ) {
        setSuggestions(indianStates);
      }
    } else if (indianStates.includes(suggestion)) {
      const newMessages = [
        {
          id: Date.now(),
          text: suggestion,
          sender: "You",
          time: new Date().toLocaleTimeString(),
        },
        {
          id: Date.now() + 1,
          text: "Please select Income Limit",
          sender: "Bot",
          time: new Date().toLocaleTimeString(),
        },
      ];

      const key = {
        Income: suggestion,
      };
      setSelectedSuggestions((prevSuggestions) => [...prevSuggestions, key]);

      setAllMessages((prevMessages) => [...prevMessages, ...newMessages]);

      if (
        suggestion === "Andhra Pradesh" ||
        suggestion === "Arunachal Pradesh" ||
        suggestion === "Assam" ||
        suggestion === "Bihar" ||
        suggestion === "Chhattisgarh" ||
        suggestion === "Goa" ||
        suggestion === "Gujarat" ||
        suggestion === "Haryana" ||
        suggestion === "Himachal Pradesh" ||
        suggestion === "Jharkhand" ||
        suggestion === "Karnataka" ||
        suggestion === "Kerala" ||
        suggestion === "Madhya Pradesh" ||
        suggestion === "Maharashtra" ||
        suggestion === "Manipur" ||
        suggestion === "Meghalaya" ||
        suggestion === "Mizoram" ||
        suggestion === "Nagaland" ||
        suggestion === "Odisha" ||
        suggestion === "Punjab" ||
        suggestion === "Rajasthan" ||
        suggestion === "Sikkim" ||
        suggestion === "Tamil Nadu" ||
        suggestion === "Telangana" ||
        suggestion === "Tripura" ||
        suggestion === "Uttar Pradesh" ||
        suggestion === "Uttarakhand" ||
        suggestion === "West Bengal"
      ) {
        setSuggestions([
          "0 to 50,000 INR",
          "50,000 to 1,00,000 INR",
          "1,00,000 INR above",
        ]);
      }
    } else {
      setSuggestions([]);

      const mergedSuggestions = selectedSuggestions.reduce(
        (acc, suggestion) => {
          return { ...acc, ...suggestion };
        },
        {},
      );

      try {
        const response = await getFilterDataFunc({
          data: {
            implementedBy: mergedSuggestions.Income,
          },
          page: 1,
        });

        if (response?.data) {
          const responseData = response?.data;
          responseData.data.forEach((data, index) => {
            const dataMessage = `${index + 1}. ` + data.schemeName;
            addMessage(dataMessage, "bot");
          });
        } else {
          const responseData = response?.error.data;
          const dataMessage = responseData;

          addMessage(dataMessage, "bot");
        }
      } catch (error) {
        console.error(error);
      }

      handleSendMessage(suggestion);
    }
  };

  const handleSendMessage = (msg) => {};

  useEffect(() => {
    const chatBody = document.getElementById("chat-body");
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [allMessages]);

  const handleStartChart = () => {
    setAllMessages([
      {
        id: Date.now(),
        text: "Hello, how are you doing? How can I help you today?",
        sender: "bot",
        time: new Date().toLocaleTimeString(),
      },
    ]);
    setSuggestions(["View Scheme"]);
    setSendInput(true);
    setStartChat(false) 
    setPhone("");
  };

  const handleSendFeedBack = () => {
    setSendInput(false);
    setShowFeedBack(false);
    setShowChat(false);
    setRating(null);
    setStartChat(true)
  };
  return (
    <div>
      <FilterComponent />

      <div
        className={`chat-bot-container ${showChat ? "open" : ""}`}
        style={{
          position: "fixed",
          bottom: "10px",
          right: "10px",
          top: "55%",
          zIndex: 1001
        }}
      >
        {showChat && (
          <Card
            style={{
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              bottom: "100px",
              height: "450px",
              position: "fixed",
              right: "10px",
              width: "35%",
            }}
            className="card-res"
          >
            <Card.Header
              style={{
                backgroundColor: "green",
                color: "white",
                borderRadius: "15px 15px 0 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="text-center">ChatBot</span>
              </div>
              <div onClick={closeChat} className={`pointer ${showFeedBack ? "d-none" : null}`}>
                <FaTimes size={20} />
              </div>
              {/* </Button> */}
            </Card.Header>
            <Card.Body
              id="chat-body"
              style={{
                overflowY: "auto",
                backgroundColor: "#f4f4f4",
                borderRadius: "0 0 15px 15px",
                flexDirection: "column-reverse",
              }}
            >
              <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleStartChart}
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
                    <Form className={`mb-4 ${!startChat ? "d-none" : null}`}>
                      <Form.Group className="mb-4">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Type your Name"
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Type your Email"
                        />
                      </Form.Group>
                      <Form.Group className="mb-4">
                        <Form.Label>
                          Phone<span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          size="md"
                          type="number"
                          placeholder="Type your Phone No."
                          name="phone"
                          value={phone}
                          onChange={(e) => {
                            setPhone(e.target.value);
                            handleChange(e);
                          }}
                          onBlur={handleBlur}
                        />
                        {touched.phone && errors.phone ? (
                          <p className="text-danger">{errors.phone}</p>
                        ) : (
                          ""
                        )}
                      </Form.Group>
                      <Row className="m-0">
                        <Button
                          size="md"
                          onClick={
                            phone === "" || (touched.phone && errors.phone)
                              ? handleSubmit
                              : handleStartChart
                          }
                          disabled={isSubmitting}
                        >
                          Start Chatting
                        </Button>
                      </Row>
                    </Form>
                  </>
                )}
              </Formik>

              <ListGroup
                variant="flush"
                className={`${!sendInput ? "d-none" : null}`}
              >
                {allMessages.map((message) => (
                  <>
                    <ListGroup.Item
                      className="text-wrap"
                      key={message.id}
                      style={
                        message.sender === "You"
                          ? {
                              border: "0",
                              backgroundColor: "white",
                              borderRadius: "20px 0px 30px 20px",
                              margin: "5px 0",
                              padding: "8px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-around",
                              marginLeft: "50px",
                            }
                          : {
                              border: "0",
                              backgroundColor: "lightgray",
                              borderRadius: "0px 20px 20px 30px",
                              margin: "5px 0",
                              padding: "8px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-around",
                              marginRight: "50px",
                            }
                      }
                    >
                      <div className="d-flex ">
                        <strong className="mx-2">
                          {message.sender === "You" ? "You:" : "Bot:"}
                        </strong>{" "}
                        <p className="text-wrap">{message.text}</p>
                      </div>
                      <br />
                    </ListGroup.Item>
                    <small style={{ textAlign: "right" }}>{message.time}</small>
                  </>
                ))}
              </ListGroup>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "8px",
                  flexWrap: "wrap",
                }}
              >
                {suggestions.map((suggestion) => (
                  <Button
                    className={`${!sendInput ? "d-none" : null}`}
                    key={suggestion}
                    variant="outline-primary"
                    style={{ borderRadius: "20px" }}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
              <div className={`${!showFeedBack ? "d-none" : null}`}>
                <Card>
                  <Card.Header>
                  <Card.Title>
                  FeedBack :
                  </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Row className="d-flex flex-column">
                      <Col className="d-flex flex-row justify-content-center align-items-center">
                        {[...Array(5)].map((emoji, index) => {
                          const currentRate = index + 1;
                          const emojiList = [
                            <BsEmojiAngry key="1" color="red" />,
                            <BsEmojiFrown key="2" color="lightcoral" />,
                            <BsEmojiExpressionless color="orange" key="3" />,
                            <BsEmojiSmile key="4" color="yellow" />,
                            <BsEmojiLaughing key="5" color="lightgreen" />,
                          ];

                          return (
                            <label
                              key={index}
                              className="d-flex flex-column align-items-center justify-content-center"
                              style={{ marginBottom: "10px" }}
                            >
                              <div>
                                <span
                                  role="img"
                                  aria-label="emoji"
                                  style={{
                                    fontSize: "50px",
                                    cursor: "pointer",
                                    marginRight: "2px",
                                    marginLeft: "2px",
                                  }}
                                >
                                  {emojiList[index]}
                                </span>
                              </div>
                              <div className="form-check pointer m d-flex align-items-center justify-content-center">
                                <input
                                  type="checkbox"
                                  className="form-check-input pointer"
                                  checked={currentRate === rating}
                                  onChange={() => {
                                    setRating(currentRate);
                                  }}
                                  style={{ width: "20px", height: "20px" }}
                                />
                              </div>
                            </label>
                          );
                        })}
                      </Col>
                      <Col>
                        <TextArea
                          rows={4}
                          onChange={handleFeedbackChange}
                          value={feedback}
                          label={"Comments :"}
                        />
                      </Col>
                    </Row>
                  </Card.Body>
                  <Card.Footer>
                    <Row className="m-0">
                      <Button
                        variant="primary"
                        size="md"
                        onClick={handleSendFeedBack}
                      >
                        Send FeedBack
                      </Button>
                    </Row>
                  </Card.Footer>
                </Card>
              </div>
            </Card.Body>

            <Card.Footer
              className={`${!sendInput ? "d-none" : "d-flex"}`}
              style={{
                backgroundColor: "#f4f4f4",
                borderRadius: "0 0 15px 15px",
                padding: "8px",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                style={{
                  borderRadius: "10px 0 0 10px",
                  borderTop: "none",
                  borderLeft: "none",
                  flex: "1",
                }}
              />
              <Button
                variant="success"
                onClick={handleSendMessage}
                style={{ borderRadius: "0 10px 10px 0", marginLeft: "-1px" }}
              >
                <FiSend size={20} />
              </Button>
            </Card.Footer>
          </Card>
        )}
        <div
          className={`chat-icon-container ${showChat ? "open" : ""}`}
          style={{
            position: "absolute",
            bottom: "0",
            right: "0",
            height: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            className={`chat-icon ${showChat ? "close" : ""}`}
            onClick={showChat ? () => setShowChat(false) : toggleChat}
            style={{
              width: "50px",
              height: "50px",
              animation: "blink 1s infinite",
              background: "green",
              borderRadius: "50%",
              border: "none",
              color: "#fff",
            }}
          >
            {showChat ? (
              <FaAngleDown width={100} size={20} />
            ) : (
              <FaWhatsapp width={100} size={20} />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
