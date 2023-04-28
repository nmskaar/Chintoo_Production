import React, { useEffect } from "react";
import { useAPI } from "../Context/apiContext";
import styled from "styled-components";
import BgBlack from "../Assets/strips/bg1.png";

const Cookie = () => {
  const { settingsData } = useAPI();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <PrivacyBg>
      <CookieContainer>
        <h2>Terms & Conditions</h2>
        {/* <div className="privacy">
          <h4>
            Last Modified: <span>March 4, 2021</span>
          </h4>
        </div> */}
        {settingsData.map((item) => {
          return (
            <>
              <div
                dangerouslySetInnerHTML={{
                  __html: item.terms_conditions,
                }}
              />
            </>
          );
        })}
        {/* <p>
          We may automatically receive certain information about you and your
          device using browser- or device-based tracking technologies described
          below. These technologies allow us to ensure our services are
          functioning correctly, improve our services, provide and measure
          advertisements, and provide personalized content to you.
        </p>
        <p>
          You can manage how these tracking technologies are used by adjusting
          your device or browser settings and, in some countries, by selecting
          your preferences in a consent management solution. In some cases, you
          can opt out of tracking by our analytics providers by visiting their
          opt-out pages directly.
        </p>
        <h3>TRACKING TECHNOLOGIES AND PURPOSES</h3>
        <ul>
          <li>
            <span>Cookies:</span>Cookies are small data files stored on your
            browser or device. They may be served by the entity that operates
            the website you are visiting (“first-party cookies”) or by other
            companies (“third-party cookies”).
          </li>
          <li>
            <span>Pixels:</span>Pixels are small images on a web page or in an
            email. Pixels collect information about your browser or device and
            can set cookies on your browser.
          </li>
          <li>
            <span>Local Storage:</span>Local storage allows data about your
            browser or device to be stored locally on your browser or device and
            includes HTML5 local storage and browser cache.
          </li>
          <li>
            <span>SDKs:</span>SDKs (also known as “software development kits”)
            are blocks of code, typically provided by our partners, that may be
            installed in our applications. SDKs may help us understand how you
            interact with our applications and may collect information about the
            device and network you use to access our applications, such as the
            advertising ID associated with your device or information about how
            you interact with our applications.
          </li>
        </ul> */}
      </CookieContainer>
    </PrivacyBg>
  );
};

export default Cookie;

const PrivacyBg = styled.div`
  background-image: url(${BgBlack});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: relative;
`;

const CookieContainer = styled.div`
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
    font-size: 35px;
    font-weight: 500;
    font-family: "TillanaSemiBold";
    text-transform: uppercase;
  }
  h3 {
    margin-bottom: 1.2rem;
    font-size: 22px;
    font-weight: 500;
    font-family: "TillanaSemiBold";
    text-transform: uppercase;
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
  ul {
    margin-left: 4rem;
    margin-top: -1rem;
    li {
      font-family: "TillanaSemiBold";
      font-size: 16px;
      margin-bottom: 0.7rem;

      span {
        font-family: "TillanaSemiBold";
        font-size: 20px;
        color: #003e84;
        margin-right: 10px;
      }
    }
  }

  @media only screen and (max-width: 991px) {
    h2 {
      margin-bottom: 1rem;
      font-size: 25px;
      text-align: center;
    }
    h3 {
      margin-bottom: 1rem;
      font-size: 18px;
    }
    p {
      font-size: 18px;
      margin-bottom: 0.7rem;
    }
    h4 {
      font-size: 1rem;
      span {
        color: #003e84;
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
    ul {
      margin-left: 1rem;
      margin-top: -1rem;
      li {
        font-size: 17px;
        margin-bottom: 0.7rem;

        span {
          font-size: 18px;
          color: #003e84;
          margin-right: 10px;
        }
      }
    }
  }
`;
