import React, { useEffect } from "react";
import { useAPI } from "../Context/apiContext";
import Aos from "aos";
import styled from "styled-components";
import BgBlack from "../Assets/strips/bg1.png";

const CharactersCards = () => {
  const { characterData } = useAPI();

  useEffect(() => {
    Aos.init({ duration: 1200 });
  }, []);

  return (
    <>
      <CharacterContainer>
        <CharacterCards>
          {characterData.map((item) => {
            return (
              <CharacterCard key={item.charactor_id}>
                <div className="imgCard" data-aos="flip-up">
                  <img src={item.image} alt="" />
                </div>
                <div>
                  <h4>{item.name}</h4>
                  <p>{item.description}</p>
                </div>
              </CharacterCard>
            );
          })}
        </CharacterCards>
      </CharacterContainer>
    </>
  );
};

export default CharactersCards;

const CharacterBg = styled.div`
  /* background-image: url(${BgBlack});
  background-position: center;
  background-repeat: repeat; */
  background-color: #bbd97a;
  height: 100%;
  width: 100%;
  position: relative;
`;

const CharacterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem calc((100vw - 1200px) / 2);
  padding-bottom: 7rem;
  @media screen and (max-width: 991px) {
    overflow-x: hidden;
    padding-bottom: 15rem;
  }
`;

const CharacterCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.7rem;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const CharacterCard = styled.div`
  position: relative;
  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  div > img {
    width: 170px;
    height: 170px;
    pointer-events: none;
  }
  div:nth-child(2) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 400px;
    /* height: 200px; */
  }
  div:nth-child(2) > h4 {
    font-size: 21px;
    font-weight: normal;
    background-color: #000;
    padding: 1px 15px;
    color: #fff;
    clip-path: polygon(0 1%, 90% 0, 100% 100%, 11% 100%);
    margin-top: 10px;
    margin-bottom: 7px;
    font-family: "TillanaSemiBold";
  }
  div:nth-child(2) > p {
    font-size: 17px;
    font-weight: 500;
    width: 80%;
    text-align: center;
    font-family: "TillanaSemiBold";
  }

  @media only screen and (max-width: 991px) {
    div:nth-child(2) {
      width: 380px;
    }
    div:nth-child(2) > p {
      width: 90%;
    }
  }
`;
