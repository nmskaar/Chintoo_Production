import React, { useState } from "react";
import { useAPI } from "../Context/apiContext";
import Slider from "react-slick";
import styled from "styled-components";

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
      </Slider>
    </SliderDiv>
  );
};

export default MainSlider;

const SliderDiv = styled.div`
  margin-top: 35px;

  @media only screen and (max-width: 991px) {
    margin-top: 20px;
  }
`;

const SliderImg = styled.div`
  img {
    margin: auto;
    height: 450px;
    width: 100%;
  }
  @media only screen and (max-width: 991px) {
    img {
      height: 235px;
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
