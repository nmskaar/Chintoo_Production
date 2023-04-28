import React, { useEffect } from "react";
import Aos from "aos";
import styled from "styled-components";
import bg from "../Assets/Images/bg.png";
import satishdada from "../Assets/characters/satishdada.png";
import chintoo1 from "../Assets/characters/chintoo 1.png";

const BgStrips = ({ children }) => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <StripBg>
      <ImgStrips src={satishdada} alt="" data-aos="zoom-out" />
      <ImgStrips2 src={chintoo1} alt="" data-aos="zoom-out" />
      {children}
    </StripBg>
  );
};

export default BgStrips;

const StripBg = styled.div`
  background-image: url(${bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const ImgStrips = styled.img`
  position: absolute;
  top: 10%;
  width: 200px;

  @media only screen and (max-width: 991px) {
    display: none;
  }
`;
const ImgStrips2 = styled.img`
  position: absolute;
  top: 60%;
  right: 0%;
  width: 200px;
  @media only screen and (max-width: 991px) {
    display: none;
  }
`;
