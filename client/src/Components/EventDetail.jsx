import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import BgBlack from "../Assets/strips/bg1.png";
import profile from "../Assets/characters/profile.jpg";

const EventDetail = () => {
  const [eventData, setEventData] = useState([]);
  const { event_id } = useParams();
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const eventValue = {
    event_id: event_id,
  };
  const geEventData = async () => {
    await axios
      .post("/api1/event_detail", eventValue, options)
      .then((res) => {
        setEventData(res.data.response.events);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    geEventData();
  }, []);

  return (
    <div>
      <EventDetailBg>
        <EventContainer>
          <PageTitle>
            <h2>
              Home <i class="fa-solid fa-chevron-right"></i> Events{" "}
              <i class="fa-solid fa-chevron-right"></i> Event Detail
            </h2>
          </PageTitle>
          <EventGrid>
            <EventCard>
              <img src={eventData.image} alt="" />
              <div className="flex">
                <h5>
                  {/* <span>by</span>
                  John Doe */}
                  <span className="">{eventData.date}</span>
                </h5>
                {/* <h5>
                  <span>
                    <i class="fa-regular fa-comments"></i>
                  </span>
                  0<span className="ml">Comments</span>
                </h5> */}
              </div>
              <h2>{eventData.title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: eventData.description,
                }}
              />
              {/* <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
                atque ipsa tempora odio impedit natus pariatur. Eius molestiae
                ratione quam repellat nisi. Laborum dicta recusandae, ab ad
                porro magni, iusto incidunt, veritatis praesentium et nam!
              </p>
              <h3>Defaulting to Mindfulness: The Third Person Effect</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat
                atque ipsa tempora odio impedit natus pariatur. Eius molestiae
                ratione quam repellat nisi. Laborum dicta recusandae, ab ad
                porro magni, iusto incidunt, veritatis praesentium et nam!
              </p>
              <ul>
                <li>
                  <i class="fa-solid fa-check"></i> Nunc nec porttitor turpis.
                  In eu risus enim neque, aliquet ve In vitae mollis elit.
                </li>
                <li>
                  <i class="fa-solid fa-check"></i> Vivamus finibus vel mauris
                  eu risus enut vehicula.
                </li>
                <li>
                  <i class="fa-solid fa-check"></i> Nullam a magna porttitor,
                  dictum risus nec, fauci eu risus enbus sapien.
                </li>
                <li>
                  <i class="fa-solid fa-check"></i> Ultrices eros in eu risus
                  encursus turpis massa tincidunt ante.
                </li>
              </ul> */}
              {/* <Tags>
                <h3>Tags:</h3>
                <span>Fashion</span>
                <span>Style</span>
                <span>Travel</span>
                <span>Catoon</span>
              </Tags> */}
              {/* <TogglePost>
                <h2>
                  <i class="fa-solid fa-arrow-left-long"></i> PREVIOUS POST
                </h2>
                <h2>
                  NEXT POST <i class="fa-solid fa-arrow-right-long"></i>
                </h2>
              </TogglePost> */}
              {/* <BorderEvent></BorderEvent> */}
              {/* <RelatedPost>
                <div>
                  <img src={strip3} alt="" />
                  <div className="data">
                    <h6>
                      <span>by</span>
                      John Doe
                      <span className="ml">-03.05.2021</span>
                    </h6>
                    <h4>Lorem ipsum dolor sit amet.</h4>
                    <p>
                      Read More <i class="fa-solid fa-arrow-right-long"></i>
                    </p>
                  </div>
                </div>
                <div>
                  <img src={strip3} alt="" />
                  <div className="data">
                    <h6>
                      <span>by</span>
                      John Doe
                      <span className="ml">-03.05.2021</span>
                    </h6>
                    <h4>Lorem ipsum dolor sit amet.</h4>
                    <p>
                      Read More <i class="fa-solid fa-arrow-right-long"></i>
                    </p>
                  </div>
                </div>
                <div>
                  <img src={strip3} alt="" />
                  <div className="data">
                    <h6>
                      <span>by</span>
                      John Doe
                      <span className="ml">-03.05.2021</span>
                    </h6>
                    <h4>Lorem ipsum dolor sit amet.</h4>
                    <p>
                      Read More <i class="fa-solid fa-arrow-right-long"></i>
                    </p>
                  </div>
                </div>
              </RelatedPost> */}
              {/* <BorderEvent></BorderEvent>
              <h2>3 Comments</h2>
              <Comment>
                <img src={profile} alt="" />
                <div>
                  <h6>
                    John Doe
                    <span className="ml">Aug 23, 2021 at 10:46 am</span>
                  </h6>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur quod autem eligendi placeat, reprehenderit sint
                    porro mollitia?
                  </p>
                  <h5>
                    Reply <i class="fa-solid fa-arrow-right-long"></i>
                  </h5>
                </div>
              </Comment>
              <Comment>
                <img src={profile} alt="" />
                <div>
                  <h6>
                    John Doe
                    <span className="ml">Aug 23, 2021 at 10:46 am</span>
                  </h6>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur quod autem eligendi placeat, reprehenderit sint
                    porro mollitia?
                  </p>
                  <h5>
                    Reply <i class="fa-solid fa-arrow-right-long"></i>
                  </h5>
                </div>
              </Comment>
              <Comment>
                <img src={profile} alt="" />
                <div>
                  <h6>
                    John Doe
                    <span className="ml">Aug 23, 2021 at 10:46 am</span>
                  </h6>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Consectetur quod autem eligendi placeat, reprehenderit sint
                    porro mollitia?
                  </p>
                  <h5>
                    Reply <i class="fa-solid fa-arrow-right-long"></i>
                  </h5>
                </div>
              </Comment>
              <BorderEvent></BorderEvent>
              <ReplyForm>
                <h3>Leave a Reply</h3>
                <p>
                  Your email address will not be published. Required fields are
                  marked
                </p>
                <div className="formGrid">
                  <div>
                    <input type="text" placeholder="Enter Your Name" />
                  </div>
                  <div>
                    <input type="text" placeholder="Enter Your Email" />
                  </div>
                </div>
                <textarea
                  name=""
                  id=""
                  placeholder="Write a comment"
                ></textarea>
                <div className="send_now">
                  Post Comment <i class="fa-solid fa-arrow-right-long"></i>
                </div>
              </ReplyForm> */}
            </EventCard>
            {/* <EventCard>
              <Search>
                <div className="search_field">
                  <input type="text" placeholder="Search an Event" />
                  <i class="fa-solid fa-magnifying-glass"></i>
                </div>
              </Search>
              <SideData>
                <h3>Categories</h3>
                <ul>
                  <li>
                    <a href="#">Clothes</a>
                  </li>
                  <li>
                    <a href="#">Entertainment</a>
                  </li>
                  <li>
                    <a href="#">Fashion</a>
                  </li>
                  <li>
                    <a href="#">Lifestyle</a>
                  </li>
                  <li>
                    <a href="#">Others</a>
                  </li>
                  <li>
                    <a href="#">Shoes</a>
                  </li>
                  <li>
                    <a href="#">Technology</a>
                  </li>
                </ul>
              </SideData>
              <PopularEvents>
                <div className="head">
                  <h3>Popular Posts</h3>
                  <div>
                    <i class="fa-solid fa-chevron-left"></i>
                    <i class="fa-solid fa-chevron-right"></i>
                  </div>
                </div>
                <Posts>
                  <img src={strip3} alt="" />
                  <div>
                    <h6>
                      <span className="ml">March 1 2021</span>
                    </h6>
                    <h5>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h5>
                  </div>
                </Posts>
                <Posts>
                  <img src={strip3} alt="" />
                  <div>
                    <h6>
                      <span className="ml">March 1 2021</span>
                    </h6>
                    <h5>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h5>
                  </div>
                </Posts>
                <Posts>
                  <img src={strip3} alt="" />
                  <div>
                    <h6>
                      <span className="ml">March 1 2021</span>
                    </h6>
                    <h5>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </h5>
                  </div>
                </Posts>
              </PopularEvents>
              <CustomeBlock>
                <h3>Custom Block</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
                  alias voluptatum nostrum eligendi hic labore ipsam nisi animi
                  facilis explicabo vitae a deleniti quo fuga optio, odit,
                  voluptates dolores voluptas?
                </p>
              </CustomeBlock>
              <h3>Browse Tags</h3>
              <Tags>
                <span>Fashion</span>
                <span>Style</span>
                <span>Travel</span>
              </Tags>
              <Tags>
                <span>Cartoon</span>
                <span>Photography</span>
                <span>Comics</span>
              </Tags>
              <Tags>
                <span>Fashion</span>
                <span>Style</span>
              </Tags>
            </EventCard> */}
          </EventGrid>
        </EventContainer>
      </EventDetailBg>
    </div>
  );
};

