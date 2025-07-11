import React from 'react';
import { Button, Card } from 'react-bootstrap';

interface UniversalCardProps {
  title: string;
  image?: string;
  description?: string;
  onClick?: () => void;
  buttonLabel?: string;
  buttonVariant?: string;
  showButton?: boolean;
  children?: React.ReactNode;
   statusText?: string; 
}

const UniversalCard: React.FC<UniversalCardProps> = ({
  title,
  image,
  description,
  onClick,
  buttonLabel = "Voir plus",
  buttonVariant = "primary",
  showButton = true,
  children,
    statusText,
}) => {
  return (
    <Card style={{ width: '18rem' }} className="m-3 shadow-sm">
      {image && <Card.Img variant="top" src={image} alt={title} />}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {description && <Card.Text>{description}</Card.Text>}
        {children}
         {statusText && (
          <div className="mb-2">
            <span className="text-danger fw-bold">{statusText}</span>
          </div>
        )}
        {onClick && showButton && (
          <Button variant={buttonVariant} onClick={onClick}>
            {buttonLabel}
          </Button>
        )}
      </Card.Body>
    </Card>
  );
};

export default UniversalCard;
