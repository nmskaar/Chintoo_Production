import React from "react";
import styled from "styled-components";

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <ArrowLeft className="button-55" onClick={onClick}>
      <i class="fa-solid fa-arrow-left"></i>
    </ArrowLeft>
  );
};

export default PrevArrow;

const ArrowLeft = styled.div`
  background-color: #afe3fc;
  padding: 4px 10px;
  margin-top: 1.2rem;
  margin-right: 1.5rem;
`;
