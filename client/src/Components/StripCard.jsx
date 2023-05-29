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
          </YearContianer>
        </YearCards>
      ) : null}
      
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
    </YearContainer>
  );
};

export default StripCard;
