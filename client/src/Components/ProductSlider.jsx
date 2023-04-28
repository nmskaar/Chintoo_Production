import React, { useState, useEffect } from "react";
import Aos from "aos";
import Slider from "react-slick";
import styled from "styled-components";
import NextArrow from "../Utils/NextArrow";
import PrevArrow from "../Utils/PrevArrow";
import product1 from "../Assets/products/product1.png";
import product2 from "../Assets/products/product2.png";
import product3 from "../Assets/products/product3.png";
import product4 from "../Assets/products/product4.png";
import product5 from "../Assets/products/product5.png";
import product6 from "../Assets/products/product6.jpg";
import product7 from "../Assets/products/product7.jpg";
import product8 from "../Assets/products/product8.jpg";
import { Link } from "react-router-dom";

const ProductSlider = () => {
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  const settingsAsNavFor = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
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

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <>
      <SliderDiv>
        <Slider
          asNavFor={nav2}
          ref={(slider1) => setNav1(slider1)}
          {...settingsAsNavFor}
          className="asNavProduct"
        >
          <ProductGrid to="/product-detail">
            <img src={product1} alt="" />
            <ProductData>
              <h4>Lattice Soft Pillow</h4>
              <h3>$73.40</h3>
            </ProductData>
          </ProductGrid>
          <ProductGrid to="/product-detail">
            <img src={product2} alt="" />
            <ProductData>
              <h4>Lattice Soft Pillow</h4>
              <h3>$73.40</h3>
            </ProductData>
          </ProductGrid>
          <ProductGrid to="/product-detail">
            <img src={product3} alt="" />
            <ProductData>
              <h4>Lattice Soft Pillow</h4>
              <h3>$73.40</h3>
            </ProductData>
          </ProductGrid>
          <ProductGrid to="/product-detail">
            <img src={product4} alt="" />
            <ProductData>
              <h4>Lattice Soft Pillow</h4>
              <h3>$73.40</h3>
            </ProductData>
          </ProductGrid>
          <ProductGrid to="/product-detail">
            <img src={product5} alt="" />
            <ProductData>
              <h4>Lattice Soft Pillow</h4>
              <h3>$73.40</h3>
            </ProductData>
          </ProductGrid>
          <ProductGrid to="/product-detail">
            <img src={product6} alt="" />
            <ProductData>
              <h4>Lattice Soft Pillow</h4>
              <h3>$73.40</h3>
            </ProductData>
          </ProductGrid>
          <ProductGrid to="/product-detail">
            <img src={product7} alt="" />
            <ProductData>
              <h4>Lattice Soft Pillow</h4>
              <h3>$73.40</h3>
            </ProductData>
          </ProductGrid>
          <ProductGrid to="/product-detail">
            <img src={product8} alt="" />
            <ProductData>
              <h4>Lattice Soft Pillow</h4>
              <h3>$73.40</h3>
            </ProductData>
          </ProductGrid>
        </Slider>
      </SliderDiv>
    </>
  );
};

export default ProductSlider;

const SliderDiv = styled.div`
  padding: 4rem calc((100vw - 1300px) / 2);
  position: relative;
  padding-top: 1.5rem;
`;

const ProductGrid = styled(Link)`
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  /* background-color: #fff; */

  img {
    height: 270px;
    width: 90%;
    border: 2px solid #002249;
    border-bottom: none;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    background-color: #fff;
  }
  h4 {
    font-weight: 500;
    color: #131313;
  }
  h3 {
    font-weight: 500;
    color: #131313;
  }

  @media only screen and (max-width: 991px) {
    img {
      height: 270px;
      width: 100%;
    }
  }
  @media only screen and (max-width: 380px) {
    img {
      height: 270px;
      width: 100%;
    }
  }
`;

const ProductData = styled.div`
  text-align: center;
  background-color: #e3ecf5;
  padding: 10px 0px;
  width: 90%;
  border: 2px solid #002249;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 9px;
  border-bottom-right-radius: 9px;

  @media only screen and (max-width: 991px) {
    width: 100%;
  }
`;
