import React from "react";
import styled from "styled-components";

const ModalArrowRight = (props) => {
  const { onClick } = props;

  return (
    <ArrowRight className="button-55" onClick={onClick}>
      <i class="fa-solid fa-arrow-right"></i>
    </ArrowRight>
  );
};

export default ModalArrowRight;

const ArrowRight = styled.div`
  position: absolute;
  top: 45%;
  right: 0%;
  z-index: 10000;
  background-color: #dffd70;
  padding: 4px 10px;
  margin-top: 1.2rem;
  margin-left: 1.5rem;

  @media only screen and (max-width: 991px) {
    position: absolute;
    top: 85%;
    right: 40%;
    transform: translate(-55%, -15%);
  }
`;
