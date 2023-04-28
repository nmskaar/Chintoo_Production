import React, { useEffect } from "react";
import CreatorCards from "../Components/CreatorCards";
import styled from "styled-components";
import BgBlack from "../Assets/strips/bg1.png";

const Creator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <CreaterBg>
        <CreatorCards />
      </CreaterBg>
    </div>
  );
};

export default Creator;

const CreaterBg = styled.div`
  background-image: url(${BgBlack});
  background-position: center;
  background-repeat: repeat;
  height: 100%;
  width: 100%;
  position: relative;
`;
