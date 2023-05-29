import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Aos from "aos";
import ChintoochiAaji from "../Assets/Images/ChintoochiAaji.jpg";
import ChintooBooks from "../Assets/Images/ChintooBooks.jpg";
import BgCard from "../Assets/Images/BgCard.png";

const CardLayout = ({ toggleButton, toggleTab }) => {
  useEffect(() => {
    Aos.init({ duration: 1200 });
    window.scrollTo(0, 0);
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
          <div className="data">
            <h3>Characters</h3>
          </div>
        </Card>
        <Card
          data-aos="fade-down"
          to="/animation"
          onClick={() => {
            toggleTab(6);
          }}
        >
          <img src={ChintooBooks} alt="" />
          <div className="data">
            <h3>Animations</h3>
          </div>
        </Card>
        <Card
          data-aos="fade-down"
          to="/strips"
          onClick={() => {
            toggleTab(4);
          }}
        >
          <img src={BgCard} alt="" />
          <div className="data">
            <h3>Strips</h3>
          </div>
        </Card>
        <Card
          data-aos="fade-down"
          to="/product"
          onClick={() => {
            toggleTab(5);
          }}
        >
          <img src={ChintooBooks} alt="" />
          <div className="data">
            <h3>Product</h3>
          </div>
        </Card>
        <Card
          data-aos="fade-down"
          to="/events"
          onClick={() => {
            toggleTab(7);
          }}
        >
          <img src={ChintoochiAaji} alt="" />
          <div className="data">
            <h3>Event</h3>
          </div>
        </Card>
        <Card
          data-aos="fade-down"
          to="/gallery"
          onClick={() => {
            toggleTab(7);
          }}
        >
          <img src={BgCard} alt="" />
          <div className="data">
            <h3>Gallery</h3>
          </div>
        </Card>
      </CardGrid>
    </CardContainer>
  );
};

export default CardLayout;

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem calc((100vw - 1200px) / 2);
  padding-bottom: 9rem;

  @media only screen and (max-width: 991px) {
    /* padding-bottom: 15rem; */
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 300px);
  grid-gap: 1rem;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-gap: 1rem;
  }
`;

const Card = styled(Link)`
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 15px;

  img {
    width: 100%;
    height: 250px;
    border-radius: 15px 15px 0px 0px;
  }
  h3 {
    font-size: 20px;
    font-weight: 400;
    color: #1b1b1b;
    text-align: center;
    font-family: TillanaBold;
  }

  @media only screen and (max-width: 991px) {
    h3 {
      padding: 5px 0px;
      margin-top: -5px;
    }
  }
`;
