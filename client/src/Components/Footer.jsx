import React from "react";
import styled from "styled-components";
import payment from "../Assets/Images/payment.png";
import footerBg from "../Assets/headerImg/footerBg.png";
import navbarPattern from "../Assets/headerImg/navbarPattern.png";
import navRes from "../Assets/headerImg/navRes.png";

const Footer = () => {
  return (
    <FooterMain>
      {/* <FooterWave></FooterWave> */}
      {/* <FooterBg></FooterBg> */}
      <FoooterContainer>
        <FooterCard>
          <p>Copyright © 2021 CBT Technoart. All Rights Reserved.</p>
        </FooterCard>
        <FooterCard>
          <div>
            <p>We're using safe payment for</p>
            <img src={payment} alt="" />
          </div>
        </FooterCard>
      </FoooterContainer>
    </FooterMain>
  );
};

export default Footer;

const FooterMain = styled.div`
  position: absolute;
  left: 0%;
  bottom: 0%;
  width: 100%;
`;
const FoooterContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: space-between;
  /* background-color: #003e84; */
  background-color: #284b8c;
  color: #fff;
  padding: 20px 25px;
  padding-top: 27px;
  padding-bottom: 10px;
  z-index: 100000;

  @media only screen and (max-width: 991px) {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 28px 25px;
    padding-bottom: 15px;
  }
`;

const FooterCard = styled.div`
  div {
    display: flex;
  }
  p {
    text-align: center;
    /* font-family: "TillanaSemiBold"; */
    font-family: "ForBold";
    color: #fff;
  }
  div > p {
    margin-right: 13px;
    text-align: center;
    /* font-family: "TillanaSemiBold"; */
    font-family: "ForBold";
    color: #fff;
  }
  @media only screen and (max-width: 991px) {
    div {
      display: flex;
      flex-direction: column;
    }
    div > img {
      object-fit: cover;
      margin-top: 10px;
    }
  }
`;

const FooterBg = styled.div`
  position: absolute;
  left: 0%;
  bottom: 55%;
  width: 100%;
  height: 80px;
  margin-bottom: -10px;
  z-index: 10;
  background-image: url(${navbarPattern});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* transform: rotate(180deg); */

  @media only screen and (max-width: 991px) {
    bottom: 85%;
    background-image: url(${navRes});
  }
`;

const FooterWave = styled.div`
  display: block;
  position: absolute;
  left: 0%;
  bottom: 100%;
  width: 100%;
  height: 50px;
  z-index: 1000;
  margin-bottom: -6px;
  background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1349 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="rgba(0, 62, 132, 1)" d="M 0 0 C 0 0 0 49 0 49 L 0 49 L 0 0 L 0 0 Z" stroke-width="0"></path> <path fill="rgba(0, 62, 132, 1)" d="M -1 49 C 46 49 46 27 93 27 L 93 27 L 93 0 L -1 0 Z" stroke-width="0"></path> <path fill="rgba(0, 62, 132, 1)" d="M 92 27 C 148 27 148 50 204 50 L 204 50 L 204 0 L 92 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 203 50 C 256.5 50 256.5 26 310 26 L 310 26 L 310 0 L 203 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 309 26 C 365.5 26 365.5 50 422 50 L 422 50 L 422 0 L 309 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 421 50 C 480 50 480 26 539 26 L 539 26 L 539 0 L 421 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 538 26 C 598.5 26 598.5 51 659 51 L 659 51 L 659 0 L 538 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 658 51 C 717 51 717 26 776 26 L 776 26 L 776 0 L 658 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 775 26 C 833.5 26 833.5 50 892 50 L 892 50 L 892 0 L 775 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 891 50 C 947 50 947 26 1003 26 L 1003 26 L 1003 0 L 891 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 1002 26 C 1062.5 26 1062.5 50 1123 50 L 1123 50 L 1123 0 L 1002 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 1122 50 C 1179.5 50 1179.5 26 1237 26 L 1237 26 L 1237 0 L 1122 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 1236 26 C 1293.5 26 1293.5 50 1351 50 L 1351 50 L 1351 0 L 1236 0 Z" stroke-width="0"></path><path fill="rgba(47, 73, 94, 1)" d="M 1350 50 C 1350.5 50 1348.5 0 1349 0 L 1349 0 L 1349 0 L 1350 0 Z" stroke-width="0"></path></svg>');
  background-size: cover;
  background-repeat: no-repeat;
  transform: rotate(180deg);

  @media only screen and (max-width: 1332px) {
    position: absolute;
    left: 0%;
    bottom: 98%;
    background-size: contain;
  }
`;
