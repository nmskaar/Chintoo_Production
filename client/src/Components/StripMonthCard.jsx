import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
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
import BgStrips from "../Utils/BgStrips";
import strip1 from "../Assets/strips/strip1.png";
import strip2 from "../Assets/strips/strip2.png";
import strip3 from "../Assets/strips/strip3.png";

const StripMonthCard = ({ yearValue, setYearValue }) => {
  const [toggleBtn, setToggleBtn] = useState(1);

  const togglePage = (index) => {
    setToggleBtn(index);
  };

  const [stripMonthList, setStripMonthList] = useState([]);
  const { year } = useParams();
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const stripValue = {
    year: year,
  };
  const geEventData = async () => {
    await axios
      .post("/api1/stripmonth_list", stripValue, options)
      .then((res) => {
        setStripMonthList(res.data.response.strip_month);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
    geEventData();
  }, []);
  return (
    <BgStrips>
      <YearContainer>
        {toggleBtn === 1 ? (
          <YearCards>
            <YearContianer>
              {stripMonthList.map((item) => {
                setYearValue(item.year);
                return (
                  <YearCard
                    to={`/strip-detail/${item.month}/${item.year}`}
                    data-aos="fade-down"
                  >
                    <img src={item.image} alt="" />
                    <h3>
                      {item.month} {item.year}
                    </h3>
                    <p>Lorem ipsum dolor sit amet.</p>
                  </YearCard>
                );
              })}
              {/* <YearCard to="/strips-slider" data-aos="fade-down">
                <img src={strip1} alt="" />
                <h3>January</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </YearCard>
              <YearCard to="/strips-slider" data-aos="fade-down">
                <img src={strip2} alt="" />
                <h3>February</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </YearCard>
              <YearCard to="/strips-slider" data-aos="fade-down">
                <img src={strip3} alt="" />
                <h3>March</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </YearCard>
              <YearCard to="/strips-slider" data-aos="fade-down">
                <img src={strip1} alt="" />
                <h3>April</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </YearCard>
              <YearCard to="/strips-slider" data-aos="fade-down">
                <img src={strip2} alt="" />
                <h3>May</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </YearCard>
              <YearCard to="/strips-slider" data-aos="fade-down">
                <img src={strip3} alt="" />
                <h3>Jun</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </YearCard> */}
            </YearContianer>
          </YearCards>
        ) : null}
        {/* {toggleBtn === 2 ? (
          <YearCards>
            <YearContianer>
              <YearCard to="/strips-slider" data-aos="fade-down">
                <img src={strip2} alt="" />
                <h3>July</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </YearCard>
              <YearCard to="/strips-slider" data-aos="fade-down">
                <img src={strip1} alt="" />
                <h3>August</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </YearCard>
              <YearCard to="/strips-slider" data-aos="fade-down">
                <img src={strip3} alt="" />
                <h3>September</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </YearCard>
              <YearCard to="/strips-slider" data-aos="fade-down">
                <img src={strip2} alt="" />
                <h3>October</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </YearCard>
              <YearCard to="/strips-slider" data-aos="fade-down">
                <img src={strip1} alt="" />
                <h3>November</h3>
                <p>Lorem ipsum dolor sit amet.</p>
              </YearCard>
              <YearCard to="/strips-slider" data-aos="fade-down">
                <img src={strip3} alt="" />
                <h3>Desember</h3>
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
    </BgStrips>
  );
};

export default StripMonthCard;
