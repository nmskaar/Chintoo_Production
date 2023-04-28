import React from "react";
import styled from "styled-components";

const ModalArrowLeft = (props) => {
  const { onClick } = props;

  return (
    <ArrowLeft className="button-55" onClick={onClick}>
      <i class="fa-solid fa-arrow-left"></i>
    </ArrowLeft>
  );
};

export default ModalArrowLeft;

const ArrowLeft = styled.div`
  position: absolute;
  top: 45%;
  left: 0%;
  z-index: 10000;
  background-color: #afe3fc;
  padding: 4px 10px;
  margin-top: 1.2rem;
  margin-right: 1.5rem;

  @media only screen and (max-width: 991px) {
    position: absolute;
    top: 85%;
    left: 45%;
    transform: translate(-55%, -15%);
  }
`;
