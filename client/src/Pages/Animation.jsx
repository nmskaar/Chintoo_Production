import React, { useEffect } from "react";
import styled from "styled-components";
import bg from "../Assets/Images/bg.png";
import skates from "../Assets/characters/skates.png";
import satishdada from "../Assets/characters/satishdada.png";

const Animation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <StripBg>
        <AnimationData>
          <h2>Coming</h2>
          <h2>Soon</h2>
        </AnimationData>
        <ImgStrip src={skates} alt="" />
        <ImgStrip2 src={satishdada} alt="" />
      </StripBg>
    </div>
  );
};

export default Animation;

const StripBg = styled.div`
  background-image: url(${bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100vh;
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const AnimationData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -60%);
  h2 {
    font-family: "TillanaBold";
    font-size: 35px;
    color: #333;
    margin-right: 8px;
  }
`;

const ImgStrip = styled.img`
  position: absolute;
  right: 4%;
  bottom: 13%;
  height: 250px;

  @media only screen and (max-width: 991px) {
    height: 150px;
    bottom: 28%;
  }
  @media only screen and (max-width: 414px) {
    height: 150px;
    bottom: 22%;
  }
  @media only screen and (max-width: 375px) {
    height: 150px;
    bottom: 28%;
  }
`;

const ImgStrip2 = styled.img`
  position: absolute;
  left: 0%;
  top: 7%;
  height: 200px;
  @media only screen and (max-width: 991px) {
    height: 150px;
  }
`;
