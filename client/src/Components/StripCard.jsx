import React, { useState, useEffect } from "react";
import { useAPI } from "../Context/apiContext";
import Aos from "aos";
import {
  YearContainer,
  YearCards,
  YearContianer,
  YearCard,
  PageInition,
  ArrowLeft,
  ArrowRight,
  PageContainer,
} from "../Styles/CommonStyles";

const StripCard = () => {
  const [toggleBtn, setToggleBtn] = useState(1);

  const togglePage = (index) => {
    setToggleBtn(index);
  };

  const { stripYearList } = useAPI();

  useEffect(() => {
    Aos.init({ duration: 1000, disable: "mobile" });
  }, []);

  return (
    <YearContainer>
      {toggleBtn === 1 ? (
        <YearCards>
          <YearContianer>
            {stripYearList.map((item) => {
              return (
                <YearCard to={`/strip-month/${item.year}`} data-aos="fade-down">
                  <img src={item.image} alt="" />
                  <h3>Year {item.year}</h3>
                  {/* <p>Lorem ipsum dolor sit amet.</p> */}
                </YearCard>
              );
            })}
            {/* <YearCard to="/strip-month" data-aos="fade-down">
              <img src={strip1} alt="" />
              <h3>Year 2023</h3>
              <p>Lorem ipsum dolor sit amet.</p>
            </YearCard>
            <YearCard to="/strip-month" data-aos="fade-down">
              <img src={strip2} alt="" />
              <h3>Year 2022</h3>
              <p>Lorem ipsum dolor sit amet.</p>
            </YearCard>
            <YearCard to="/strip-month" data-aos="fade-down">
              <img src={strip3} alt="" />
              <h3>Year 2021</h3>
              <p>Lorem ipsum dolor sit amet.</p>
            </YearCard>
            <YearCard to="/strip-month" data-aos="fade-down">
              <img src={strip1} alt="" />
              <h3>Year 2020</h3>
              <p>Lorem ipsum dolor sit amet.</p>
            </YearCard>
            <YearCard to="/strip-month" data-aos="fade-down">
              <img src={strip2} alt="" />
              <h3>Year 2019</h3>
              <p>Lorem ipsum dolor sit amet.</p>
            </YearCard>
            <YearCard to="/strip-month" data-aos="fade-down">
              <img src={strip3} alt="" />
              <h3>Year 2018</h3>
              <p>Lorem ipsum dolor sit amet.</p>
            </YearCard> */}
          </YearContianer>
        </YearCards>
      ) : null}
      {/* {toggleBtn === 2 ? (
        <YearCards>
          <YearContianer>
            <YearCard to="/strip-month" data-aos="fade-down">
              <img src={strip2} alt="" />
              <h3>Year 2017</h3>
              <p>Lorem ipsum dolor sit amet.</p>
            </YearCard>
            <YearCard to="/strip-month" data-aos="fade-down">
              <img src={strip1} alt="" />
              <h3>Year 2016</h3>
              <p>Lorem ipsum dolor sit amet.</p>
            </YearCard>
            <YearCard to="/strip-month" data-aos="fade-down">
              <img src={strip3} alt="" />
              <h3>Year 2015</h3>
              <p>Lorem ipsum dolor sit amet.</p>
            </YearCard>
            <YearCard to="/strip-month" data-aos="fade-down">
              <img src={strip2} alt="" />
              <h3>Year 2014</h3>
              <p>Lorem ipsum dolor sit amet.</p>
            </YearCard>
            <YearCard to="/strip-month" data-aos="fade-down">
              <img src={strip1} alt="" />
              <h3>Year 2013</h3>
              <p>Lorem ipsum dolor sit amet.</p>
            </YearCard>
            <YearCard to="/strip-month" data-aos="fade-down">
              <img src={strip3} alt="" />
              <h3>Year 2012</h3>
              <p>Lorem ipsum dolor sit amet.</p>
            </YearCard>
          </YearContianer>
        </YearCards>
      ) : null} */}
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
    </YearContainer>
  );
};

export default StripCard;
