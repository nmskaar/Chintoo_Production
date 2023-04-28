import React, { useState, useEffect, useReducer } from "react";
import { useAPI } from "../Context/apiContext";
import { useCart } from "react-use-cart";
import axios from "axios";
import styled from "styled-components";
import {
  PageInition,
  ArrowLeft,
  ArrowRight,
  PageContainer,
} from "../Styles/CommonStyles";
import BgBlack from "../Assets/strips/bg1.png";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import QuickView from "./QuickView";
import ProductModal from "./ProductModal";
import CartModal from "./CartModal";
import { toast } from "react-toastify";

const ProductCompo = ({
  showFilterSidebar,
  setShowFilterSidebar,
  onAdd,
  cartItems,
  onRemove,
}) => {
  const navigate = useNavigate();
  const [toggelFilter, setToggelFilter] = useState();
  const [toggelFilterPrice, setToggelFilterPrice] = useState();
  const [toggelFilterSize, setToggelFilterSize] = useState();
  const [showProductPopup, setShowProductPopup] = useState(false);
  const [showQuick, setShowQuick] = useState(false);
  const [toggelActive, setToggelActive] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [productId, setProductId] = useState("");
  const [quickView, setQuickView] = useState(false);
  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const toogleProductPopup = () => {
    setShowProductPopup(true);
    setTimeout(() => {
      setShowProductPopup(false);
    }, 4000);
  };

  const [attribute, setAttribute] = useState(0);
  const attributTab = (index) => {
    setAttribute(index);
  };

  const [add, setAdd] = useState(1);
  const increment = () => {
    setAdd(add + 1);
  };

  const [toggleAttribute, setToggleAttribute] = useState(1);

  const toggleTabAttribute = (index) => {
    setToggleAttribute(index);
  };

  const [wishlistActive, setTgogglWishlist] = useState();
  const toggleWishlist = (index) => {
    setTgogglWishlist(index);
  };

  const { attributeList, priceList, categoryList } = useAPI();

  const [productData, setProductData] = useState([]);
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const [Category, setCategory] = useState([]);
  const [sortby, setSortby] = useState("default");
  const [pricerange, setPricerange] = useState([]);
  const [productvariantid, setProductvariantid] = useState([]);
  const removePrice = (index) => {
    setPricerange([
      ...pricerange.slice(0, index),
      ...pricerange.slice(index + 1),
    ]);
  };
  const removeVar = (index) => {
    setProductvariantid([
      ...productvariantid.slice(0, index),
      ...productvariantid.slice(index + 1),
    ]);
  };

  const productValue = {
    filters: Category,
    sortby: sortby,
  };
  const getProductData = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/product_list", productValue, options)
      .then((res) => {
        setProductData(res.data.response.product_list);
        console.log(res.data.response.product_list);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const wishlistProtected = () => {
    if (localStorage.getItem("userId")) {
      console.log("true");
    } else {
      navigate("/login");
    }
  };
  //-- LOCAL CART SETUP --//
  const [localCart, setLocalCart] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setLocalCart(true);
    } else {
      setLocalCart(false);
    }
  }, []);

  const userId = JSON.parse(localStorage.getItem("userId"));
  const addWishlist = async (item) => {
    try {
      const res = await axios.post(
        "https://applexinfotech.com/chintoo2/admin/api1/add_to_wishlist",
        { user_id: userId, product_id: item.product_id },
        options
      );
      if (res.data.response.message == "already exist") {
        return toast.error("Product Already Exist");
      }
      if (res.data.response.message == "required_field") {
        return toast.error(res.data.response.message);
      }
      toast.success("Product added to wishlist");
    } catch (error) {
      toast.error(error);
    }
  };

  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const addToCart = async (item) => {
    try {
      const res = await axios.post(
        "https://applexinfotech.com/chintoo2/admin/api1/add_to_cart",
        {
          product_id: item.product_id,
          user_id: userId,
          quantity: 1,
          action: "increment",
          product_variant_id: item.product_variant_id,
        },
        options
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductData();
  }, [reducerValue]);

  useEffect(() => {
    console.log("");
  }, [add]);

  return (
    <ProductBg>
      <ProductContainer>
        <h2 className="head">
          Home <i class="fa-solid fa-chevron-right"></i> Shop
        </h2>
        <ProductDiv>
          <ProductGrid>
            <ProductCard
              className={showFilter ? "filter-menu active" : "filter-menu"}
            >
              <div className="filter">
                <h3>Filter:</h3>
                <p
                  onClick={() => {
                    setCategory([""]);
                    forceUpdate();
                    getProductData();
                  }}
                >
                  Clean All
                </p>
              </div>
              <div className="filter_cat">
                <div>
                  <h3>All Categories</h3>
                  {toggelFilter ? (
                    <i
                      class="fa-solid fa-plus"
                      onClick={() => setToggelFilter(!toggelFilter)}
                    ></i>
                  ) : (
                    <i
                      class="fa-solid fa-minus"
                      onClick={() => setToggelFilter(!toggelFilter)}
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
                        checked={
                          Category.indexOf(`category#${item.category_id}`) ===
                          -1
                            ? false
                            : true
                        }
                      />
                      <Link to={`#${item.category_id}`}>
                        {item.category_name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="filter_cat">
                <div>
                  <h3>Price</h3>
                  {toggelFilterPrice ? (
                    <i
                      class="fa-solid fa-plus"
                      onClick={() => setToggelFilterPrice(!toggelFilterPrice)}
                    ></i>
                  ) : (
                    <i
                      class="fa-solid fa-minus"
                      onClick={() => setToggelFilterPrice(!toggelFilterPrice)}
                    ></i>
                  )}
                </div>
                <div className="cat_border_dark"></div>
                <div className="cat_border"></div>
              </div>
              <ul className={toggelFilterPrice ? "none" : "block"}>
                {priceList.map((item, index) => {
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
                    <li>
                      <input
                        type="checkbox"
                        onChange={() => {
                          handleToggle(`pricerange#${item.price_range_id}`);
                          forceUpdate();
                        }}
                      />
                      <Link to="#">
                        ₹{item.min_price} - ₹{item.max_price}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              {attributeList.map((item, index) => {
                return (
                  <>
                    <div className="filter_cat">
                      <div>
                        <h3>{item.attribute_name}</h3>{" "}
                        {toggelFilterSize ? (
                          <i
                            class="fa-solid fa-plus"
                            onClick={() =>
                              setToggelFilterSize(!toggelFilterSize)
                            }
                          ></i>
                        ) : ( 
                          <i
                            class="fa-solid fa-minus"
                            onClick={() =>
                              setToggelFilterSize(!toggelFilterSize)
                            }
                          ></i>
                        )}
                      </div>
                      <div className="cat_border_dark"></div>
                      <div className="cat_border"></div>
                    </div>
                    <ul className={toggelFilterSize ? "none" : "block"}>
                      {item.attribute_values.map((item, index) => {
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
                        localStorage.setItem(
                          "category",
                          JSON.stringify(Category)
                        );
                        return (
                          <li>
                            <input
                              type="checkbox"
                              onChange={() => {
                                handleToggle(
                                  `attribute#${item.attribute_value_id}`
                                );
                                forceUpdate();
                              }}
                            />
                            <Link to="#">{item.attribute_value_name}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                );
              })}
            </ProductCard>
            <ProductCard>
              <div className="sort_by">
                <AiOutlineUnorderedList
                  className="menu_filter"
                  onClick={() => setShowFilterSidebar(!showFilterSidebar)}
                />
                {showFilterSidebar === true ? (
                  <SidebarOverlay></SidebarOverlay>
                ) : null}
                <div>
                  <h3>Sort By:</h3>
                  <select
                    value={sortby}
                    onChange={(e) => {
                      setSortby(e.target.value);
                      forceUpdate();
                    }}
                  >
                    <option value="default">Default sorting</option>
                    <option value="low">Sort by price: low to high</option>
                    <option value="high">Sort by price: high to low</option>
                  </select>
                </div>
                <div></div>
              </div>
              <div className="card">
                {productData.map((item, index) => {
                  return (
                    <div className="rel" key={index}>
                      <Link
                        to={`/product-detail/${item.product_id}/${item.product_variant_id}`}
                      >
                        <img src={item.image} alt="" />
                      </Link>
                      <div className="hover_card">
                        {localCart === false && (
                          <i
                            class="fa-solid fa-bag-shopping"
                            onClick={() => {
                              toogleProductPopup();
                              setProductId(item.product_id);
                              increment();
                              onAdd(item);
                            }}
                          ></i>
                        )}
                        {localCart === true && (
                          <i
                            class="fa-solid fa-bag-shopping"
                            onClick={() => {
                              toogleProductPopup();
                              setProductId(item.product_id);
                              setProductName(item.product_name);
                              setProductImage(item.image);
                              increment();
                              addToCart(item);
                            }}
                          ></i>
                        )}
                        <div
                          onClick={() => {
                            wishlistProtected();
                            setProductId(item.product_id);
                            increment();
                            addWishlist(item);
                          }}
                        >
                          {wishlistActive == index ? (
                            <i
                              class="fa-solid fa-heart"
                              onClick={() => {
                                setTgogglWishlist(index);
                              }}
                            ></i>
                          ) : (
                            <i
                              class="fa-regular fa-heart"
                              onClick={() => {
                                wishlistProtected();
                                setTgogglWishlist(index);
                              }}
                            ></i>
                          )}
                        </div>
                        <i
                          class="fa-solid fa-magnifying-glass"
                          onClick={() => {
                            setShowQuick(true);
                            setProductId(item.product_id);
                            setQuickView(true);
                            localStorage.setItem(
                              "product_id",
                              JSON.stringify(item.product_id)
                            );
                            localStorage.setItem(
                              "product_variant_id",
                              JSON.stringify(item.product_variant_id)
                            );
                            increment();
                          }}
                        ></i>
                      </div>
                      <Link
                        to={`/product-detail/${item.product_id}/${item.product_variant_id}`}
                      >
                        <div className="product_data">
                          <h5>{item.category_name}</h5>
                          <h2>{item.product_name}</h2>
                          {/* <div className="ratings">
                            <i
                              class="fa-solid fa-star"
                              onClick={() => setShowProductPopup(true)}
                            ></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <span>(3 Reviews)</span>
                          </div> */}
                          <p>
                            <i class="fa-solid fa-indian-rupee-sign"></i>
                            {item.product_price}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className={showProductPopup ? "block" : "none"}>
                <ProductModal
                  localCart={localCart}
                  cartItems={cartItems}
                  productId={productId}
                  productName={productName}
                  productImage={productImage}
                  wishlistProtected={wishlistProtected}
                />
              </div>
              <div className={showQuick ? "block" : "none"}>
                {quickView === true ? (
                  <QuickView
                    setShowQuick={setShowQuick}
                    productId={productId}
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    add={add}
                    increment={increment}
                  />
                ) : null}
              </div>
            </ProductCard>
          </ProductGrid>
        </ProductDiv>
      </ProductContainer>
    </ProductBg>
  );
};

export default ProductCompo;

const ProductBg = styled.div`
  background-image: url(${BgBlack});
  background-position: center;
  background-repeat: repeat;
  height: 100%;
  width: 100%;
  position: relative;
`;

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  display: none;
  background-color: #000;
  opacity: 0.7;
  z-index: 10000000;
  overflow-y: hidden;
`;

const ProductContainer = styled.div`
  padding: 4rem calc((100vw - 1200px) / 2);

  .head {
    padding-bottom: 1.5rem;
  }
  h2 {
    font-family: "TillanaSemiBold";
    font-size: 20px;
    font-weight: 400;

    i {
      font-size: 13px;
    }
  }
  @media only screen and (max-width: 991px) {
    padding: 2.5rem calc((100vw - 1200px) / 2);
    padding-bottom: 15rem;
    .head {
      padding-left: 1.5rem;
    }
  }
`;

const ProductDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 4fr;
  grid-gap: 3rem;

  .mb {
    margin: 5rem 0rem;
  }

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    .mb {
      margin: 3rem 0rem;
    }
  }
`;

const ProductCard = styled.div`
  .mTop {
    margin-top: 1.7rem;
  }
  @media only screen and (max-width: 991px) {
    .filter-menu {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 480px;
      left: -100%;
      opacity: 1;
      transition: all 0.5s ease;
    }
    .filter-menu.active {
      background-color: #fff;
      left: 10%;
      opacity: 1;
      overflow-y: hidden;
      transition: all 0.5s ease;
      /* z-index: 100; */
    }
  }
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
      cursor: pointer;
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
      font-size: 17px;
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
    height: 2.5px;
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
    margin-bottom: 30px;

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
    .menu_filter {
      display: none;
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
  .card {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
    grid-row-gap: 0.5rem;
    text-align: center;
    position: relative;

    .rel {
      position: relative;
      width: 280px;
      height: 320px;
      margin-bottom: 0.5rem;
    }
    img {
      width: 100%;
      height: 60%;
      background-color: whitesmoke;
      padding: 10px;
      border: 2px solid #333;
    }
    .product_data {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin: auto;
      height: 40%;
      border: 2px solid #333;
      border-top: 0px;
      margin-top: -7px;
      cursor: pointer;
      padding: 10px 15px;
      background-color: #fff;
      width: 100%;

      @media only screen and (max-width: 991px) {
        width: 100%;
        margin-left: 0rem;
      }
    }
    h5 {
      color: gray;
      font-weight: 400;
      font-family: "TillanaMedium";
    }
    h2 {
      font-weight: 500;
      font-size: 20px;
      margin-bottom: 0rem;
      color: #222222;
    }
    p {
      font-size: 17px;
      font-weight: 600;
      color: #333;

      i {
        font-size: 15px;
        margin-right: 3px;
      }
    }
    .ratings {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 3px;

      i {
        color: #f93;
      }
      span {
        font-size: 13px;
        font-weight: 500;
        color: #9b9b9b;
        margin-left: 10px;
      }
    }
    .hover_card {
      display: none;
    }
    .rel:hover .hover_card {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      bottom: 37%;
      left: 50%;
      transform: translate(-50%, -60%);
      background-color: whitesmoke;
      box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
      padding: 6px 15px;
      width: 170px;

      i {
        margin: 0px 8px;
        color: #333;
        cursor: pointer;
      }
    }
    @media only screen and (max-width: 991px) {
      grid-template-columns: 1fr;
      grid-row-gap: 1.5rem;
      .rel {
        width: 280px;
        height: 320px;
        margin-bottom: 1rem;
      }
      img {
        width: 100%;
        height: 70%;
        background-color: #e7e7e7;
        padding: 10px;
      }
    }
    @media only screen and (max-width: 820px) {
      .rel {
        width: 350px;
        height: 320px;
        margin-bottom: 1rem;
      }
    }
    @media only screen and (max-width: 360px) {
      .rel {
        width: 330px;
        height: 320px;
        margin-bottom: 1rem;
      }
    }
  }
  @media only screen and (max-width: 991px) {
    &:nth-child(1) {
      display: none;
    }
    &:nth-child(2) {
      display: none;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
`;
