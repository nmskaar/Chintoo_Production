import React from "react";
import styled from "styled-components";
import BgBlack from "../Assets/strips/bgb&W.png";

const BgCharacter = ({ children }) => {
  return (
    <BgContainer>
      <BgPage>
        <div className="chintoo_overlay"></div>
      </BgPage>
      <main>{children}</main>
    </BgContainer>
  );
};

export default BgCharacter;

const BgContainer = styled.div`
  overflow: hidden;
`;
const BgPage = styled.div`
  position: absolute;
  left: 0%;
  top: 40%;
  bottom: 0%;
  background-image: url(${BgBlack});
  background-position: center;
  background-size: contain;
  height: 250vh;
  width: 100%;
  opacity: 0.2;
  z-index: -1;

  .chintoo_overlay {
    position: absolute;
    left: 0%;
    background-color: #dbd7d7;
    height: 250vh;
    width: 100%;
    opacity: 0.2;
  }
  @media only screen and (max-width: 991px) {
    height: 450vh;
    top: 30%;
    .chintoo_overlay {
      height: 450vh;
    }
  }
  @media only screen and (max-width: 540px) {
    height: 580vh;
    .chintoo_overlay {
      height: 580vh;
    }
  }
  @media only screen and (max-width: 414px) {
    height: 470vh;
    .chintoo_overlay {
      height: 470vh;
    }
  }
  @media only screen and (max-width: 412px) {
    height: 460vh;
    .chintoo_overlay {
      height: 460vh;
    }
  }
  @media only screen and (max-width: 393px) {
    height: 500vh;
    .chintoo_overlay {
      height: 500vh;
    }
  }
  @media only screen and (max-width: 380px) {
    height: 620vh;
    .chintoo_overlay {
      height: 620vh;
    }
  }
  @media only screen and (max-width: 375px) {
    height: 640vh;
    .chintoo_overlay {
      height: 640vh;
    }
  }
  @media only screen and (max-width: 360px) {
    height: 570vh;
    .chintoo_overlay {
      height: 570vh;
    }
  }
`;
