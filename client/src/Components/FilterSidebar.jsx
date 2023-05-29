import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Aos from "aos";
import product4 from "../Assets/products/product4.png";
import { useAPI } from "../Context/apiContext";

const FilterSidebar = ({ showFilterSidebar, setShowFilterSidebar, forceUpdate }) => {
  const [toggelFilter, setToggelFilter] = useState();
  const [toggelFilterPrice, setToggelFilterPrice] = useState();
  const [toggelFilterSize, setToggelFilterSize] = useState();
  const [toggelFilterBrand, setToggelFilterBrand] = useState();
  const [toggelFilterColor, setToggelFilterColor] = useState();
  const [showFilter, setShowFilter] = useState(false);

  const { attributeList, priceList, categoryList } = useAPI();

  const [Category, setCategory] = useState([]);

  useEffect(() => {
    Aos.init({ duration: 1000, disable: "mobile" });
  }, []);

  return (
    <div>
      <CloseIcon>
        <p onClick={() => setShowFilterSidebar(false)}>
          <i class="fa-solid fa-xmark"></i>
        </p>
      </CloseIcon>
      <Sidebar data-aos="fade-left">
        <SidebarContainer>
          <div className="filter">
            <h3>Filter:</h3>
            <p>Clean All</p>
          </div>
          <div className="filter_cat">
            <div>
              <h3>All Categories</h3>
              {toggelFilter ? (
                <i
                  class="fa-solid fa-plus"
                  onClick={() => {
                    setToggelFilterColor(false);
                    setToggelFilterBrand(false);
                    setToggelFilterSize(false);
                    setToggelFilterPrice(false);
                    setToggelFilter(!toggelFilter);
                  }}
                ></i>
              ) : (
                <i
                  class="fa-solid fa-minus"
                  onClick={() => {
                    setToggelFilter(!toggelFilter);
                  }}
                ></i>
              )}
            </div>
            <div className="cat_border_dark"></div>
            <div className="cat_border"></div>
          </div>
          <ul className={toggelFilter ? "none" : "block"}>
            {categoryList.map((item, index) => {
              const handleToggle = (item) => {
                const currentIndex = Category.indexOf(item);
                const newChecked = [...Category];
                if (currentIndex === -1) {
                  newChecked.push(item);
                } else {
                  newChecked.splice(currentIndex, 1);
                }
                setCategory(newChecked);
              };
              localStorage.setItem("category", JSON.stringify(Category));
              return (
                <li key={item.category_id}>
                  <input
                    type="checkbox"
                    onChange={() => {
                      handleToggle(`category#${item.category_id}`);
                      forceUpdate();
                    }}
                  />
                  <Link to={`#${item.category_id}`}>{item.category_name}</Link>
                </li>
              );
            })}
          </ul>
          <div className="filter_cat">
            <div>
              <h3>Price</h3>
              {toggelFilterPrice ? (
                <i
                  class="fa-solid fa-minus"
                  onClick={() => {
                    setToggelFilterPrice(!toggelFilterPrice);
                  }}
                ></i>
              ) : (
                <i
                  class="fa-solid fa-plus"
                  onClick={() => {
                    setToggelFilter(true);
                    setToggelFilterColor(false);
                    setToggelFilterBrand(false);
                    setToggelFilterSize(false);
                    setToggelFilterPrice(!toggelFilterPrice);
                  }}
                ></i>
              )}
            </div>
            <div className="cat_border_dark"></div>
            <div className="cat_border"></div>
          </div>
          <ul className={toggelFilterPrice ? "block" : "none"}>
            {priceList.map((item, index) => {
              // const handlePrice = (event) => {
              //   if (event.target.checked) {
              //     forceUpdate();
              //     setPricerange([
              //       ...pricerange,
              //       `pricerange#${item.price_range_id}`,
              //     ]);
              //     getProductData();
              //     console.log("✅ Checkbox is checked");
              //   } else {
              //     removePrice(index);
              //     forceUpdate();
              //     getProductData();
              //     console.log("⛔️ Checkbox is NOT checked");
              //   }
              // };
              return (
                <li>
                  <a href="#">
                    <input type="checkbox" /> ₹{item.min_price} - ₹
                    {item.max_price}
                  </a>
                </li>
              );
            })}
          </ul>
          <div className="filter_cat">
            <div>
              <h3>Size</h3>{" "}
              {toggelFilterSize ? (
                <i
                  class="fa-solid fa-minus"
                  onClick={() => setToggelFilterSize(!toggelFilterSize)}
                ></i>
              ) : (
                <i
                  class="fa-solid fa-plus"
                  onClick={() => {
                    setToggelFilter(true);
                    setToggelFilterPrice(false);
                    setToggelFilterColor(false);
                    setToggelFilterBrand(false);
                    setToggelFilterSize(!toggelFilterSize);
                  }}
                ></i>
              )}
            </div>
            <div className="cat_border_dark"></div>
            <div className="cat_border"></div>
          </div>
          <ul className={toggelFilterSize ? "block" : "none"}>
            <li>
              <a href="#">
                <input type="checkbox" />
                Extra Large
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                Large
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                Medium
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                Small
              </a>
            </li>
          </ul>
          <div className="filter_cat">
            <div>
              <h3>Brand</h3>
              {toggelFilterBrand ? (
                <i
                  class="fa-solid fa-minus"
                  onClick={() => setToggelFilterBrand(!toggelFilterBrand)}
                ></i>
              ) : (
                <i
                  class="fa-solid fa-plus"
                  onClick={() => {
                    setToggelFilter(true);
                    setToggelFilterPrice(false);
                    setToggelFilterSize(false);
                    setToggelFilterColor(false);
                    setToggelFilterBrand(!toggelFilterBrand);
                  }}
                ></i>
              )}
            </div>
            <div className="cat_border_dark"></div>
            <div className="cat_border"></div>
          </div>
          <ul className={toggelFilterBrand ? "block" : "none"}>
            <li>
              <a href="#">
                <input type="checkbox" />
                Elegant Auto Group
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                Green Grass
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                NodeJs
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                Ns8
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                Red
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                Skysuite Tech
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                Sterling
              </a>
            </li>
          </ul>
          <div className="filter_cat">
            <div>
              <h3>Color</h3>{" "}
              {toggelFilterColor ? (
                <i
                  class="fa-solid fa-minus"
                  onClick={() => setToggelFilterColor(!toggelFilterColor)}
                ></i>
              ) : (
                <i
                  class="fa-solid fa-plus"
                  onClick={() => {
                    setToggelFilter(true);
                    setToggelFilterPrice(false);
                    setToggelFilterSize(false);
                    setToggelFilterBrand(false);
                    setToggelFilterColor(!toggelFilterColor);
                  }}
                ></i>
              )}
            </div>
            <div className="cat_border_dark"></div>
            <div className="cat_border"></div>
          </div>
          <ul className={toggelFilterColor ? "block" : "none"}>
            <li>
              <a href="#">
                <input type="checkbox" />
                Black
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                Blue
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                Brown
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                Green
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                Grey
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                Orange
              </a>
            </li>
            <li>
              <a href="#">
                <input type="checkbox" />
                Yellow
              </a>
            </li>
          </ul>
        </SidebarContainer>
      </Sidebar>
    </div>
  );
};

