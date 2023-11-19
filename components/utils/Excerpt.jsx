import React from "react";

const Excerpt = ({ text, size }) => {
  return (
    <span> {text.length > size ? `${text.substring(0, size)}...` : text}</span>
  );
};

export default Excerpt;
