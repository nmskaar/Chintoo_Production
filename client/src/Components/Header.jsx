import React, { useEffect, useState } from "react";
import Aos from "aos";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useAPI } from "../Context/apiContext";
// Header Img Imports
import HeadBg from "../Assets/headerImg/Path.svg";
import mainHeadImg1 from "../Assets/headerImg/chintuedge.png";
import mainHeadImg2 from "../Assets/headerImg/chintooHead.png";
import mainHeadImg3 from "../Assets/headerImg/mainHeadImg3.png";
import mainHeadImg4 from "../Assets/headerImg/edge.png";
import chintoo from "../Assets/headerImg/chintoo.png";
import chintooLogo from "../Assets/headerImg/chintooLogo.png";
import wave from "../Assets/headerImg/wave.png";
import { CgMenuRightAlt } from "react-icons/cg";
import { RxCrossCircled } from "react-icons/rx";
import line from "../Assets/headerImg/line.png";
import navbarPattern from "../Assets/headerImg/navbarPattern.png";
import navRes from "../Assets/headerImg/navRes.png";
import borderRes from "../Assets/headerImg/borderRes.png";
import svgWave from "../Assets/headerImg/svgWave.png";
import lineRes from "../Assets/headerImg/lineRes.png";
import lineNew from "../Assets/headerImg/lineNew.png";
import Logo2 from "../Assets/headerImg/Logo2.png";
import Cover from "../Assets/headerImg/Cover.png";
import BG03 from "../Assets/headerImg/BG03.png";

const Header = ({ toggleButton, toggleTab }) => {
  useEffect(() => {
    Aos.init({ duration: 700 });
  }, []);

  //header logic
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  const [activeMobile, setActiveMobile] = useState(false);

  const { settingsData } = useAPI();

  return (
    <HeaderMain>
      <NavBar>
        <NavBanner>
          <div>{/* <img src={mainHeadImg1} alt="" /> */}</div>
          <div>{/* <img src={mainHeadImg2} alt="" /> */}</div>
          <div>{/* <img src={mainHeadImg3} alt="" /> */}</div>
          <div>{/* <img src={mainHeadImg4} alt="" /> */}</div>
          {click ? null : (
            <>
              {/* {settingsData.map((item) => {
                return (
                  <MainLogo>
                    <img src={chintooLogo} alt="" data-aos="fade-down" />
                  </MainLogo>
                );
              })} */}
              <MainLogo>
                <img src={Logo2} alt="" data-aos="fade-down" />
              </MainLogo>
            </>
          )}
          {click ? null : (
            <MainIcon>
              <img src={Cover} alt="" data-aos="zoom-in-up" />
            </MainIcon>
          )}
        </NavBanner>
      </NavBar>
      <NavListBg>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li>
            <Link
              to="/"
              className={toggleButton === 1 ? "active_nav" : "tabs"}
              onClick={() => {
                toggleTab(1);
                closeMobileMenu();
              }}
            >
              HOME
            </Link>
            <img
              src={lineRes}
              alt=""
              className={toggleButton === 1 ? "active_res" : "none"}
            />
            <img
              src={lineNew}
              alt=""
              className={toggleButton === 1 ? "active_nav" : "none"}
            />
          </li>
          <li>
            <Link
              to="/characters"
              className={toggleButton === 2 ? "active_nav" : "tabs"}
              onClick={() => {
                toggleTab(2);
                closeMobileMenu();
              }}
            >
              CHARACTERS
            </Link>
            <img
              src={lineRes}
              alt=""
              className={toggleButton === 2 ? "active_res" : "none"}
            />
            <img
              src={lineNew}
              alt=""
              className={toggleButton === 2 ? "active_nav" : "none"}
            />
          </li>
          <li>
            <Link
              to="/creator"
              className={toggleButton === 3 ? "active_nav" : "tabs"}
              onClick={() => {
                toggleTab(3);
                closeMobileMenu();
              }}
            >
              CREATORS
            </Link>
            <img
              src={lineRes}
              alt=""
              className={toggleButton === 3 ? "active_res" : "none"}
            />
            <img
              src={lineNew}
              alt=""
              className={toggleButton === 3 ? "active_nav" : "none"}
            />
          </li>
          <li>
            <Link
              to="/strips"
              className={toggleButton === 4 ? "active_nav" : "tabs"}
              onClick={() => {
                toggleTab(4);
                closeMobileMenu();
              }}
            >
              STRIPS
            </Link>
            <img
              src={lineRes}
              alt=""
              className={toggleButton === 4 ? "active_res" : "none"}
            />
            <img
              src={lineNew}
              alt=""
              className={toggleButton === 4 ? "active_nav" : "none"}
            />
          </li>
          <li>
            <Link
              to="/product"
              className={toggleButton === 5 ? "active_nav" : "tabs"}
              onClick={() => {
                toggleTab(5);
                closeMobileMenu();
              }}
            >
              PRODUCTS
            </Link>
            <img
              src={lineRes}
              alt=""
              className={toggleButton === 5 ? "active_res" : "none"}
            />
            <img
              src={lineNew}
              alt=""
              className={toggleButton === 5 ? "active_nav" : "none"}
            />
          </li>
          <li>
            <Link
              to="/animation"
              className={toggleButton === 6 ? "active_nav" : "tabs"}
              onClick={() => {
                toggleTab(6);
                closeMobileMenu();
              }}
            >
              ANIMATIONS
            </Link>
            <img
              src={lineRes}
              alt=""
              className={toggleButton === 6 ? "active_res" : "none"}
            />
            <img
              src={lineNew}
              alt=""
              className={toggleButton === 6 ? "active_nav" : "none"}
            />
          </li>
          <li className="menu-item-has-children">
            <Link to="#" className="drop">
              MEDIA <i className="fa-solid fa-caret-down"></i>
            </Link>
            <img
              src={lineRes}
              alt=""
              className={toggleButton === 7 ? "active_res" : "none"}
            />
            <img
              src={lineNew}
              alt=""
              className={toggleButton === 7 ? "active_nav" : "none"}
            />
            <div className="sub_menu">
              <ul>
                <li>
                  <Link
                    to="/events"
                    className={toggleButton === 7 ? "active_nav" : "tabs"}
                    onClick={() => {
                      toggleTab(7);
                      closeMobileMenu();
                    }}
                  >
                    Events
                  </Link>
                </li>
                <li>
                  <Link
                    to="/gallery"
                    className={toggleButton === 7 ? "active_nav" : "tabs"}
                    onClick={() => {
                      toggleTab(7);
                      closeMobileMenu();
                    }}
                  >
                    Gallery
                  </Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link
              to="/contactus"
              className={toggleButton === 8 ? "active_nav" : "tabs"}
              onClick={() => {
                toggleTab(8);
                closeMobileMenu();
              }}
            >
              <span className="span_a">CONTACT</span>
              <span>US</span>
            </Link>
            <img
              src={lineRes}
              alt=""
              className={toggleButton === 8 ? "active_res" : "none"}
            />
            <img
              src={lineNew}
              alt=""
              className={toggleButton === 8 ? "active_nav" : "none"}
            />
          </li>
        </ul>
      </NavListBg>
      <MenuIcon onClick={handleClick}>
        {click ? (
          <RxCrossCircled className="close_icon" />
        ) : (
          <CgMenuRightAlt className="headIcon" />
        )}
      </MenuIcon>
      {/* {click ? null : <Wave></Wave>} */}
      {/* {click ? null : <Navbg></Navbg>} */}
    </HeaderMain>
  );
};

