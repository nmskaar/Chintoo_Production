import React from "react";
import styled from "styled-components";
import { IoMdArrowDropleft } from "react-icons/io";

const StripLeft = (props) => {
  const { onClick } = props;
  return (
    <ArrowRight onClick={onClick}>
      <IoMdArrowDropleft className="icon" />
    </ArrowRight>
  );
};

export default StripLeft;

const ArrowRight = styled.div`
  position: absolute;
  top: 45%;
  left: 5%;
  z-index: 10000;
  background-color: #fff;
  height: 70px;
  width: 25px;
  border-radius: 3px;

  .icon {
    font-size: 30px;
    margin-top: 1.2rem;
    margin-left: -0.3rem;
  }

  @media only screen and (max-width: 991px) {
    position: absolute;
    top: 45%;
    left: 1.3%;
    height: 40px;
    width: 25px;
    .icon {
      font-size: 30px;
      margin-top: 0.3rem;
      margin-left: -0.3rem;
    }
  }
`;