export default EventDetail;

const EventDetailBg = styled.div`
  background-image: url(${BgBlack});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  width: 100%;
  position: relative;
`;

const EventContainer = styled.div`
  padding: 8rem calc((100vw - 1250px) / 2);
  padding-top: 5rem;
  z-index: 10000;

  @media only screen and (max-width: 991px) {
    padding-bottom: 15rem;
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
      font-size: 17px;
      font-weight: 400;
      margin-left: 15px;
    }
  }
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1.5rem;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled.div`
  img {
    width: 100%;
    height: 600px;
    border-radius: 10px;
  }
  h2 {
    font-family: "TillanaSemiBold";
    font-size: 27px;
    color: #272727;
  }
  h3 {
    font-family: "TillanaSemiBold";
    font-size: 20px;
    color: #272727;
  }
  p {
    font-family: "TillanaMedium";
    font-size: 16px;
    margin-bottom: 0.6rem;
    color: #666;
  }
  ul {
    margin-left: 55px;
    list-style: none;
    li {
      font-family: "TillanaMedium";
      color: #666;
      font-size: 16px;
    }
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

      i {
        margin-left: 10px;
      }
    }
    .ml {
      margin-left: 10px;
    }
  }
  .flex {
    display: flex;
  }
  @media only screen and (max-width: 991px) {
    margin: 10px;
    &:nth-child(2) {
      display: none;
    }
    img {
      width: 100%;
      height: 200px;
    }
    h2 {
      font-family: "TillanaSemiBold";
      font-size: 25px;
      color: #272727;
    }
    h3 {
      font-family: "TillanaSemiBold";
      font-size: 18px;
      color: #272727;
    }
    p {
      font-family: "TillanaMedium";
      font-size: 16px;
      margin-bottom: 0.6rem;
      color: #666;
    }
    ul {
      margin-left: 0px;
      list-style: none;
      li {
        font-family: "TillanaMedium";
        color: #666;
        font-size: 16px;
      }
    }
    h5 {
      font-weight: 500;
      font-size: 15px;
      color: #333;
      font-family: "TillanaSemiBold";

      span {
        margin-right: 8px;
        font-weight: 500;
        font-size: 15px;

        i {
          margin-left: 7px;
        }
      }
    }
  }
