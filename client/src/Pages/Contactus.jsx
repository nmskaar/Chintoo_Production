import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAPI } from "../Context/apiContext";
import styled from "styled-components";
import BgBlack from "../Assets/strips/bg1.png";

const Contactus = () => {
  const [clickFaq, setClickFaq] = useState(true);
  const [clickFaq1, setClickFaq1] = useState(false);
  const [clickFaq2, setClickFaq2] = useState(false);
  const [clickFaq3, setClickFaq3] = useState(false);
  const [clickFaq4, setClickFaq4] = useState(false);

  const closeMobileMenu = () => setClickFaq(false);
  const closeMobileMenu1 = () => setClickFaq1(false);
  const closeMobileMenu2 = () => setClickFaq2(false);
  const closeMobileMenu3 = () => setClickFaq3(false);
  const closeMobileMenu4 = () => setClickFaq4(false);

  const { companyinfoData } = useAPI();

  const [verfied, setVerifed] = useState(false);

  const { settingsData } = useAPI();

  function onChange(value) {
    console.log("Captcha value:", value);
    setVerifed(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ContactBg>
        {companyinfoData.map((item) => {
          return (
            <>
              <ContactHead>
                <h3>Contact Information</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut
                </p>
              </ContactHead>
              <ContactContainer>
                <ContactGrid>
                  <div>
                    <i class="fa-regular fa-envelope"></i>
                    <h3>E-mail Address</h3>
                    <p>{item.email}</p>
                  </div>
                  <div>
                    <i class="fa-solid fa-headphones"></i>
                    <h3>Phone Number</h3>
                    <p>{item.mobile}</p>
                  </div>
                  <div>
                    <i class="fa-solid fa-location-dot"></i>
                    <h3>Address</h3>
                    <p>{item.address}</p>
                  </div>
                  <div>
                    <i class="fa-solid fa-print"></i>
                    <h3>Fax</h3>
                    <p>1-800-570-7777</p>
                  </div>
                </ContactGrid>
              </ContactContainer>
              <ContactContainer>
                <ContactFormGrid>
                  <ContactFormCard>
                    {/* <h2>People usually ask these</h2>
                    <div className="faq">
                      <div
                        className={clickFaq ? "none" : "mbFaq"}
                        onClick={() => {
                          setClickFaq(!clickFaq);
                          closeMobileMenu1();
                          closeMobileMenu2();
                          closeMobileMenu3();
                          closeMobileMenu4();
                        }}
                      >
                        <p>How can I cancel my order?</p>
                        {clickFaq ? (
                          <i class="fa-solid fa-minus"></i>
                        ) : (
                          <i class="fa-solid fa-plus"></i>
                        )}
                      </div>
                      <h5 className={clickFaq ? "answer" : "disable"}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eos facilis similique cumque saepe soluta ad nesciunt
                        facilis similique cumque saepe soluta ad nesciunt
                      </h5>
                      <div
                        className={clickFaq1 ? "none" : "mbFaq"}
                        onClick={() => {
                          setClickFaq1(!clickFaq1);
                          closeMobileMenu();
                          closeMobileMenu2();
                          closeMobileMenu3();
                          closeMobileMenu4();
                        }}
                      >
                        <p>Why is my registration delayed?</p>
                        {clickFaq1 ? (
                          <i class="fa-solid fa-minus"></i>
                        ) : (
                          <i class="fa-solid fa-plus"></i>
                        )}
                      </div>
                      <h5 className={clickFaq1 ? "answer" : "disable"}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eos facilis similique cumque saepe soluta ad nesciunt
                        facilis similique cumque saepe soluta ad nesciunt
                      </h5>
                      <div
                        className={clickFaq2 ? "none" : "mbFaq"}
                        onClick={() => {
                          setClickFaq2(!clickFaq2);
                          closeMobileMenu1();
                          closeMobileMenu();
                          closeMobileMenu3();
                          closeMobileMenu4();
                        }}
                      >
                        <p>What do I need to buy products?</p>
                        {clickFaq2 ? (
                          <i class="fa-solid fa-minus"></i>
                        ) : (
                          <i class="fa-solid fa-plus"></i>
                        )}
                      </div>
                      <h5 className={clickFaq2 ? "answer" : "disable"}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eos facilis similique cumque saepe soluta ad nesciunt
                        facilis similique cumque saepe soluta ad nesciunt
                      </h5>
                      <div
                        className={clickFaq3 ? "none" : "mbFaq"}
                        onClick={() => {
                          setClickFaq3(!clickFaq3);
                          closeMobileMenu1();
                          closeMobileMenu();
                          closeMobileMenu2();
                          closeMobileMenu4();
                        }}
                      >
                        <p>How can I track an order?</p>
                        {clickFaq3 ? (
                          <i class="fa-solid fa-minus"></i>
                        ) : (
                          <i class="fa-solid fa-plus"></i>
                        )}
                      </div>
                      <h5 className={clickFaq3 ? "answer" : "disable"}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eos facilis similique cumque saepe soluta ad nesciunt
                        facilis similique cumque saepe soluta ad nesciunt
                      </h5>
                      <div
                        className={clickFaq4 ? "none" : "mbFaq"}
                        onClick={() => {
                          setClickFaq4(!clickFaq4);
                          closeMobileMenu1();
                          closeMobileMenu();
                          closeMobileMenu2();
                          closeMobileMenu3();
                        }}
                      >
                        <p>How can I get money back?</p>
                        {clickFaq4 ? (
                          <i class="fa-solid fa-minus"></i>
                        ) : (
                          <i class="fa-solid fa-plus"></i>
                        )}
                      </div>
                      <h5 className={clickFaq4 ? "answer" : "disable"}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eos facilis similique cumque saepe soluta ad nesciunt
                        facilis similique cumque saepe soluta ad nesciunt
                      </h5>
                    </div> */}
                    <iframe
                      src={item.map_link}
                      allowfullscreen=""
                      loading="lazy"
                      referrerpolicy="no-referrer-when-downgrade"
                      frameborder="0"
                    ></iframe>
                  </ContactFormCard>
                  <ContactFormCard>
                    <h2>Send Us a Message</h2>
                    <div>
                      <label>Your Name</label>
                      <input type="text" />
                    </div>
                    <div>
                      <label>Your Email</label>
                      <input type="text" />
                    </div>
                    <div>
                      <label>Your Message</label>
                      <textarea name="" id="" cols="30" rows="5"></textarea>
                    </div>
                    {settingsData.map((item) => {
                      return (
                        <>
                          <ReCAPTCHA
                            sitekey={item.site_key}
                            onChange={onChange}
                          />
                        </>
                      );
                    })}
                    <div className="send_now">Send now</div>
                  </ContactFormCard>
                </ContactFormGrid>
              </ContactContainer>
              {/* <Mapframe>
                <iframe
                  src={item.map_link}
                  allowfullscreen=""
                  loading="lazy"
                  referrerpolicy="no-referrer-when-downgrade"
                  frameborder="0"
                ></iframe>
              </Mapframe> */}
            </>
          );
        })}
        {/* <Banner>
          <h2>Contact Us</h2>
        </Banner> */}
        {/* <BorderContact></BorderContact> */}
      </ContactBg>
    </div>
  );
};

export default Contactus;

const ContactBg = styled.div`
  background-image: url(${BgBlack});
  background-position: center;
  background-repeat: repeat;
  height: 100%;
  width: 100%;
  position: relative;
`;

const Banner = styled.div`
  background-color: #eee;
  height: 30vh;
  width: 100%;
  position: relative;

  h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #333;
    font-size: 35px;
    font-weight: 500;
    font-family: "TillanaSemiBold";
  }
  @media only screen and (max-width: 991px) {
    height: 20vh;
    h2 {
      font-size: 25px;
    }
  }
`;

const BorderContact = styled.div`
  background-color: #eee;
  height: 3px;
  width: 90%;
  margin: 10px auto;
`;

const ContactHead = styled.div`
  text-align: center;
  padding-top: 5rem;

  h3 {
    color: #333;
    font-size: 25px;
    font-weight: 500;
    font-family: "TillanaSemiBold";
  }
  p {
    color: #333;
    font-size: 17px;
    font-weight: 500;
    font-family: "TillanaSemiBold";
  }
`;

const ContactContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  padding: 4rem calc((100vw - 1200px) / 2);
  /* padding-bottom: 1rem; */

  div {
    text-align: center;

    h3 {
      color: #333;
      font-size: 25px;
      font-weight: 500;
      font-family: "TillanaSemiBold";
    }
    p {
      color: #333;
      font-size: 19px;
      font-weight: 500;
      font-family: "TillanaMedium" !important;
    }
    i {
      color: #336699;
      font-size: 35px;
    }
  }
  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    grid-gap: 1rem;
    padding: 2rem calc((100vw - 1200px) / 2);
    div {
      h3 {
        color: #333;
        font-size: 22px;
        font-weight: 500;
        font-family: "TillanaSemiBold";
      }
      p {
        color: #333;
        font-size: 17px;
        font-weight: 500;
      }
      i {
        color: #336699;
        font-size: 30px;
      }
    }
  }
