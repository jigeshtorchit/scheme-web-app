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
    { id: 1, text: 'Hello! How can I help you?', sender: 'bot' },
    { id: 2, text: 'Sure, we offer a Some Scheme', sender: 'bot' },
    // Add more messages as needed
  ];

  const selectableMessages = [
    { id: 101, text: 'Tell me about your Scheme', sender: 'user' },
    { id: 102, text: 'What are your Scheme?', sender: 'user' },
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
          <Card.Body style={{ maxHeight: '200px', overflowY: 'auto' }}>
            <ListGroup variant="flush">
              {selectedMessages.map((message) => (
                <ListGroup.Item
                  key={message.id}
                  style={{ textAlign: 'left', border: '0' }}
                >
                  Bot: {message.text}
                </ListGroup.Item>
              ))}
              {messages.map((message) => (
                <ListGroup.Item
                  key={message.id}
                  style={{ textAlign: 'left', border: '0' }}
                >
                  Bot: {message.text}
                </ListGroup.Item>
              ))}
              {selectableMessages.map((message) => (
                <ListGroup.Item
                  key={message.id}
                  style={{ textAlign: 'right', border: '0' }}
                >
                  User: {message.text}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card.Body>
          <Card.Footer style={{ marginTop: '10px' }}>
            <div className="selectable-messages">
              {selectableMessages.map((message) => (
                <Button
                  key={message.id}
                  variant={selectedMessages.includes(message) ? 'primary' : 'outline-primary'}
                  onClick={() => handleSelectMessage(message)}
                  className="message-button"
                  style={{ marginBottom: '5px' }}
                >
                  {message.text}
                </Button>
              ))}
            </div>
          </Card.Footer>
        </Card>
      )}
      <div style={{ marginBottom: '10px', marginRight: '10px', marginTop: '10px' }}>
       {
        !showChat ? ( <Button className="chat-icon" onClick={toggleChat}>
        Chat
      </Button>):(
         <Button className="chat-icon" onClick={toggleChat}>
         Close
       </Button>
      )
       }
      </div>
    </div>
  );
};

export default ChatBot;
