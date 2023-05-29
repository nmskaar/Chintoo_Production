import React from "react";
import styled from "styled-components";
import { IoMdArrowDropright } from "react-icons/io";

const StripRight = (props) => {
  const { onClick } = props;
  return (
    <ArrowLeft onClick={onClick}>
      <IoMdArrowDropright className="icon" />
    </ArrowLeft>
  );
};

export default StripRight;

const ArrowLeft = styled.div`
  position: absolute;
  top: 45%;
  right: 5%;
  z-index: 10000;
  background-color: #fff;
  height: 70px;
  width: 25px;
  border-radius: 3px;

  .icon {
    font-size: 30px;
    margin-top: 1.2rem;
    margin-left: -0.1rem;
  }

  @media only screen and (max-width: 991px) {
    position: absolute;
    top: 45%;
    right: 3%;
    height: 40px;
    width: 25px;
    .icon {
      font-size: 30px;
      margin-top: 0.3rem;
      margin-left: -0.1rem;
    }
  }
`;
