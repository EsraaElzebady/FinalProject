import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({ 
  buttonText, 
  textColor, 
  buttonWidth, 
  linkTo, 
  className 
}) {
  return (
    <Link 
      to={linkTo || "#"} 
      className={` rounded-1xl font-medium text-center ${className}`}
      style={{ 
        color: textColor, 
      
        padding: buttonWidth 
      }}
    >
      {buttonText}
    </Link>
  );
}