export default FilterSidebar;

const CloseIcon = styled.div`
  position: fixed;
  top: 2.5%;
  right: 5%;
  z-index: 10000000000;
  color: #fff;

  i {
    border: 2.5px solid #fff;
    border-radius: 50%;
    padding: 5px 10px;
    font-size: 20px;
  }
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  height: 100%;
  width: 350px;
  background-color: #fff;
  z-index: 1000000000000;
  overflow: hidden;

  @media only screen and (max-width: 991px) {
    width: 300px;
  }
`;

const SidebarContainer = styled.div`
  padding: 10px 15px;

  .filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 5px;

    h3 {
      font-size: 18px;
      font-weight: 500;
      color: #333;
      font-family: "TillanaSemiBold";
    }
    p {
      font-size: 15px;
      font-weight: 600;
      color: #333;
      font-family: "TillanaSemiBold";
    }
    @media only screen and (max-width: 991px) {
      .filter {
      }
    }
  }
  .filter_cat {
    margin-top: 15px;
    position: relative;

    div:nth-child(1) {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    h3 {
      color: #333;
      font-size: 15px;
      font-weight: 500;
      font-family: "TillanaSemiBold";
    }

    i {
      color: gray;
      cursor: pointer;
    }
  }

  .cat_border_dark {
    position: absolute;
    top: 92%;
    background-color: #333;
    height: 2px;
    width: 100px;
  }
  .cat_border {
    background-color: #c7c7c7;
    height: 1.3px;
    width: 100%;
    margin: 8px 0px;
  }
  ul {
    list-style: none;
    margin-top: 15px;
    margin-bottom: 0px;

    li {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
    a {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      text-decoration: none;
      color: #333;
      font-weight: 400;
      font-size: 15px;
      font-family: "TillanaSemiBold";
    }
    input {
      width: 17px;
      height: 17px;
      margin-right: 7px;
    }
  }
  .sort_by {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 15px;

    h3 {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      font-family: "TillanaSemiBold";
    }
    div {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    select {
      padding: 7px 10px;
      margin: 0px 10px;
      outline: none;
      border: none;
      border: 0.5px solid lightgray;
      color: #333;
      font-weight: 400;
      font-family: "TillanaSemiBold";
    }
    .icon {
      font-size: 30px;
      margin-right: 5px;
      cursor: pointer;
      color: #333;
    }
    i {
      font-size: 25px;
      margin-right: 5px;
      cursor: pointer;
      color: #333;
    }
    @media only screen and (max-width: 991px) {
      h3,
      i,
      .icon {
        display: none;
      }
      select {
        width: 140px;
      }
      .menu_filter {
        display: block;
        color: #0088dd;
        border: 2px solid #0088dd;
        font-size: 35px;
        padding: 4px;
      }
    }
  }
`;