`;

const TogglePost = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;

  h2 {
    font-size: 17px;
  }
  @media only screen and (max-width: 991px) {
    h3 {
      margin: 15px;
    }
  }
`;

const BorderEvent = styled.div`
  background-color: #666;
  height: 1px;
  width: 100%;
  margin: 40px 0px;

  @media only screen and (max-width: 991px) {
    margin: 30px 0px;
    width: 100%;
  }
`;

const RelatedPost = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;

  div {
    border: 2.5px solid #000;
    img {
      width: 100%;
      height: 180px;
      border-bottom: 2.5px solid #000;
    }
    .data {
      border: none;
      background-color: #fff;
      text-align: center;
      padding: 5px 3px;
    }
    h4 {
      font-size: 17px;
      font-family: "TillanaSemiBold";
      color: #272727;
    }
    h6 {
      font-weight: 500;
      font-size: 13px;
      color: #333;
      font-family: "TillanaSemiBold";
      text-align: center;

      span {
        margin-right: 8px;
        font-weight: 500;
        font-size: 13px;

        i {
          margin-left: 10px;
        }
      }
      .ml {
        margin-left: 10px;
      }
    }
  }
  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    margin: 10px;
  }
`;

const Comment = styled.div`
  display: flex;
  padding: 15px;

  img {
    width: 100px;
    height: 100px;
    margin-right: 15px;
  }
  h6 {
    font-weight: 500;
    font-size: 18px;
    color: #333;
    font-family: "TillanaSemiBold";

    span {
      margin-right: 8px;
      font-weight: 500;
      font-size: 13px;
      font-family: "TillanaSemiBold";

      i {
        margin-left: 10px;
      }
    }
    .ml {
      margin-left: 10px;
    }
  }
  h5 {
    font-weight: 500;
    font-size: 15px;
    color: #333;
    font-family: "TillanaSemiBold";
    cursor: pointer;
  }
  @media only screen and (max-width: 991px) {
  }
