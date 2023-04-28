import React from "react";
import styled from "styled-components";
import bg from "../Assets/Images/bg.png";

const BgSlider = ({ children }) => {
  return <StripBg>{children}</StripBg>;
};

export default BgSlider;

const StripBg = styled.div`
  background-image: url(${bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  @media only screen and (max-width: 991px) {
    height: 100%;
    background-repeat: repeat-y;
  }
  @media only screen and (max-width: 380px) {
    height: 100%;
    background-repeat: repeat-y;
  }
`;
