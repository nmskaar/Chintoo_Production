import React, { useEffect } from "react";
import Aos from "aos";
import styled from "styled-components";
import All from "../Assets/Images/All.png";
import ChintooBooks from "../Assets/Images/ChintooBooks.png";
import ChintoochiAaji from "../Assets/Images/ChintoochiAaji.png";

const HomeCards = () => {
  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);
  return (
    <CardsContainer>
      <CardsGrid>
        <Card data-aos="fade-down">
          <h3>Characters</h3>
        </Card>
        <Card data-aos="fade-down">
          <h3>Animations</h3>
        </Card>
        <Card data-aos="fade-down">
          <h3>Strips</h3>
        </Card>
        <Card data-aos="fade-down">
          <h3>Product</h3>
        </Card>
        <Card data-aos="fade-down">
          <h3>Event</h3>
        </Card>
        <Card data-aos="fade-down">
          <h3>Gallery</h3>
        </Card>
      </CardsGrid>
    </CardsContainer>
  );
};

export default HomeCards;

const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem calc((100vw - 1200px) / 2);
  padding-bottom: 7.5rem;
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0rem;
  grid-row-gap: 1.5rem;
  z-index: 1000;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }
`;

const Card = styled.div`
  position: relative;
  &:nth-child(1) {
    background-image: url(${All});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 350px;
    height: 270px;
  }
  &:nth-child(2) {
    background-image: url(${ChintoochiAaji});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 350px;
    height: 270px;
  }
  &:nth-child(3),
  &:nth-child(4),
  &:nth-child(5),
  &:nth-child(6) {
    background-image: url(${ChintooBooks});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 350px;
    height: 270px;
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

  @media only screen and (max-width: 991px) {
    &:nth-child(1) {
      width: 300px;
      height: 300px;
    }
    &:nth-child(2) {
      width: 300px;
      height: 300px;
    }
    &:nth-child(3) {
      width: 300px;
      height: 300px;
    }
  }
`;
