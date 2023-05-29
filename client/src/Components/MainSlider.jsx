import React, { useState } from "react";
import { useAPI } from "../Context/apiContext";
import Slider from "react-slick";
import styled from "styled-components";
import StripRight from "../Utils/StripRight";
import StripLeft from "../Utils/StripLeft";
import strip3 from "../Assets/strips/strip3.png";

const MainSlider = () => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  const settingsAsNavFor = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    nextArrow: <StripRight />,
    prevArrow: <StripLeft />,
  };

  const { sliderData } = useAPI();

  return (
    <SliderDiv>
      <Slider
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}
        {...settingsAsNavFor}
      >
        {sliderData.map((item) => {
          return (
            <SliderImg key={item.slider_id}>
              <img src={item.image} alt="" />
            </SliderImg>
          );
        })}
        {/* <SliderImg>
          <img src={strip3} alt="" />
        </SliderImg>
        <SliderImg>
          <img src={strip3} alt="" />
        </SliderImg>
        <SliderImg>
          <img src={strip3} alt="" />
        </SliderImg> */}
      </Slider>
    </SliderDiv>
  );
};

export default MainSlider;

const SliderDiv = styled.div`
  padding-top: 25px;
  position: relative;

  @media only screen and (max-width: 991px) {
    padding-top: 0px;
  }
`;

const SliderImg = styled.div`
  img {
    margin: auto;
    height: 450px;
    width: 80%;
    border: 15px solid #fff;
  }
  @media only screen and (max-width: 991px) {
    img {
      height: 235px;
      width: 100%;
    }
  }
`;

const AsNavFor = styled.div`
  margin: auto;
  img {
    margin: auto;
    height: 100px;
    width: 200px;
  }
`;
