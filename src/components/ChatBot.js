import React, { useState } from 'react';
import { Button, Card, ListGroup } from 'react-bootstrap';

const ChatBot = () => {
  const [showChat, setShowChat] = useState(false);
  const [selectedMessages, setSelectedMessages] = useState([]);

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  const closeChat = () => {
    setShowChat(false);
    setSelectedMessages([]);
  };

  const messages = [
    { id: 1, text: 'Hello! How can I help you?' },
    { id: 2, text: 'Sure, we offer a some Schemes' },
    // Add more messages as needed
  ];

  const selectableMessages = [
    { id: 101, text: 'Tell me about your Scheme' },
    { id: 102, text: 'What are your Scheme?' },
    // Add more selectable messages as needed
  ];

  const handleSelectMessage = (message) => {
    setSelectedMessages([...selectedMessages, message]);
  };

  return (
    <div className="chat-bot" style={{ position: 'fixed', bottom: '10px', right: '10px', zIndex: 1000 }}>
      {showChat && (
        <Card style={{ width: '300px' }}>
          <Card.Header>
            <Button variant="link" onClick={closeChat} style={{ float: 'right', padding: '0' }}>
              Close
            </Button>
            ChatBot
          </Card.Header>
          <Card.Body>
            <ListGroup variant="flush">
              {selectedMessages.map((message) => (
                <ListGroup.Item key={message.id}>{message.text}</ListGroup.Item>
              ))}
              {messages.map((message) => (
                <ListGroup.Item key={message.id}>{message.text}</ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
          <Card.Footer>
            <div className="selectable-messages">
              {selectableMessages.map((message) => (
                <Button
                  key={message.id}
                  variant={selectedMessages.includes(message) ? 'primary' : 'outline-primary'}
                  onClick={() => handleSelectMessage(message)}
                  className="message-button"
                >
                  {message.text}
                </Button>
              ))}
            </div>
          </Card.Footer>
        </Card>
      )}
      <Button className="chat-icon" onClick={toggleChat}>
        Chat
      </Button>
    </div>
  );
};

export default ChatBot;
