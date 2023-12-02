import React, { useState, useEffect } from "react";
import { Button, Card, ListGroup, Form, Spinner } from "react-bootstrap";
import { FaWhatsapp, FaTimes, FaUser, FaAndroid } from "react-icons/fa";
import axios from "axios";
import FilterComponent from "./FilterComponent";

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [allMessages, setAllMessages] = useState([
    {
      id: Date.now(),
      text: "Hello, how are you doing? How can I help you today?",
      sender: "bot",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [openAiApiKey] = useState(
    "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"
  ); // Set your OpenAI API key here
  const [isLoading, setIsLoading] = useState(false);

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

  const getOpenAiResponse = async (userMessage) => {
    setIsLoading(true);
    if (!openAiApiKey) {
      console.error("OpenAI API key is missing.");
      setIsLoading(false);
      return;
    }

    const OPENAI_MODEL = "gpt-3.5-turbo";

    try {
      // Include the system message as "You" in the messagesForOpenAI array
      const messagesForOpenAI = [
        { role: "system", content: "You is your helpful assistant." },
        ...selectedMessages.map((message) => ({
          role: message.sender === "You" ? "user" : "assistant",
          content: message.text,
        })),
        { role: "user", content: userMessage },
      ];

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          max_tokens: 50,
          model: OPENAI_MODEL,
          messages: messagesForOpenAI,
        },
        {
          headers: {
            Authorization: `Bearer ${openAiApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const openAiResponse = response.data.choices[0]?.message?.content.trim();
      if (openAiResponse) {
        // Keep "bot" as the sender in your local state
        addMessage(openAiResponse, "bot");
      }
    } catch (error) {
      console.error("Error fetching OpenAI response:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      // Add the user's message
      addMessage(newMessage, "You");

      // Get and add the OpenAI response
      getOpenAiResponse(newMessage);

      // Clear the input field
      setNewMessage("");
    }
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
          width: "350px",
          top: "55%", // Adjust the top position as needed
        }}
      >
        {showChat && (
          <Card
            style={{
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Card.Header
              style={{
                backgroundColor: "#007BFF",
                color: "white",
                borderRadius: "15px 15px 0 0",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <span>ChatBot</span>
              </div>
              <div style={{ flex: "1" }}></div>
            </Card.Header>
            <Card.Body
              id="chat-body"
              style={{
                maxHeight: "200px", // Increase the height as needed
                overflowY: "auto",
                backgroundColor: "#f4f4f4",
                borderRadius: "0 0 15px 15px",
                flexDirection: "column-reverse", // Align messages to the bottom
              }}
            >
              <ListGroup variant="flush">
                {allMessages.map((message) => (
                  <ListGroup.Item
                    key={message.id}
                    style={{
                      textAlign: message.sender === "You" ? "left" : "right",

                      border: "0",
                      backgroundColor: "#ffffff",
                      borderRadius: "10px",
                      margin: "5px 0",
                      padding: "8px",
                      marginLeft: message.sender === "bot" ? "10px" : "0",
                      marginRight: message.sender === "You" ? "10px" : "0",
                    }}
                  >
                    {message.sender === "You" && (
                      <FaUser
                        style={{
                          marginRight: "8px",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    )}
                    {message.sender === "bot" && (
                      <FaAndroid
                        style={{
                          marginRight: "8px",
                          width: "20px",
                          height: "20px",
                        }}
                      />
                    )}
                    <strong>
                      {message.sender === "You" ? "You:" : "Bot:"}
                    </strong>{" "}
                    {message.text}
                    <br />
                    <small>{message.time}</small>
                  </ListGroup.Item>
                ))}
              </ListGroup>
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
                variant="primary"
                onClick={handleSendMessage}
                style={{ borderRadius: "0 10px 10px 0", marginLeft: "-1px" }}
                disabled={isLoading}
              >
                {isLoading ? <Spinner animation="border" size="sm" /> : "Send"}
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
            height: "50px", // Adjust the height based on your preference
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
              animation: "blink 1s infinite", // Apply blink animation when chat is open
            }}
          >
            {showChat ? <FaTimes width={100} /> : <FaWhatsapp width={100} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
