import React, { useEffect } from "react";
import { useAPI } from "../Context/apiContext";
import Aos from "aos";
import styled from "styled-components";

const CreatorCards = () => {
  const { creatorData } = useAPI();

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);
  return (
    <>
      <CreatorContainer>
        <CreatorsCards>
          {creatorData.map((item) => {
            return (
              <CreatorCard key={item.leader_id}>
                <div className="imgCard" data-aos="zoom-in-up">
                  <img src={item.image} alt="" />
                </div>
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              </CreatorCard>
            );
          })}
        </CreatorsCards>
      </CreatorContainer>
    </>
  );
};

export default CreatorCards;

const CreatorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8rem calc((100vw - 1200px) / 2);
  padding-bottom: 10rem;

  @media only screen and (max-width: 991px) {
    padding: 0rem calc((100vw - 1200px) / 2);
    padding-bottom: 18rem;
  }
`;

const CreatorsCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 3.5rem;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
    margin-top: 0rem;
  }
  @media only screen and (max-width: 380px) {
    grid-template-columns: 1fr;
    grid-gap: 0.5rem;
    margin-top: 5rem;
  }
`;

const CreatorCard = styled.div`
  position: relative;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div > img {
    width: 200px;
    height: 200px;
  }
  .imgCard {
    position: absolute;
    bottom: 50%;
    left: 30%;
    margin: auto;
    z-index: 1000000;
  }
  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    width: 450px;
    background-color: #fff;
    border: 2px solid #000;
    color: #000;
    padding-top: 50px;
    padding-bottom: 20px;
    padding-left: 10px;
    padding-right: 10px;
    margin-top: 140px;
  }
  div:nth-child(2) > h4 {
    font-size: 21px;
    font-weight: normal;
    font-family: "TillanaBold";
  }
  div:nth-child(2) > p {
    font-size: 15px;
    font-weight: 500;
    text-align: center;
    font-family: sans-serif;
    font-family: "TillanaSemiBold";
  }
  div:nth-child(2) > img {
    width: 100px;
    height: 50px;
  }
  @media only screen and (max-width: 991px) {
    div:nth-child(2) {
      width: 300px;
    }
    div > img {
      width: 150px;
      height: 150px;
    }
    .imgCard {
      position: absolute;
      bottom: 55%;
      left: 30%;
      margin: auto;
      z-index: 1000;
    }
  }
`;
