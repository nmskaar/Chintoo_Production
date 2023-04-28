import React from "react";
import styled from "styled-components";
import StripCard from "../Components/StripCard";
import BgStrips from "../Utils/BgStrips";
import bg from "../Assets/Images/bg.png";

const Strips = () => {
  return (
    <div>
      <BgStrips>
        <StripCard />
      </BgStrips>
    </div>
  );
};

export default Strips;

const StripBg = styled.div`
  background-image: url(${bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;
