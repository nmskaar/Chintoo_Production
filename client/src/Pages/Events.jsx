import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAPI } from "../Context/apiContext";
import styled from "styled-components";
import {
  PageInition,
  ArrowLeft,
  ArrowRight,
  PageContainer,
} from "../Styles/CommonStyles";
import Aos from "aos";
import BgBlack from "../Assets/strips/bg1.png";

const Events = () => {
  const [toggleBtn, setToggleBtn] = useState(1);

  const togglePage = (index) => {
    setToggleBtn(index);
  };

  const { eventsData } = useAPI();

  useEffect(() => {
    Aos.init({ duration: 1000, disable: "mobile" });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <EventsBg>
        <EventContainer>
          <PageTitle>
            <h2>
              Home <i class="fa-solid fa-chevron-right"></i> Events
            </h2>
          </PageTitle>
          <EventGrid>
            {eventsData.map((item) => {
              return (
                <EventCard
                  key={item.event_id}
                  to={`/event-detail/${item.event_id}`}
                  data-aos="zoom-in-right"
                  data-aos-duration="700"
                >
                  <img src={item.image} alt="" />
                  <div className="event_data">
                    {/* <p>Clothes</p> */}
                    <h3>{item.title}</h3>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item.description,
                      }}
                    />
                    <h5>
                      {/* <span>by</span>
                      John Doe */}
                      <span className="">{item.date}</span>
                    </h5>
                  </div>
                </EventCard>
              );
            })}
          </EventGrid>
          <PageInition>
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
          </PageInition>
        </EventContainer>
      </EventsBg>
    </div>
  );
};

export default Events;

const EventsBg = styled.div`
  background-image: url(${BgBlack});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: relative;
`;

const EventContainer = styled.div`
  padding: 8rem calc((100vw - 1100px) / 2);
  padding-top: 5rem;
  z-index: 10000;
  @media only screen and (max-width: 991px) {
    padding: 4rem calc((100vw - 1000px) / 2);
    padding-bottom: 14rem;
  }
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    margin: 0px 10px;
  }
`;

const EventCard = styled(Link)`
  text-decoration: none;
  color: #333;
  background-color: #fff;
  border: 3.5px solid #000;
  img {
    width: 100%;
    height: 250px;
    border-bottom: 3.5px solid #000;
  }
  .event_data {
    padding: 10px;
  }
  p {
    color: #005d81;
    font-weight: 400;
    font-family: "TillanaSemiBold";
  }
  h3 {
    font-family: "TillanaSemiBold";
    font-size: 22px;
    font-weight: 500;
  }
  h4 {
    font-weight: 500;
    font-size: 15px;
    color: #666;
  }
  h5 {
    font-weight: 500;
    font-size: 22px;
    color: #333;
    font-family: "TillanaSemiBold";

    span {
      margin-right: 8px;
      font-weight: 500;
      font-size: 18px;
    }
    .ml {
      margin-left: 10px;
    }
  }
`;

const PageTitle = styled.div`
  padding-bottom: 1.5rem;
  h2 {
    font-family: "TillanaSemiBold";
    font-size: 20px;
    font-weight: 400;

    i {
      font-size: 13px;
    }
  }
  @media only screen and (max-width: 991px) {
    h2 {
      margin-left: 15px;
    }
  }
`;
