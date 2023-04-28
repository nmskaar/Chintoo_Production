import React from "react";
import styled from "styled-components";
import BgBlack from "../Assets/strips/bgb&W.png";

const HomeBg = ({ children }) => {
  return (
    <BgContainer>
      <BgPage>
        <main className="">{children}</main>
        <BgCard>
          <div className="chintoo_overlay"></div>
        </BgCard>
      </BgPage>
    </BgContainer>
  );
};

export default HomeBg;

const BgContainer = styled.div`
  overflow: hidden;
  position: relative;
`;

const BgPage = styled.div`
  .chintoo_overlay {
    position: absolute;
    left: 0%;
    background-color: #dbd7d7;
    height: 100vh;
    width: 100%;
    opacity: 0.2;
  }
`;

const BgCard = styled.div`
  background-image: url(${BgBlack});
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 100vh;
  opacity: 0.2;
`;
