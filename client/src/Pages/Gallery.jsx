import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  PageInition,
  ArrowLeft,
  ArrowRight,
  PageContainer,
} from "../Styles/CommonStyles";
import Aos from "aos";
import bg from "../Assets/Images/bg.png";
import strip3 from "../Assets/strips/strip3.png";

const Gallery = () => {
  const [toggleBtn, setToggleBtn] = useState(1);
  const [showData, setShowData] = useState(false);

  const togglePage = (index) => {
    setToggleBtn(index);
  };

  const [galleryData, setGalleryData] = useState([]);
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const getGalleryData = async () => {
    await axios
      .post("/api1/gallery_list", options)
      .then((res) => {
        setGalleryData(res.data.response.gallery);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    Aos.init({ duration: 1000, disable: "mobile" });
    getGalleryData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <GalleryBg>
        <GalleryContainer>
          {toggleBtn === 1 ? (
            <>
              <GalleryGrid>
                {galleryData.map((item) => {
                  return (
                    <>
                      <GalleryCard
                        data-aos="zoom-in-right"
                        data-aos-duration="1000"
                        key={item.gallery_id}
                      >
                        <img src={item.image} alt="" />
                        <div
                          className="play_btn"
                          onClick={() => setShowData(true)}
                        >
                          <i class="fa-solid fa-play"></i>
                        </div>
                        <div className="gallery_card_data">
                          <h2>{item.description}</h2>
                          <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Provident quae nihil neque
                          </p>
                        </div>
                      </GalleryCard>
                    </>
                  );
                })}
                {/* <GalleryCard data-aos="zoom-in-right" data-aos-duration="700">
                <img src={strip1} alt="" />
                <div className="play_btn" onClick={() => setShowData(true)}>
                  <i class="fa-solid fa-play"></i>
                </div>
                <div className="gallery_card_data">
                  <h2>Chintoo Ep</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident quae nihil neque
                  </p>
                </div>
              </GalleryCard>
              <GalleryCard data-aos="zoom-in-right" data-aos-duration="1500">
                <img src={strip2} alt="" />
                <div className="play_btn" onClick={() => setShowData(true)}>
                  <i class="fa-solid fa-play"></i>
                </div>
                <div className="gallery_card_data">
                  <h2>Chintoo Ep</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident quae nihil neque
                  </p>
                </div>
              </GalleryCard>
              <GalleryCard data-aos="zoom-in-right" data-aos-duration="1800">
                <img src={strip3} alt="" />
                <div className="play_btn" onClick={() => setShowData(true)}>
                  <i class="fa-solid fa-play"></i>
                </div>
                <div className="gallery_card_data">
                  <h2>Chintoo Ep</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident quae nihil neque
                  </p>
                </div>
              </GalleryCard>
              <GalleryCard data-aos="zoom-in-left" data-aos-duration="700">
                <img src={strip2} alt="" />
                <div className="play_btn" onClick={() => setShowData(true)}>
                  <i class="fa-solid fa-play"></i>
                </div>
                <div className="gallery_card_data">
                  <h2>Chintoo Ep</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident quae nihil neque
                  </p>
                </div>
              </GalleryCard>
              <GalleryCard data-aos="zoom-in-left" data-aos-duration="1500">
                <img src={strip1} alt="" />
                <div className="play_btn" onClick={() => setShowData(true)}>
                  <i class="fa-solid fa-play"></i>
                </div>
                <div className="gallery_card_data">
                  <h2>Chintoo Ep</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident quae nihil neque
                  </p>
                </div>
              </GalleryCard>
              <GalleryCard data-aos="zoom-in-left" data-aos-duration="1800">
                <img src={strip3} alt="" />
                <div className="play_btn" onClick={() => setShowData(true)}>
                  <i class="fa-solid fa-play"></i>
                </div>
                <div className="gallery_card_data">
                  <h2>Chintoo Ep</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident quae nihil neque
                  </p>
                </div>
              </GalleryCard> */}
              </GalleryGrid>

              {/* <PageInition>
                <ArrowLeft className="button-55" onClick={() => togglePage(1)}>
                  <i className="fa-solid fa-arrow-left"></i>
                </ArrowLeft>
                <PageContainer>
                  <div
                    className={toggleBtn === 1 ? "activeTab" : ""}
                    onClick={() => togglePage(1)}
                  >
                    1
                  </div>
                  <div
                    className={toggleBtn === 2 ? "activeTab" : ""}
                    onClick={() => togglePage(2)}
                  >
                    2
                  </div>
                  <div>3</div>
                </PageContainer>
                <ArrowRight className="button-55" onClick={() => togglePage(2)}>
                  <i class="fa-solid fa-arrow-right"></i>
                </ArrowRight>
              </PageInition> */}
            </>
          ) : null}
          {/* {toggleBtn === 2 ? (
            <GalleryGrid>
              <GalleryCard data-aos="zoom-in-right" data-aos-duration="700">
                <img src={strip1} alt="" />
                <div className="play_btn" onClick={() => setShowData(true)}>
                  <i class="fa-solid fa-play"></i>
                </div>
                <div className="gallery_card_data">
                  <h2>Chintoo Ep</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident quae nihil neque
                  </p>
                </div>
              </GalleryCard>
              <GalleryCard data-aos="zoom-in-right" data-aos-duration="1500">
                <img src={strip2} alt="" />
                <div className="play_btn" onClick={() => setShowData(true)}>
                  <i class="fa-solid fa-play"></i>
                </div>
                <div className="gallery_card_data">
                  <h2>Chintoo Ep</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident quae nihil neque
                  </p>
                </div>
              </GalleryCard>
              <GalleryCard data-aos="zoom-in-right" data-aos-duration="1800">
                <img src={strip3} alt="" />
                <div className="play_btn" onClick={() => setShowData(true)}>
                  <i class="fa-solid fa-play"></i>
                </div>
                <div className="gallery_card_data">
                  <h2>Chintoo Ep</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident quae nihil neque
                  </p>
                </div>
              </GalleryCard>
              <GalleryCard data-aos="zoom-in-left" data-aos-duration="700">
                <img src={strip2} alt="" />
                <div className="play_btn" onClick={() => setShowData(true)}>
                  <i class="fa-solid fa-play"></i>
                </div>
                <div className="gallery_card_data">
                  <h2>Chintoo Ep</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident quae nihil neque
                  </p>
                </div>
              </GalleryCard>
              <GalleryCard data-aos="zoom-in-left" data-aos-duration="1500">
                <img src={strip1} alt="" />
                <div className="play_btn" onClick={() => setShowData(true)}>
                  <i class="fa-solid fa-play"></i>
                </div>
                <div className="gallery_card_data">
                  <h2>Chintoo Ep</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident quae nihil neque
                  </p>
                </div>
              </GalleryCard>
              <GalleryCard data-aos="zoom-in-left" data-aos-duration="1800">
                <img src={strip3} alt="" />
                <div className="play_btn" onClick={() => setShowData(true)}>
                  <i class="fa-solid fa-play"></i>
                </div>
                <div className="gallery_card_data">
                  <h2>Chintoo Ep</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Provident quae nihil neque
                  </p>
                </div>
              </GalleryCard>
            </GalleryGrid>
          ) : null} */}
        </GalleryContainer>
        <GalleryModal className={showData ? "active" : "none"}>
          <GalleryModalData>
            <GalleryOverlay></GalleryOverlay>
            <div className="center_modal">
              <img src={strip3} alt="" />
            </div>
            <div className="close" onClick={() => setShowData(false)}>
              <i class="fa-solid fa-xmark"></i>
            </div>
          </GalleryModalData>
        </GalleryModal>
      </GalleryBg>
    </div>
  );
};

export default Gallery;

const GalleryBg = styled.div`
  background-image: url(${bg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: relative;
`;

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8rem calc((100vw - 1100px) / 2);
  @media only screen and (max-width: 991px) {
    padding: 4rem calc((100vw - 1000px) / 2);
    padding-bottom: 15rem;
  }
`;

const GalleryGrid = styled(Link)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 370px);
  grid-gap: 0.7rem;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(6, 300px);
    margin: 0px 10px;
  }
`;

const GalleryCard = styled.div`
  width: 100%;
  height: 100%;
  border: 3.5px solid #000;
  background-color: #027cc4;
  position: relative;

  img {
    height: 60%;
    width: 100%;
    border-bottom: 3.5px solid #000;
  }
  .play_btn {
    position: absolute;
    top: 50%;
    left: 6%;
    background-color: #fff;
    color: #000;
    border-radius: 50%;
    font-size: 30px;
    border: 2px solid #000;
    -webkit-box-shadow: 4px 4px 0px 0px rgba(10, 10, 10, 1);
    -moz-box-shadow: 4px 4px 0px 0px rgba(10, 10, 10, 1);
    box-shadow: 4px 4px 0px 0px rgba(10, 10, 10, 1);
  }
  .play_btn i {
    padding: 15px 20px;
    border-radius: 50%;
    -webkit-box-shadow: inset 7px 7px 5px 0px rgba(194, 192, 194, 1);
    -moz-box-shadow: inset 7px 7px 5px 0px rgba(194, 192, 194, 1);
    box-shadow: inset 7px 7px 5px 0px rgba(194, 192, 194, 1);
  }
  .play_btn:hover {
    background-color: #a5c962;
  }
  .play_btn:hover i {
    -webkit-box-shadow: inset 7px 7px 5px 0px #497330;
    -moz-box-shadow: inset 7px 7px 5px 0px #497330;
    box-shadow: inset 7px 7px 5px 0px #497330;
  }
  .gallery_card_data {
    color: #fff;
    text-align: center;
    padding: 10px 15px;

    h2 {
      font-family: "TillanaSemiBold";
    }
    p {
      font-family: "TillanaMedium";
    }
    @media only screen and (max-width: 991px) {
      padding: 4px 15px;
    }
  }
`;

const GalleryModal = styled.div`
  .active {
    display: block;
  }
  .none {
    display: none;
  }
  overflow: hidden;
`;

const GalleryOverlay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #000;
  opacity: 0.7;
  height: 100%;
  width: 100%;
  z-index: -1;
  overflow: hidden;
`;

const GalleryModalData = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000000;
  padding: 8rem;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .center_modal {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    height: 525px;
    width: 825px;
    overflow: hidden;

    img {
      height: 500px;
      width: 800px;
      border: 5px solid #000;
    }

    @media only screen and (max-width: 991px) {
      height: 300px;
      width: 100%;
      img {
        height: 300px;
        width: 100%;
        border: 5px solid #000;
      }
    }
  }
  .close {
    position: absolute;
    top: 5%;
    right: 14%;
    cursor: pointer;
    i {
      color: #fff;
      border: 2px solid #fff;
      padding: 10px 15px;
      border-radius: 50%;
      font-size: 25px;
    }

    @media only screen and (max-width: 991px) {
      position: absolute;
      top: 15%;
      right: 5%;
    }
  }
`;
