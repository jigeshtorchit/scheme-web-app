import React from "react";
import { Card } from "react-bootstrap";

const DataCard = ({
  date,
  instituteName,
  centerName,
  state,
  servicesProvided,
  disabilities,
  minimumPercentage,
  male,
  female,
  website,
}) => {
  return (
    <Card className="mb-4 shadow mt-4">
      <Card.Body>
        <Card.Title className="mb-3 h4">{instituteName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {`${state} - ${centerName}`}
        </Card.Subtitle>
        <Card.Text className="mb-3">{servicesProvided}</Card.Text>
        <Card.Text>
          <strong>Disabilities:</strong> {disabilities}
        </Card.Text>
        <Card.Text>
          <strong>Minimum Percentage:</strong> {minimumPercentage}%
        </Card.Text>
        <Card.Text>
          <strong>Gender:</strong>{" "}
          {male && female ? "Both" : male ? "Male" : "Female"}
        </Card.Text>
        <Card.Text>
          <strong>Website:</strong>{" "}
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            {website}
          </a>
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted small">{`Date: ${date}`}</Card.Footer>
    </Card>
  );
};

export default DataCard;
