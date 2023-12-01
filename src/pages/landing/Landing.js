import React, { useState } from 'react'
import { Button, Form, InputGroup, Modal } from 'react-bootstrap';
import "./Landing.css"
const Landing = () => {
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
  
    const handleToggleChat = () => {
      setShowChat(true);
    };
  
    const handleCloseChat = () => {
      setShowChat(false);
    };
  
    const handleSendMessage = () => {
      newMessage.trim() !== '' && setMessages([...messages, { text: newMessage, type: 'sent' }]);
      setNewMessage('');
    };
  
    return (
      <div className="domino-chat-bot">
        <Button
          variant="danger"
          className="chat-toggle-btn"
          onClick={handleToggleChat}
          aria-label="Toggle Pizza Order Chat"
        >
          <span role="img" aria-label="Pizza Emoji">
            🍕
          </span>{" "}
          Order Pizza
        </Button>
  
        <Modal show={showChat} onHide={handleCloseChat}>
          <Modal.Header closeButton>
            <Modal.Title>Domino's Chat Bot</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="chat-messages">
              {messages.map((msg) => (
                <div key={msg.id} className={msg.type}>
                  {msg.text}
                </div>
              ))}
            </div>
  
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Type your pizza order..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <InputGroup.Append>
                <Button variant="danger" onClick={handleSendMessage}>
                  Send
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Modal.Body>
        </Modal>
      </div>
    );
  };

export default Landing