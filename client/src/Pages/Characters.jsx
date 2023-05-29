import React, { useEffect } from "react";
import CharactersCards from "../Components/CharactersCards";
import styled from "styled-components";
import BgBlack from "../Assets/strips/bg1.png";

const Characters = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <CharacterBg>
      <CharactersCards />
    </CharacterBg>
  );
};

export default Characters;

const CharacterBg = styled.div`
  background-image: url(${BgBlack});
  background-position: center;
  background-repeat: repeat;
  height: 100%;
  width: 100%;
  position: relative;
`;
