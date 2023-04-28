import React from "react";
import { useAPI } from "../Context/apiContext";
import styled from "styled-components";
import BgBlack from "../Assets/strips/bg1.png";

const PrivacyPage = () => {
  const { settingsData } = useAPI();
  return (
    <PrivacyBg>
      <PrivacyContainer>
        <h2>Privacy Policy</h2>
        {/* <div className="privacy">
          <h4>
            Last Modified: <span>March 4, 2021</span>
          </h4>
        </div> */}
        <p>{/* {settingsData.privacy_policy} */}</p>
        {settingsData.map((item) => {
          return (
            <>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.privacy_policy,
                }}
              />
              <h2>Refund Policy</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.refund_policy,
                }}
              />
              <h2>Shipping Policy</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.shipping_policy,
                }}
              />
              <h2>Returns Policy</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.returns_exchange,
                }}
              />
              <h2>Disclaimer</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.disclaimer,
                }}
              />
            </>
          );
        })}
        {/* <div className="link">
          <a href="#">Our Mission to Protect Privacy</a>
          <a href="#">Information We Collect</a>
          <a href="#">How We Use Information & Why</a>
          <a href="#">Who We Share Your Information With & Why</a>
          <a href="#">Parental Control and Choices</a>
          <a href="#">Educational Services</a>
          <a href="#">Changes to this Privacy Policy</a>
          <a href="#">Contact Us</a>
        </div> */}
      </PrivacyContainer>
    </PrivacyBg>
  );
};

export default PrivacyPage;

const PrivacyBg = styled.div`
  background-image: url(${BgBlack});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: relative;
`;

const PrivacyContainer = styled.div`
  padding: 8rem calc((100vw - 1100px) / 2);
  padding-top: 5rem;
  z-index: 10000;
  @media only screen and (max-width: 991px) {
    padding: 4rem calc((100vw - 1000px) / 2);
    padding-bottom: 15rem;
    margin: 0px 15px;
  }

  h2 {
    margin-bottom: 1.2rem;
    font-size: 30px;
    font-weight: 500;
    font-family: "TillanaSemiBold";
  }
  p {
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 0.7rem;
    font-family: "TillanaSemiBold";
  }
  h4 {
    font-family: "TillanaSemiBold";
    font-size: 1.3rem;
    span {
      color: #003e84;
      font-family: "TillanaSemiBold";
    }
  }
  .link {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;

    a {
      margin-bottom: 1rem;
      font-family: "TillanaSemiBold";
      font-size: 18px;
      text-decoration: underline;
    }
  }
  .privacy {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.7rem;

    label {
      font-family: "TillanaSemiBold";
      font-size: 15px;
    }
    select {
      width: 300px;
      padding: 5px 15px;
      background-color: #003e84;
      color: #fff;
      font-family: "TillanaSemiBold";
      border: none;
      outline: none;
      margin-left: 10px;
    }
  }

  @media only screen and (max-width: 991px) {
    h2 {
      margin-bottom: 1.2rem;
      font-size: 25px;
      text-align: center;
    }
    p {
      font-weight: 400;
      font-size: 17px;
      margin-bottom: 0.7rem;
      font-family: "TillanaSemiBold";
    }
    h4 {
      font-family: "TillanaSemiBold";
      font-size: 1.3rem;
      margin-bottom: 0.7rem;
      span {
        color: #003e84;
        font-family: "TillanaSemiBold";
      }
    }
    .link {
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      flex-direction: column;

      a {
        margin-bottom: 1rem;
        font-family: "TillanaSemiBold";
        font-size: 17px;
        text-decoration: underline;
      }
    }
    .privacy {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      label {
        font-size: 15px;
        text-align: center;
        display: block;
      }
      select {
        width: 300px;
        background-color: #003e84;
        color: #fff;
        margin-left: 10px;
        margin-bottom: 1rem;
      }
    }
  }
`;
