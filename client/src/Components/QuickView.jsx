import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Slider from "react-slick";
import styled from "styled-components";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import CartModal from "./CartModal";
import { toast } from "react-toastify";
import DetailCartModal from "./DetailCartModal";

const QuickView = ({
  setShowQuick,
  productId,
  onAdd,
  onRemove,
  cartItems,
  add,
  increment,
}) => {
  const navigate = useNavigate();
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  const [detailProductData, setDetailProductData] = useState([]);
  const [attribute, setAttribute] = useState([]);
  const [otherImage, setOtherImages] = useState([]);
  const [productVariantId, setProductVariantId] = useState("");

  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const id = JSON.parse(localStorage.getItem("product_id"));
  const variantId = JSON.parse(localStorage.getItem("product_variant_id"));

  //-- PRODUCT VARIANT ACTIVE STATE --//
  const [indexTab, setIndexTab] = useState(0);
  const handleIndex = (index) => {
    setIndexTab(index);
  };

  const quickViewValue = {
    product_id: id,
    product_variant_id: variantId,
  };

  const getProductData = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/product_detail", quickViewValue, options)
      .then((res) => {
        setDetailProductData(res.data.response.productinfo);
        setAttribute(res.data.response.productinfo.attributes);
        setOtherImages(res.data.response.productinfo.other_images);
        setProductVariantId(res.data.response.productinfo.product_variant_id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //-- ADD PRODUCT TO WISHLIST --//
  const [wishlistActive, setTgogglWishlist] = useState(false);
  const [wishlistMsg, setWishlistMsg] = useState(false);
  const toggleMsg = () => {
    setWishlistMsg(true);
    setTimeout(() => {
      setWishlistMsg(false);
    }, 3000);
  };
  const [cartMsg, setCartMsg] = useState(false);
  const toggleCartMsg = () => {
    setCartMsg(true);
    setTimeout(() => {
      setCartMsg(false);
    }, 3000);
  };

  const userId = JSON.parse(localStorage.getItem("userId"));
  const wishlistProtected = () => {
    if (localStorage.getItem("userId")) {
      console.log("true");
    } else {
      navigate("/login");
    }
  };
  const addWishlist = async (detailProductData) => {
    try {
      const res = await axios.post(
        "https://applexinfotech.com/chintoo2/admin/api1/add_to_wishlist",
        { user_id: userId, product_id: detailProductData.product_id },
        options
      );
      if (res.data.response.message == "already exist") {
        return toast.error("Product Already Exist");
      }
      if (res.data.response.message == "required_field") {
        return toast.error(res.data.response.message);
      }
      toast.success("Product added to wishlist");
      setWishlistMsg(true);
    } catch (error) {
      toast.error(error);
    }
  };

  //-- API CART SETUP --//
  const [qty, setQty] = useState(1);
  const incrementQty = () => {
    setQty(qty + 1);
  };
  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  //-- ADD PRODUCT TO CART API --//
  const addToCart = async (detailProductData) => {
    try {
      const res = await axios.post(
        "https://applexinfotech.com/chintoo2/admin/api1/add_to_cart",
        {
          user_id: userId,
          product_id: detailProductData.product_id,
          quantity: qty,
          product_variant_id: detailProductData.product_variant_id,
        },
        options
      );
    } catch (error) {
      console.log(error);
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

  const settingsSlider = {
    fade: true,
  };
  const settingsAsNavFor = {
    // dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    getProductData();
  }, [add]);

  return (
    <QuickContainer>
      <div className="overlay"></div>
      <QuickCard>
        <Details>
          <DetailGrid>
            <DetailCard>
              <Slider
                className="slider_container"
                asNavFor={nav2}
                ref={(slider1) => setNav1(slider1)}
                {...settingsSlider}
              >
                <div>
                  <img
                    src={detailProductData.image}
                    className="slider_img"
                    alt=""
                  />
                </div>
                {otherImage.map((img, index) => {
                  return (
                    <div key={index}>
                      <img src={img} className="slider_img" alt="" />
                    </div>
                  );
                })}
              </Slider>
              <Slider
                asNavFor={nav1}
                ref={(slider2) => setNav2(slider2)}
                className="slider_grid"
                {...settingsAsNavFor}
              >
                <div>
                  <img
                    src={detailProductData.image}
                    alt=""
                    className="slider_asnav"
                  />
                </div>
                {otherImage.map((img, index) => {
                  return (
                    <div key={index}>
                      <img src={img} className="slider_asnav" alt="" />
                    </div>
                  );
                })}
              </Slider>
            </DetailCard>
            <DetailCard>
              {wishlistMsg == true ? (
                <div className="message">
                  <div>
                    <i class="fa-solid fa-check"></i> Product added to wishlist
                  </div>
                </div>
              ) : null}
              {cartMsg == true ? (
                <div className="message">
                  <div>
                    <i class="fa-solid fa-check"></i> Product added to cart
                  </div>
                </div>
              ) : null}
              <h3>{detailProductData.product_name}</h3>
              <p>
                <span>Category:</span>
                {detailProductData.category_name}
              </p>
              <div className="detail_border"></div>
              <ProductPrice>
                <i class="fa-solid fa-indian-rupee-sign"></i>{" "}
                {detailProductData.product_price}
              </ProductPrice>
              <ProductList>
                <div>
                  <p>{detailProductData.product_description}</p>
                </div>
              </ProductList>
              <div className="detail_border"></div>
              {/* <ProductColor>
                <ProductPara>Color:</ProductPara>
                <div className="color_Div">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </ProductColor> */}
              <ProductSize>
                {attribute.map((item) => {
                  return (
                    <>
                      <ProductPara>{item.attribute_name}:</ProductPara>
                      {item.attribute_values.map((data, index) => {
                        return (
                          <div
                            onClick={() => {
                              localStorage.setItem(
                                "product_variant_id",
                                JSON.stringify(data.product_variant_id)
                              );
                              increment();
                            }}
                            className={
                              indexTab === index
                                ? "activeBg product_sizes"
                                : "product_sizes"
                            }
                          >
                            <div
                              onClick={() => {
                                handleIndex(index);
                              }}
                              style={{
                                color: indexTab === index ? "#fff" : "",
                                cursor: "pointer",
                              }}
                            >
                              {data.attribute_value}
                            </div>
                          </div>
                        );
                      })}
                    </>
                  );
                })}
              </ProductSize>
              {localCart === false && (
                <ProductPurchase>
                  <div className="numberProducts">
                    <div>
                      <span>{qty}</span>
                    </div>
                    <div>
                      <i
                        class="fa-solid fa-minus"
                        onClick={() => decrementQty()}
                      ></i>
                      <i
                        class="fa-solid fa-plus"
                        onClick={() => incrementQty()}
                      ></i>
                    </div>
                  </div>
                  <div
                    className="cartBtn"
                    onClick={() => {
                      toggleCartMsg();
                      onAdd(detailProductData);
                    }}
                  >
                    <Link to="#">
                      <i class="fa-solid fa-bag-shopping"></i> Add To Cart
                    </Link>
                  </div>
                </ProductPurchase>
              )}
              {localCart === true && (
                <ProductPurchase>
                  <div className="numberProducts">
                    <div>
                      <span>{qty}</span>
                    </div>
                    <div>
                      <i
                        class="fa-solid fa-minus"
                        onClick={() => decrementQty()}
                      ></i>
                      <i
                        class="fa-solid fa-plus"
                        onClick={() => incrementQty()}
                      ></i>
                    </div>
                  </div>
                  <div
                    className="cartBtn"
                    onClick={() => {
                      toggleCartMsg();
                      addToCart(detailProductData);
                    }}
                  >
                    <Link to="#">
                      <i class="fa-solid fa-bag-shopping"></i> Add To Cart
                    </Link>
                  </div>
                </ProductPurchase>
              )}
              <SocialContianer>
                <div className="socail_icons">
                  <i class="fa-brands fa-facebook-f"></i>
                  <i class="fa-brands fa-twitter"></i>
                  <i class="fa-brands fa-pinterest-p"></i>
                  <i class="fa-brands fa-whatsapp"></i>
                  <i class="fa-brands fa-linkedin-in"></i>
                </div>
                <div className="line_social"></div>
                <div className="compare">
                  {wishlistActive == true ? (
                    <i
                      class="fa-solid fa-heart"
                      onClick={() => {
                        setTgogglWishlist(!wishlistActive);
                      }}
                    ></i>
                  ) : (
                    <i
                      class="fa-regular fa-heart"
                      onClick={() => {
                        wishlistProtected();
                        toggleMsg();
                        addWishlist(detailProductData);
                        setTgogglWishlist(!wishlistActive);
                      }}
                    ></i>
                  )}
                </div>
              </SocialContianer>
            </DetailCard>
          </DetailGrid>
        </Details>
      </QuickCard>
      <i
        class="fa-solid fa-xmark close_modal"
        onClick={() => {
          setIndexTab(0);
          setWishlistMsg(false);
          setTgogglWishlist(false);
          setShowQuick(false);
        }}
      ></i>
    </QuickContainer>
  );
};

export default QuickView;

const QuickContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  .overlay {
    position: fixed;
    left: 0%;
    top: 0%;
    width: 100%;
    height: 320%;
    background-color: #000;
    opacity: 0.7;
    z-index: 1000000;
    overflow: hidden;
  }

  .close_modal {
    position: fixed;
    top: 3%;
    right: 12%;
    z-index: 1000000000;
    font-size: 25px;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 50%;
    padding: 7px 12px;
    cursor: pointer;
    overflow: hidden;
  }

  @media only screen and (max-width: 991px) {
    display: none;
  }
`;

const QuickCard = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000000000;
  background-color: #fff;
  padding: 10px;
  margin-left: 30px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;

  .cancel_popup {
    position: fixed;
    top: -7%;
    left: -4%;
    z-index: 10000;
    font-size: 20px;
    color: #333;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    border-radius: 50%;
    padding: 6px 10px;
    cursor: pointer;
  }

  @media only screen and (max-width: 991px) {
    position: fixed;
    top: 7%;
    left: 45%;
    transform: translate(-55%, -25%);
    width: 80%;
  }
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 800px;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const DetailCard = styled.div`
  .slider_container {
    width: 400px;
  }
  .slider_img {
    width: 380px;
    height: 370px;
  }
  .slider_asnav {
    width: 100px;
    height: 100px;
  }
  .slider_grid {
    display: grid;
    margin: 0px 0px;
    width: 400px;
  }
  .full_screen_icon {
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: -15px;
    cursor: pointer;
    z-index: 1000000;
  }
  .full_screen_icon i {
    padding: 10px 12px;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    background-color: #fff;
    color: #999999;
    font-size: 20px;
  }
  h3 {
    font-family: "TillanaSemiBold";
    font-size: 30px;
    color: #333;
  }
  p span {
    font-weight: 500;
    font-size: 17px;
    color: #000;
    padding-right: 10px;
  }
  p {
    color: gray;
  }
  .detail_border {
    background-color: #c7c7c7;
    width: 100%;
    height: 0.5px;
    border-radius: 8px;
    margin-top: 20px;
  }
  .content {
    display: block;
  }
  .none {
    display: none;
  }
  .message {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 7px 10px;
    border: 0.2px solid #dfdede;
    background-color: #fff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.2);
    margin-top: 14px;
    font-size: 18px;
    font-family: "TillanaMedium";
    position: relative;

    .fa-xmark {
      position: absolute;
      top: -40%;
      left: -2%;
      padding: 5px 8px;
      background-color: #fff;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
      border-radius: 50%;
    }

    .fa-check {
      background-color: #30f130;
      border-radius: 50%;
      color: #fff;
      padding: 7px;
      font-size: 15px;
      margin-right: 10px;
    }
  }
  @media only screen and (max-width: 991px) {
    text-align: center;
    .full_screen_icon {
      margin-right: 25px;
    }
    .slider_container {
      width: 370px;
    }
    .slider_grid {
      width: 370px;
    }
    .slider_img {
      width: 370px;
      height: 300px;
    }
  }
`;

const ProductPrice = styled.h2`
  margin-top: 10px;
  font-size: 30px !important;

  i {
    font-size: 30px !important;
  }

  @media only screen and (max-width: 991px) {
    text-align: left;
    margin-left: 10px !important;
  }
`;

const ProductList = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  div {
    i {
      font-size: 13px;
      color: #333;
    }
    p {
      font-weight: 400;
      font-size: 14px;
      color: #2e2d2d !important;
      margin-bottom: 4px;
      margin-left: 7px;
    }
  }

  @media only screen and (max-width: 991px) {
  }
`;

const ProductPara = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: #2e2d2d !important;
  margin-bottom: 4px;

  i {
    font-size: 13px;
    color: #333;
  }

  @media only screen and (max-width: 991px) {
    width: 85%;
    margin: 0px 7px;
  }
`;

const ProductColor = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px 0px;

  .color_Div {
    margin-left: 5px;
  }

  @media only screen and (max-width: 991px) {
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding: 10px 0px;

    .color_Div > div {
      display: inline-block;
      border-radius: 50%;
      height: 30px;
      width: 30px;
      margin-right: 10px;
      margin-left: 0px;
      cursor: pointer;
    }

    p {
      margin-left: 10px;
    }
  }
`;

const ProductSize = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding-top: 20px;
  padding-bottom: 20px;

  .product_sizes {
    display: inline-block;
    margin-left: 5px;
    cursor: pointer;
  }

  .product_sizes > div {
    display: inline-block;
    margin-left: 10px;
    margin-left: 10px;
    padding: 2px 5px;
    border: 1px solid gray;
    font-size: 15px;
    color: #2e2d2d;

    &:hover {
      border: 1px solid #655bff;
    }
  }
  @media only screen and (max-width: 991px) {
    align-items: flex-start;
    justify-content: flex-start;
    flex-direction: column;
    padding-bottom: 15px;

    .product_sizes {
      margin-left: 0px;
    }

    .product_sizes > div {
      padding: 5px 10px;
    }

    p {
      margin-left: 10px;
    }
  }
`;

const ProductPurchase = styled.div`
  display: flex;
  .numberProducts:nth-child(1) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 2px 10px;
    border: 1px solid gray;
    font-size: 15px;
    color: #2e2d2d;

    div {
      padding: 2px 0px;

      span {
        margin-right: 20px;
        font-weight: 500;
      }
      i {
        margin: 0px 5px;
        padding: 5px;
        background-color: #d1d1d1;
        color: gray;
        border-radius: 50%;
      }
    }
  }
  .cartBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    width: 65%;
    padding: 10px 10px;
    border: 1px solid gray;
    font-size: 16px;
    font-weight: 600;
    color: #666;
    background-color: #e9e9e9;
    cursor: pointer;

    i {
      margin-right: 7px;
      font-size: 18px;
    }

    a {
      color: #666;
    }
  }
  @media only screen and (max-width: 991px) {
    margin: 0px 10px;
    align-items: flex-start;
    justify-content: flex-start;
    .numberProducts:nth-child(1) {
      padding: 8px 10px;
      width: 150px;
      margin-bottom: 10px;
    }
  }
`;

const SocialContianer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .socail_icons i {
    margin-top: 1rem;
    margin-right: 10px;
    padding: 10px 11px;
    border: 1px solid #cdcdcd;
    border-radius: 50%;
    font-size: 15px;

    &:nth-child(1) {
      padding-left: 13px;
      padding-right: 13px;
    }
    &:nth-child(1):hover {
      background-color: #1b4f9b;
      color: #fff;
    }
    &:nth-child(2):hover {
      background-color: #00adef;
      color: #fff;
    }
    &:nth-child(3):hover {
      background-color: #f96a02;
      color: #fff;
    }
    &:nth-child(4):hover {
      background-color: #3c8a38;
      color: #fff;
    }
    &:nth-child(5):hover {
      background-color: #2c567e;
      color: #fff;
    }
  }
  .line_social {
    margin-top: 15px;
    background-color: #c7c7c7;
    height: 30px;
    width: 1px;
  }
  .compare {
    padding: 10px 11px;

    i {
      display: inline-block;
      margin-top: 15px;
      margin-right: 20px;
      font-size: 19px;
      cursor: pointer;
      color: #333;
    }
  }
  @media only screen and (max-width: 991px) {
    padding: 0px 10px;
    .line_social {
      display: none;
    }
    .compare {
      padding: 0px 11px;
    }
  }
`;