`;

const ContactFormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1.7rem;
  padding: 0rem calc((100vw - 1200px) / 2);
  padding-bottom: 10rem;
  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    padding: 2rem calc((100vw - 1200px) / 2);
    padding-bottom: 15rem;
  }
`;

const ContactFormCard = styled.div`
  iframe {
    width: 100%;
    height: 100%;
  }
  h2 {
    color: #333;
    font-size: 22px;
    font-weight: 500;
    font-family: "TillanaSemiBold";
  }
  label {
    display: block;
    margin-top: 10px;
    margin-bottom: 8px;
    font-weight: 400;
    font-size: 14px;
    color: #666;
    font-family: "TillanaSemiBold";
  }
  input,
  textarea {
    width: 600px;
    padding: 10px 15px;
    border-radius: 6px;
    outline: none;
    border: none;
    border: 1px solid #eee;
  }
  .send_now {
    padding: 5px 15px;
    background-color: #336699;
    border-radius: 6px;
    color: #fff;
    font-weight: 500;
    text-transform: uppercase;
    width: 25%;
    text-align: center;
    margin-top: 15px;
    font-family: "TillanaSemiBold";
    cursor: pointer;
  }
  .faq {
    margin-top: 10px;
    margin: 0px 10px;
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #ebebeb;
      padding: 10px;
      cursor: pointer;

      p {
        font-weight: 500;
        color: #333;
        font-size: 16px;
        font-family: "TillanaSemiBold";
      }
      i {
        font-size: 400;
        font-size: 14px;
        color: #333;
      }
    }
    .answer {
      display: block;
      padding: 10px 10px;
      color: #666;
      font-weight: 400;
      border: 1px solid #eee !important;
      margin-bottom: 10px;
      font-family: "TillanaSemiBold";
      background-color: #fff;
      /* margin: 0px 10px; */
    }
    .disable {
      display: none;
      margin-bottom: 10px;
    }
    .mbFaq {
      margin-bottom: 10px;
    }
  }
  @media only screen and (max-width: 991px) {
    margin: 0px 10px;
    &:nth-child(1) {
      grid-column: 1 /2;
      grid-row: 2 /3;
    }
    input,
    textarea {
      width: 100%;
    }
    textarea {
      margin-bottom: 1.5rem;
    }
    .send_now {
      width: 40%;
    }
  }
`;

const Mapframe = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem calc((100vw - 1200px) / 2);
  padding-bottom: 10rem;

  iframe {
    width: 100%;
    height: 300px;
  }

  @media only screen and (max-width: 991px) {
    margin: 0px 15px;
    padding-bottom: 15rem;
  }
`;
