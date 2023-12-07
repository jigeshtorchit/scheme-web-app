import React, { useState, useEffect } from "react";
import { Button, Card, ListGroup, Form } from "react-bootstrap";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { FiSend } from "react-icons/fi";
import FilterComponent from "./FilterComponent";
import notificationSound from "../assets/images/notification.mp3";
import { useDataFilterMutation } from "../redux/api/FilterApi";

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [suggestions, setSuggestions] = useState(["View Scheme"]); // Initial suggestions
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [getFilterDataFunc] = useDataFilterMutation(1);

  const [audio] = useState(new Audio(notificationSound)); // Replace with the path to your sound file

  const [allMessages, setAllMessages] = useState([
    {
      id: Date.now(),
      text: "Hello, how are you doing? How can I help you today?",
      sender: "bot",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  // const [openAiApiKey] = useState(); // Set your OpenAI API key here
  // const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const closeChat = () => {
    setShowChat(false);
    setSelectedMessages([]);
  };

  const addMessage = (text, sender) => {
    const newMessage = {
      id: Date.now(),
      text,
      sender,
      time: new Date().toLocaleTimeString(),
    };

    console.log(newMessage, "newMessage");
    setAllMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // const getOpenAiResponse = async (userMessage) => {
  //   setIsLoading(true);
  //   if (!openAiApiKey) {
  //     console.error("OpenAI API key is missing.");
  //     setIsLoading(false);
  //     return;
  //   }
  //   console.log(allMessages);
  //   const OPENAI_MODEL = "gpt-3.5-turbo";

  //   try {
  //     // Include the system message as "You" in the messagesForOpenAI array
  //     const messagesForOpenAI = [
  //       { role: "system", content: "You is your helpful assistant." },
  //       ...selectedMessages.map((message) => ({
  //         role: message.sender === "You" ? "user" : "assistant",
  //         content: message.text,
  //       })),
  //       { role: "user", content: userMessage },
  //     ];

  //     const response = await axios.post(
  //       "https://api.openai.com/v1/chat/completions",
  //       {
  //         max_tokens: 50,
  //         model: OPENAI_MODEL,
  //         messages: messagesForOpenAI,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${openAiApiKey}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const openAiResponse = response.data.choices[0]?.message?.content.trim();
  //     if (openAiResponse) {
  //       // Keep "bot" as the sender in your local state
  //       addMessage(openAiResponse, "bot");
  //     }
  //   } catch (error) {
  //     console.error("Error fetching OpenAI response:", error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    // Cleanup audio when component unmounts
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

      // Change the suggestions array when "View Scheme" is clicked
      setSuggestions(["100%", "Minimum 40%", "Minimum 60%", "Minimum 80%"]); // Add more suggestions as needed
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

      // Update suggestions based on the user's selection
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

      // Update suggestions based on the user's gender selection
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

      // Update suggestions based on the user's age group selection
      if (
        suggestion === "0-6" ||
        suggestion === "0-18" ||
        suggestion === "6-18" ||
        suggestion === "18-24" ||
        suggestion === "18-55"
      ) {
        // Fetch and set the list of Indian states as suggestions
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

      // Update suggestions based on the user's state selection
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
        {}
      );
      console.log(selectedMessages);
      try {
        // Modify this line to use your own API endpoint and data structure
        const response = await getFilterDataFunc({
          implementedBy: mergedSuggestions.Income,
          // genderEligibility: mergedSuggestions.age,
          // percentageOfDisability: mergedSuggestions.genderEligibility,
          // age: mergedSuggestions.State,
        });

        console.log(response);
        if (response?.data) {
          const responseData = response?.data;
          responseData.data.forEach((data, index) => {
            const dataMessage = `${index + 1}. ` + data.schemeName;
            addMessage(dataMessage, "bot");
          });

          console.log(responseData.data);
        } else {
          console.log("else part");
          const responseData = response?.error.data;
          const dataMessage = responseData;

          addMessage(dataMessage, "bot");
          console.log(response?.error.data);
          console.log(dataMessage);
        }
      } catch (error) {
        console.error(error);
      }

      handleSendMessage(suggestion);
    }
  };
  // const formatDataMessage = (data) => {
  //   // Customize this function based on the structure of your data
  //   // For example, you might want to loop through the data and create a formatted message
  //   const formattedMessage =  JSON.stringify(data);

  //   return formattedMessage;
  // };

  const handleSendMessage = (msg) => {
    // if (msg.trim() !== "") {
    //   // Add the user's message
    //   addMessage(msg, "You");
    //   // Get and add the OpenAI response
    //   getOpenAiResponse(msg);
    //   // Clear the input field
    //   setNewMessage("");
    // }
  };

  useEffect(() => {
    const chatBody = document.getElementById("chat-body");
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [allMessages]);

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
              height: "350px",
              position: "fixed",
              right: "10px",
              width: "45%",
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
                position: "relative", // Add this line
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span className="text-center">ChatBot</span>
              </div>
              <Button
                variant="outline-light"
                onClick={closeChat}
                style={{
                  position: "absolute", // Add this line
                  right: "8px", // Add this line
                  top: "50%", // Add this line
                  transform: "translateY(-50%)", // Add this line
                }}
              >
                <FaTimes size={20} />
              </Button>
            </Card.Header>
            <Card.Body
              id="chat-body"
              style={{
                maxHeight: "300px", // Increase the height as needed
                overflowY: "auto",
                backgroundColor: "#f4f4f4",
                borderRadius: "0 0 15px 15px",
                flexDirection: "column-reverse",

                // Align messages to the bottom
              }}
            >
              <ListGroup variant="flush">
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
                              borderRadius: "10px",
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
                              borderRadius: "10px",
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
                    key={suggestion}
                    variant="outline-primary"
                    style={{ borderRadius: "20px" }}
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </Card.Body>

            <Card.Footer
              style={{
                backgroundColor: "#f4f4f4",
                borderRadius: "0 0 15px 15px",
                padding: "8px",
                display: "flex",
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
                // disabled={isLoading}
              >
                {/* {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : ( */}
                <FiSend size={20} />
                {/* )} */}
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
            onClick={showChat ? closeChat : toggleChat}
            style={{
              width: "50px",
              height: "50px",
              animation: "blink 1s infinite",
              background: showChat ? "#dc3545" : "green", // Red when open, green when closed
              borderRadius: "50%",
              border: "none",
              color: "#fff",
            }}
          >
            {showChat ? (
              <FaTimes width={100} size={20} />
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