export default Header;

const HeaderMain = styled.div`
  position: relative;
`;

const NavBar = styled.div`
  position: relative;
  background-image: url(${BG03});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 190px;
`;

const NavBanner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  div:nth-child(1) > img {
    position: absolute;
    top: 0%;
    left: 0%;
    width: 550px;
    height: 195px;
    z-index: 1;
    opacity: 0.4;
  }
  div:nth-child(2) > img {
    position: absolute;
    top: 0%;
    left: 38%;
    width: 185px;
    height: 215px;
    z-index: 1;
    opacity: 0.4;
  }
  div:nth-child(3) > img {
    position: absolute;
    top: 0%;
    left: 49.8%;
    width: 260px;
    height: 200px;
    z-index: 1;
    opacity: 0.4;
  }
  div:nth-child(4) > img {
    position: absolute;
    top: 8%;
    right: 0%;
    z-index: 1;
    width: 440px;
    height: 180px;
    object-fit: cover;
    opacity: 0.4;
  }

  @media only screen and (max-width: 991px) {
    div:nth-child(1) > img,
    div:nth-child(2) > img,
    div:nth-child(3) > img,
    div:nth-child(4) > img {
      display: none;
    }
  }
`;

const MainLogo = styled.div`
  img {
    position: absolute;
    top: 0%;
    left: 2%;
    margin-top: 30px;
    z-index: 10000;
    object-fit: cover;
    width: 250px;
  }
  @media only screen and (max-width: 991px) {
    img {
      top: 2%;
      left: 0.5%;
      width: 170px;
    }
  }
  @media only screen and (max-width: 380px) {
    img {
      width: 180px;
    }
  }
`;

const MainIcon = styled.div`
  position: absolute;
  top: 0%;
  right: 2%;
  margin-top: 27px;
  z-index: 1000000;
  img {
    height: 200px;
  }
  @media only screen and (max-width: 991px) {
    right: 3%;
    img {
      width: 180px;
      height: 200px;
    }
  }
  @media only screen and (max-width: 380px) {
    right: 4%;
    top: 20%;
    img {
      width: 160px;
      height: 150px;
    }
  }
