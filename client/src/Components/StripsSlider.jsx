import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import BgSlider from "../Utils/BgSlider";
import strip1 from "../Assets/strips/strip1.png";
import strip2 from "../Assets/strips/strip2.png";
import strip3 from "../Assets/strips/strip3.png";
import styled from "styled-components";
import NextArrow from "../Utils/NextArrow";
import PrevArrow from "../Utils/PrevArrow";

const StripsSlider = ({ yearValue }) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  const settingsSlider = {
    fade: true,
  };
  const settingsAsNavFor = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [stripSlider, setStripSlider] = useState([]);
  const { month, year } = useParams();
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const sliderValue = {
    year: year,
    month: month,
  };
  const geEventData = async () => {
    await axios
      .post("/api1/strip_list", sliderValue, options)
      .then((res) => {
        setStripSlider(res.data.response.strips);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  useEffect(() => {
    geEventData();
  }, []);

  return (
    <BgSlider>
      <SliderContainer>
        <Slider
          asNavFor={nav2}
          ref={(slider1) => setNav1(slider1)}
          {...settingsSlider}
        >
          {stripSlider.map((item) => {
            return (
              <SliderImg>
                <h5>{item.date}</h5>
                <img src={strip3} alt="" />
              </SliderImg>
            );
          })}
          {/* <SliderImg>
            <h5>January 1,2023</h5>
            <img src={strip3} alt="" />
          </SliderImg>
          <SliderImg>
            <h5>January 2,2023</h5>
            <img src={strip1} alt="" />
          </SliderImg>
          <SliderImg>
            <h5>January 3,2023</h5>
            <img src={strip2} alt="" />
          </SliderImg>
          <SliderImg>
            <h5>January 4,2023</h5>
            <img src={strip1} alt="" />
          </SliderImg>
          <SliderImg>
            <h5>January 5,2023</h5>
            <img src={strip2} alt="" />
          </SliderImg>
          <SliderImg>
            <h5>January 6,2023</h5>
            <img src={strip3} alt="" />
          </SliderImg> */}
        </Slider>
        {/* <Slider
          asNavFor={nav1}
          ref={(slider2) => setNav2(slider2)}
          className="asNavGrid"
          {...settingsAsNavFor}
        >
          {stripSlider.map((item) => {
            return (
              <AsNavFor>
                <h5>{item.date}</h5>
                <img src={item.image} alt="" />
              </AsNavFor>
            );
          })}
          <AsNavFor>
            <img src={strip3} alt="" />
          </AsNavFor>
          <AsNavFor>
            <img src={strip1} alt="" />
          </AsNavFor>
          <AsNavFor>
            <img src={strip2} alt="" />
          </AsNavFor>
          <AsNavFor>
            <img src={strip1} alt="" />
          </AsNavFor>
          <AsNavFor>
            <img src={strip2} alt="" />
          </AsNavFor>
          <AsNavFor>
            <img src={strip3} alt="" />
          </AsNavFor>
        </Slider> */}
      </SliderContainer>
    </BgSlider>
  );
};

export default StripsSlider;

const SliderContainer = styled.div``;

const SliderImg = styled.div`
  padding: 2rem calc((100vw - 1200px) / 2);
  padding-bottom: 10rem;
  img {
    margin: auto;
    height: 450px;
    width: 90%;
  }
  h5 {
    margin-left: 50px;
    margin-bottom: 4px;
    padding: 10px;
    font-weight: 600;
    font-size: 20px;
    font-family: "TillanaSemiBold";
  }
  @media only screen and (max-width: 991px) {
    /* padding: 5rem calc((100vw - 1200px) / 2); */
  padding-bottom: 15rem;
    img {
      margin: auto;
      height: 200px;
      width: 90%;
    }
  }
  @media only screen and (max-width: 380px) {
    padding-top: 1.5rem;
    h5 {
      margin-left: 16px;
    }
  }
`;

const AsNavFor = styled.div`
  margin-top: 20px;
  img {
    margin: auto;
    height: 100px;
    width: 200px;
  }
`;
