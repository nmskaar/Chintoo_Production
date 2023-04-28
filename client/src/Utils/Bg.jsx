import React from "react";
import styled from "styled-components";
import BgBlack from "../Assets/strips/bgb&W.png";

const Bg = ({ children }, props) => {
  return (
    <BgContainer>
      <BgPage>
        <div className="chintoo_overlay"></div>
        <img src={BgBlack} alt="" />
      </BgPage>
      <main className="position">{children}</main>
    </BgContainer>
  );
};

export default Bg;

const BgContainer = styled.div`
  overflow: hidden;
`;
const BgPage = styled.div`
  img {
    width: 100%;
    height: 100vh;
    opacity: 0.2;
    object-fit: cover;
  }

  .chintoo_overlay {
    position: absolute;
    left: 0%;
    background-color: #dbd7d7;
    height: 100vh;
    width: 100%;
    opacity: 0.2;
  }

  @media only screen and (max-width: 991px) {
    img {
      width: 100%;
      height: 110vh;
      opacity: 0.2;
      object-fit: cover;
    }
    .chintoo_overlay {
      position: absolute;
      left: 0%;
      background-color: #dbd7d7;
      height: 110vh;
      width: 100%;
      opacity: 0.2;
    }
  }
  @media only screen and (max-width: 380px) {
    img {
      width: 100%;
      height: 130vh;
      opacity: 0.2;
      object-fit: cover;
    }
    .chintoo_overlay {
      position: absolute;
      left: 0%;
      background-color: #dbd7d7;
      height: 130vh;
      width: 100%;
      opacity: 0.2;
    }
  }
`;