`;

const Navbg = styled.div`
  position: absolute;
  left: 0%;
  top: 90.5%;
  width: 100%;
  height: 80px;
  z-index: 10000;
  margin-top: -18px;
  background-image: url(${navbarPattern});
  background-size: cover;
  background-repeat: no-repeat;

  @media only screen and (max-width: 991px) {
    background-image: url(${navbarPattern});
    height: 70px;
  }
`;

const Wave = styled.div`
  display: block;
  position: absolute;
  left: 0%;
  top: 100%;
  width: 100%;
  height: 50px;
  z-index: 10000;
  margin-top: -15px;
  background-image: url(${svgWave});
  /* background-image: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1349 50" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path fill="rgba(0, 62, 132, 1)" d="M 0 0 C 0 0 0 49 0 49 L 0 49 L 0 0 L 0 0 Z" stroke-width="0"></path> <path fill="rgba(0, 62, 132, 1)" d="M -1 49 C 46 49 46 27 93 27 L 93 27 L 93 0 L -1 0 Z" stroke-width="0"></path> <path fill="rgba(0, 62, 132, 1)" d="M 92 27 C 148 27 148 50 204 50 L 204 50 L 204 0 L 92 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 203 50 C 256.5 50 256.5 26 310 26 L 310 26 L 310 0 L 203 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 309 26 C 365.5 26 365.5 50 422 50 L 422 50 L 422 0 L 309 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 421 50 C 480 50 480 26 539 26 L 539 26 L 539 0 L 421 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 538 26 C 598.5 26 598.5 51 659 51 L 659 51 L 659 0 L 538 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 658 51 C 717 51 717 26 776 26 L 776 26 L 776 0 L 658 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 775 26 C 833.5 26 833.5 50 892 50 L 892 50 L 892 0 L 775 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 891 50 C 947 50 947 26 1003 26 L 1003 26 L 1003 0 L 891 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 1002 26 C 1062.5 26 1062.5 50 1123 50 L 1123 50 L 1123 0 L 1002 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 1122 50 C 1179.5 50 1179.5 26 1237 26 L 1237 26 L 1237 0 L 1122 0 Z" stroke-width="0"></path><path fill="rgba(0, 62, 132, 1)" d="M 1236 26 C 1293.5 26 1293.5 50 1351 50 L 1351 50 L 1351 0 L 1236 0 Z" stroke-width="0"></path><path fill="rgba(47, 73, 94, 1)" d="M 1350 50 C 1350.5 50 1348.5 0 1349 0 L 1349 0 L 1349 0 L 1350 0 Z" stroke-width="0"></path></svg>'); */
  background-size: cover;
  background-repeat: no-repeat;

  @media only screen and (max-width: 991px) {
    background-size: contain;
    height: 50px;
    margin-top: -1px;
  }
`;

const Waves = styled.div`
  position: absolute;
  left: 0%;
  top: 100%;
  width: 100%;
  z-index: 100000;

  img {
    width: 100%;
    height: 42px;
  }

  @media only screen and (max-width: 991px) {
    position: absolute;
    left: 0%;
    top: 98%;
    img {
      width: 100%;
      height: 20px;
    }
  }
`;

const MenuIcon = styled.div`
  display: none;
  .headIcon {
    font-size: 2rem;
  }
  @media only screen and (max-width: 991px) {
    display: block;
    transition: all 0.7s ease-in;
    .headIcon {
      position: absolute;
      top: 80%;
      right: 0;
      transform: translate(-20%, 35%);
      z-index: 10000000;
      font-size: 1.8rem;
      cursor: pointer;
      margin-right: 5px;
      color: #fff;
    }
    .close_icon {
      position: fixed;
      top: 3%;
      right: 1%;
      transform: translate(-20%, 35%);
      z-index: 10000000;
      font-size: 2.7rem;
      cursor: pointer;
      margin-right: 5px;
      color: #003e84;
      transition: all 0.7s ease-in;
    }
  }
