import React from 'react';
import { Button, Card } from 'react-bootstrap';

interface UniversalCardProps {
  title: string;
  image?: string;
  description?: string;
  onClick?: () => void;
  buttonLabel?: string;
  children?: React.ReactNode;
}

const UniversalCard: React.FC<UniversalCardProps> = ({
  title,
  image,
  description,
  onClick,
  buttonLabel = "Voir plus",
  children,
}) => {
  return (
    <Card style={{ width: '18rem' }} className="m-3 shadow-sm">
      {image && <Card.Img variant="top" src={image} alt={title} />}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {description && <Card.Text>{description}</Card.Text>}
        {children}
        {onClick && (
          <Button variant="primary" onClick={onClick}>
            {buttonLabel}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default UniversalCard;
