import React, { useState } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import ModalArrowLeft from "../Utils/ModalArrowLeft";
import ModalArrowRight from "../Utils/ModalArrowRight";
import product1 from "../Assets/products/product1.png";
import product2 from "../Assets/products/product2.png";
import product3 from "../Assets/products/product3.png";
import product4 from "../Assets/products/product4.png";
import product5 from "../Assets/products/product5.png";

const FullScreenModal = ({ setShowModal }) => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  const settingsAsNavFor = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: false,
    nextArrow: <ModalArrowRight />,
    prevArrow: <ModalArrowLeft />,
  };

  return (
    <FullScreenContainer>
      <FullScreenCard>
        <div className="overlay"></div>
        <div className="card">
          <Slider
            className="slider_container"
            asNavFor={nav2}
            ref={(slider1) => setNav1(slider1)}
            {...settingsAsNavFor}
          >
            <SliderImg>
              <img src={product1} alt="" />
            </SliderImg>
            <SliderImg>
              <img src={product2} alt="" />
            </SliderImg>
            <SliderImg>
              <img src={product3} alt="" />
            </SliderImg>
            <SliderImg>
              <img src={product4} alt="" />
            </SliderImg>
            <SliderImg>
              <img src={product5} alt="" />
            </SliderImg>
          </Slider>
        </div>
        <i
          class="fa-solid fa-xmark cancel_modal"
          onClick={() => setShowModal(false)}
        ></i>
      </FullScreenCard>
    </FullScreenContainer>
  );
};

export default FullScreenModal;

const FullScreenContainer = styled.div`
  overflow: hidden;
  .overlay {
    position: fixed;
    left: 0%;
    top: 0%;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0.7;
    z-index: 1000000;
    overflow: hidden;
  }
`;

const FullScreenCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .card {
    position: fixed;
    top: 65%;
    left: 50%;
    transform: translate(-50%, -70%);
    z-index: 1000000000;

    .slider_container {
      width: 800px;
      padding: 10px;
    }
  }
  .cancel_modal {
    position: fixed;
    top: 8%;
    right: 8%;
    z-index: 10000000;
    font-size: 20px;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 50%;
    padding: 10px 15px;
    cursor: pointer;
  }
  @media only screen and (max-width: 991px) {
    .slider_container {
      height: 400px;
    }
  }
`;

const SliderImg = styled.div`
  img {
    margin: auto;
    height: 450px;
    background-color: #fff;
  }
  @media only screen and (max-width: 991px) {
    img {
      height: 335px;
    }
  }
`;
