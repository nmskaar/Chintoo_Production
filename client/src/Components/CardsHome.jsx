import React, { useEffect } from "react";
import Aos from "aos";
import styled from "styled-components";
import ChintoochiAaji from "../Assets/Images/ChintoochiAaji.jpg";
import ChintooBooks from "../Assets/Images/ChintooBooks.jpg";
import BgCard from "../Assets/Images/BgCard.png";
import { Link } from "react-router-dom";

const CardsHome = ({ toggleButton, toggleTab }) => {
  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);

  return (
    <CardContainer>
      <CardGrid>
        <Card
          data-aos="fade-down"
          to="/characters"
          onClick={() => {
            toggleTab(2);
          }}
        >
          <img src={ChintoochiAaji} alt="" />
          <div className="overlay"></div>
          <h3>Characters</h3>
        </Card>
        <Card
          data-aos="fade-down"
          to="/animation"
          onClick={() => {
            toggleTab(6);
          }}
        >
          <img src={ChintooBooks} alt="" />
          <div className="overlay"></div>
          <h3>Animations</h3>
        </Card>
        <Card
          data-aos="fade-down"
          to="/strips"
          onClick={() => {
            toggleTab(4);
          }}
        >
          <img src={BgCard} alt="" />
          <div className="overlay"></div>
          <h3>Strips</h3>
        </Card>
        <Card
          data-aos="fade-down"
          to="/product"
          onClick={() => {
            toggleTab(5);
          }}
        >
          <img src={BgCard} alt="" />
          <div className="overlay"></div>
          <h3>Product</h3>
        </Card>
        <Card
          data-aos="fade-down"
          to="/events"
          onClick={() => {
            toggleTab(8);
          }}
        >
          <img src={ChintooBooks} alt="" />
          <div className="overlay"></div>
          <h3>Event</h3>
        </Card>
        <Card
          data-aos="fade-down"
          to="/gallery"
          onClick={() => {
            toggleTab(8);
          }}
        >
          <img src={ChintoochiAaji} alt="" />
          <div className="overlay"></div>
          <h3>Gallery</h3>
        </Card>
      </CardGrid>
    </CardContainer>
  );
};

export default CardsHome;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem calc((100vw - 1200px) / 2);
  padding-bottom: 7.5rem;

  @media only screen and (max-width: 991px) {
    padding-bottom: 13rem;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
`;

const Card = styled(Link)`
  position: relative;
  img {
    width: 400px;
    height: 240px;
    object-fit: cover;
    border: 3px solid #000;

    @media only screen and (max-width: 991px) {
      height: 240px;
      width: 335px;
    }
  }
  .overlay {
    position: absolute;
    top: 0%;
    left: 0%;
    background-color: #000;
    opacity: 0.4;
    height: 240px;
    width: 100%;
  }
  h3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 40px;
    font-family: TillanaBold;
  }
`;
