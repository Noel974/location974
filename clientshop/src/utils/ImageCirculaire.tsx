import React from "react";

interface Props {
  src: string;
  alt?: string;
  size?: number;
  borderColor?: string;
}

const ImageCirculaire: React.FC<Props> = ({
  src,
  alt = "",
  size = 150,
  borderColor = "#3498db",
}) => {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: size,
        
        height: size,
        borderRadius: "50%",
        objectFit: "cover",
        border: `4px solid ${borderColor}`,
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.2)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    />
  );
};

export default ImageCirculaire;