`;

const NavListBg = styled.div`
  position: relative;
  /* background-color: #002249; */
  /* background-color: #003e84; */
  background-color: #284b8c;
  width: 100%;
  height: 65px;
  z-index: 100000;

  &::before {
    content: "";
  }

  ul {
    position: absolute;
    top: 45%;
    left: 49%;
    transform: translate(-50%, -40%);
    display: flex;
  }
  ul > li {
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-left: 10px;
  }
  ul > li > img {
    display: none;
    width: 80px;
    object-fit: contain;
    margin-bottom: -3px;
  }
  ul > li:hover img {
    display: block;
  }
  ul > li > a {
    text-decoration: none;
    color: #fff;
    font-size: 17px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 3px 18px;
    font-family: "ForBold";
    transform: scaleY(1.2);
  }
  ul > li > a i {
    margin-left: 10px;
  }
  .drop {
    display: flex;
  }
  ul li .sub_menu {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    width: 160px;
    height: 100px;
    position: absolute;
    right: 9.5%;
    top: 98%;
    backdrop-filter: blur(16px) saturate(180%);
    -webkit-backdrop-filter: blur(16px) saturate(180%);
    background-color: rgba(34, 58, 161, 0.75);
    border-radius: 12px;
    border-radius: 9px;
    padding: 10px 0px;
    transform: translateY(10px);
    transition: all 0.3 ease;
    opacity: 0;
    visibility: hidden;
    z-index: 10000;
  }
  .sub_menu ul {
    display: flex;
    flex-direction: column;
  }
  .sub_menu li {
    list-style: disc !important;
  }
  .sub_menu li a {
    color: #fff;
    padding-right: 70px;
  }
  .nav_list_hover:hover {
    color: #fff !important;
    transition: 0.3s all ease-in-out;
  }
  .active_nav {
    display: block;
    color: #fff !important;
  }
  .none {
    display: none;
  }
  span {
    font-family: "ForBold";
  }
  ul .menu-item-has-children:hover .sub_menu {
    transform: translateY(0px);
    opacity: 1;
    visibility: visible;
  }
  @media only screen and (max-width: 991px) {
    ul li .sub_menu {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      width: 160px;
      height: 100px;
      position: absolute;
      right: 20%;
      top: 76%;
      backdrop-filter: blur(16px) saturate(180%);
      -webkit-backdrop-filter: blur(16px) saturate(180%);
      background-color: rgba(34, 58, 161, 0.75);
      border-radius: 12px;
      border-radius: 9px;
      padding: 10px 0px;
      transform: translateY(10px);
      transition: all 0.3 ease;
      opacity: 0;
      z-index: 10000000;
    }
    ul .menu-item-has-children:hover .sub_menu {
      transform: translateY(0px);
      opacity: 1;
      visibility: visible;
    }
    .sub_menu li a {
      color: #fff !important;
      padding-right: 30px;
      margin-bottom: 0.5rem !important;
    }
  }
  @media only screen and (max-width: 912px) {
    ul li .sub_menu {
      position: absolute;
      right: 38%;
      top: 63%;
    }
  }
  @media only screen and (max-width: 820px) {
    ul li .sub_menu {
      position: absolute;
      right: 36.5%;
      top: 65%;
    }
  }
  @media only screen and (max-width: 768px) {
    ul li .sub_menu {
      position: absolute;
      right: 36%;
      top: 67.3%;
    }
  }
  @media only screen and (max-width: 540px) {
    ul li .sub_menu {
      position: absolute;
      right: 30%;
      top: 74%;
    }
  }
  @media only screen and (max-width: 414px) {
    ul li .sub_menu {
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      width: 160px;
      height: 100px;
      position: absolute;
      right: 25%;
      top: 69.5%;
    }
  }
  @media only screen and (max-width: 412px) {
    ul li .sub_menu {
      position: absolute;
      right: 23%;
      top: 69%;
    }
  }
  @media only screen and (max-width: 393px) {
    ul li .sub_menu {
      position: absolute;
      right: 20%;
      top: 70.5%;
    }
  }
  @media only screen and (max-width: 375px) {
    ul li .sub_menu {
      position: absolute;
      right: 20%;
      top: 76%;
    }
  }
  @media only screen and (max-width: 360px) {
    ul li .sub_menu {
      position: absolute;
      right: 20%;
      top: 73.5%;
    }
  }
  @media (min-width: 992px) {
    .span_a {
      /* color: #fff; */
      padding-right: 5px;
      font-family: "ForBold";
    }
    .spna_a:hover {
      color: #003e84 !important;
    }
    .flex_prop {
      display: flex;
      justify-content: space-between;
    }
  }
  @media only screen and (max-width: 991px) {
    ul {
      /* padding-top: 25rem; */
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    ul > li > a {
      color: #003e84;
      margin-bottom: 20px;
      font-size: 1.2rem;
    }
    .active_nav {
      padding: 3px 18px;
      color: #003e84 !important;
    }
    .active_res {
      display: block;
      position: absolute;
    }
    ul > li > img {
      /* display: none; */
      /* visibility: hidden; */
    }
    .nav-menu {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 200vh;
      position: fixed;
      top: 0%;
      left: -100%;
      opacity: 1;
      transition: all 0.5s ease;
      overflow: hidden;
      padding-top: 25rem;
    }
    .nav-menu.active {
      background-color: #fff;
      left: 50%;
      opacity: 1;
      overflow: hidden;
      transition: all 0.5s ease;
    }
  }
`;
