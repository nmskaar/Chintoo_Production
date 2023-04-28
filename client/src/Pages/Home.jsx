import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import BgBlack from "../Assets/strips/bg1.png";
import CardLayout from "../Components/CardLayout";
import CardsHome from "../Components/CardsHome";
import MainSlider from "../Components/MainSlider";

const Home = ({ toggleButton, toggleTab }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Chintoo</title>
        {/* <link rel="icon" id="faviconIcon" href={settingsData.favicon} /> */}
      </Helmet>
      <HomeBg>
        <MainSlider />
        {/* <CardsHome toggleButton={toggleButton} toggleTab={toggleTab} /> */}
        <CardLayout toggleButton={toggleButton} toggleTab={toggleTab} />
      </HomeBg>
    </>
  );
};

export default Home;

const HomeBg = styled.div`
  position: absolute;
  top: 0%;
  left: 0%;
  background-image: url(${BgBlack});
  background-position: center;
  background-repeat: repeat;
  height: 100%;
  width: 100%;
  position: relative;
`;