`;

const ReplyForm = styled.form`
  .formGrid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    margin-bottom: 0.7rem;
  }
  input,
  textarea {
    width: 100%;
    padding: 10px 15px;
    border-radius: 6px;
    outline: none;
    border: none;
    border: 1px solid #9e9d9d;
  }
  textarea {
    width: 100%;
    height: 100px;
    padding: 10px 15px;
    border-radius: 6px;
    outline: none;
    border: none;
    border: 1px solid #9e9d9d;
  }
  .send_now {
    padding: 7px 15px;
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
  @media only screen and (max-width: 991px) {
    margin: 0px 10px;
    .formGrid {
      grid-template-columns: 1fr;
    }
    .send_now {
      width: 60%;
    }
  }
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-top: 1.2rem;

  h3 {
    margin-right: 0.7rem;
  }
  span {
    font-family: "TillanaMedium";
    margin-right: 15px;
    padding: 1px 7px;
    border: 1px solid #000;
    cursor: pointer;
  }
  @media only screen and (max-width: 991px) {
    span {
      margin-right: 5px;
    }
  }
`;

const Search = styled.div`
  position: relative;
  .search_field {
    i {
      position: absolute;
      top: 25%;
      right: 3%;
      font-size: 20px;
      color: #666;
    }
  }
  input {
    width: 100%;
    padding: 10px 15px;
    border-radius: 6px;
    outline: none;
    border: none;
    border: 1px solid #9e9d9d;
  }
`;

const SideData = styled.div`
  h3 {
    margin-top: 0.8rem;
  }
  ul {
    margin-left: 0rem !important;
    margin-top: 1rem;
    li {
      margin-bottom: 1rem !important;
      a {
        font-family: "TillanaMedium" !important;
        color: #333;
        font-size: 18px;
      }
    }
  }
`;

const CustomeBlock = styled.div``;

const PopularEvents = styled.div`
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.7rem;

    i {
      color: #666;
      font-size: 12px;
    }
  }
`;

const Posts = styled.div`
  display: flex;
  margin-bottom: 1rem;

  img {
    width: 80px;
    height: 70px;
    margin-right: 15px;
  }
  h6 {
    span {
      margin-right: 0px !important;
      font-weight: 500;
      font-size: 13px;
      font-family: "TillanaSemiBold";
    }
    .ml {
      margin-left: 0px;
    }
  }
  h5 {
    font-weight: 500;
    font-size: 13px;
    color: #333;
    font-family: "TillanaSemiBold";
    cursor: pointer;
  }
`;
