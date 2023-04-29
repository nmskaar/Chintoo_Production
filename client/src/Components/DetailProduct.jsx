import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Slider from "react-slick";
import "swiper/css";
import styled from "styled-components";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import product3 from "../Assets/products/product3.png";
import product4 from "../Assets/products/product4.png";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import FullScreenModal from "./FullScreenModal";
import axios from "axios";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import CartModal from "./CartModal";
import { toast } from "react-toastify";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-autoplay.css";
import "lightgallery/css/lg-rotate.css";
// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import lgAutoplay from "lightgallery/plugins/autoplay";
import lgVideo from "lightgallery/plugins/video";
import lgRotate from "lightgallery/plugins/rotate";
import LightGallery from "lightgallery/react/Lightgallery.es5";

const DetailProduct = ({ cartItems, onAdd, onRemove }) => {
  const navigate = useNavigate();
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [toggleState, setToggleState] = useState(1);
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const toggleTab = (index) => {
    setToggleState(index);
  };
  const toggleShowPopup = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 4000);
  };

  const slider = useRef(null);

  const sideMoreProductSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const settingsSlider = {
    // fade: true,
  };
  const settingsAsNavFor = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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

  //-- PRODUCT DETAIL API STATE --//
  const [attribute, setAttribute] = useState([]);
  const [otherImage, setOtherImages] = useState([]);
  const [reletedProduct, setRelatedProduct] = useState([]);
  const [moreProduct, setMoreProduct] = useState([]);
  const [productVariantId, setProductVariantId] = useState("");

  //-- PRODUCT VARIANT ACTIVE STATE --//
  const [indexTab, setIndexTab] = useState(0);
  const handleIndex = (index) => {
    setIndexTab(index);
  };

  //-- CART QTY --//
  const [quantity, setQuantity] = useState(1);
  const Increment = () => {
    setQuantity(quantity + 1);
  };
  const Decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  //-- USE PARAMS --//
  const { product_id } = useParams();
  const { product_variant_id } = useParams();
  const [detailProductData, setDetailProductData] = useState([]);

  //-- STATE UPDATE --//
  const [add, setAdd] = useState(1);
  const increment = () => {
    setAdd(add + 1);
  };

  //-- API HEADER --//
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  //-- POST PRODUCT PRODUCT --//
  let detailValue = {
    product_id: product_id,
    product_variant_id: product_variant_id,
  };
  const getProductData = async () => {
    await axios
      .post("/api1/product_detail", detailValue, options)
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

  //-- POST RELATED PRODUCT --//
  const getRelatedProduct = async () => {
    await axios
      .post("/api1/related_product_list", detailValue, options)
      .then((res) => {
        setRelatedProduct(res.data.response.product_list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //-- POST MORE PRODUCT --//
  const getMoreProduct = async () => {
    await axios
      .post("/api1/more_product_list", detailValue, options)
      .then((res) => {
        setMoreProduct(res.data.response.product_list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //-- ADD PRODUCT TO WISHLIST --//
  const [wishlistActive, setTgogglWishlist] = useState(false);
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
        "/api1/add_to_wishlist",
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

  const [data, setData] = useState("");
  const incrementData = () => {
    setData("increment");
  };
  const decrementData = () => {
    setData("decrement");
  };

  //-- ADD PRODUCT TO CART API --//
  const addToCart = async (detailProductData) => {
    try {
      const res = await axios.post(
        "/api1/add_to_cart",
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

  //-- Is External --//
  const [external, setExternal] = useState(false);
  //-- LOCAL CART SETUP --//
  const [localCart, setLocalCart] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setLocalCart(true);
    } else {
      setLocalCart(false);
    }
  }, []);

  //-- USEEFFECT HOOK FOR GET PRODUCT DATA --//
  useEffect(() => {
    getProductData();
    getRelatedProduct();
    getMoreProduct();
  }, [add]);

  return (
    <DetailBg>
      <DetailContainer>
        <h2>
          Home <i class="fa-solid fa-chevron-right"></i> Products
        </h2>
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
                  <InnerImageZoom
                    src={detailProductData.image}
                    zoomSrc={detailProductData.image}
                    zoomType="hover"
                    zoomPreload={true}
                    zoomScale="2"
                    className="slider_img"
                  />
                </div>
                {otherImage.map((img, index) => {
                  return (
                    <div key={index}>
                      <InnerImageZoom
                        src={img}
                        zoomSrc={img}
                        zoomType="hover"
                        zoomPreload={true}
                        zoomScale="0.5"
                        className="slider_img"
                      />
                    </div>
                  );
                })}
              </Slider>
              <div
                className="full_screen_icon"
                onClick={() => setShowModal(true)}
              >
                <i class="fa-solid fa-expand "></i>
              </div>
              <div>
                 {/* <FullScreenModal setShowModal={setShowModal} /> */}
                {/* <LightGallery
                  speed={200}
                  plugins={[
                    lgThumbnail,
                    lgZoom,
                    lgRotate,
                    lgVideo,
                    lgAutoplay,
                  ]}
                >
                  <img src={detailProductData.image} alt="" />
                </LightGallery>  */}
              </div>
              <div className={showPopup ? "content" : "none"}>
                <CartModal
                  productId={productId}
                  cartItems={cartItems}
                  localCart={localCart}
                  productName={productName}
                  productImage={productImage}
                />
              </div>
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
                      <img src={img} alt="" className="slider_asnav" />
                    </div>
                  );
                })}
                {/* <div>
                  <img src={product3} alt="" className="slider_asnav" />
                </div>
                <div>
                  <img src={product4} alt="" className="slider_asnav" />
                </div> */}
              </Slider>
            </DetailCard>
            <DetailCard>
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
              <ProductSize>
                {attribute.map((item) => {
                  return (
                    <>
                      <ProductPara>{item.attribute_name}:</ProductPara>
                      <div>
                        {item.attribute_values.map((data, index) => {
                          return (
                            <Link
                              to={`/product-detail/${detailProductData.product_id}/${data.product_variant_id}`}
                              onClick={() => increment()}
                              className={
                                indexTab === index
                                  ? "activeBg product_sizes"
                                  : "product_sizes"
                              }
                            >
                              <div
                                onClick={() => handleIndex(index)}
                                style={{
                                  color: indexTab === index ? "#fff" : "",
                                  cursor: "pointer",
                                }}
                              >
                                {data.attribute_value}
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </>
                  );
                })}
              </ProductSize>
              {detailProductData.is_external === "1" ? (
                <ProductPurchase>
                <div className="cartBtn">
                  <a href={detailProductData.link} target="_blank" rel="noreffrer">
                    <i class="fa-solid fa-bag-shopping"></i> Buy Now
                  </a>
                </div>
                </ProductPurchase>
              ) : (
                <>
                  {localCart === false && (
                    <ProductPurchase>
                      <div className="numberProducts">
                        <div>
                          <span>{quantity}</span>
                        </div>
                        <div>
                          <i
                            class="fa-solid fa-minus"
                            onClick={() => {
                              Decrement();
                            }}
                          ></i>
                          <i
                            class="fa-solid fa-plus"
                            onClick={() => {
                              Increment();
                            }}
                          ></i>
                        </div>
                      </div>
                      <div
                        className="cartBtn"
                        onClick={() => {
                          toggleShowPopup();
                          setProductId(detailProductData.product_id);
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
                          toggleShowPopup();
                          setProductImage(detailProductData.image);
                          setProductName(detailProductData.product_name);
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
                    <div
                      className="compare"
                      onClick={() => {
                        increment();
                        addWishlist(detailProductData);
                      }}
                    >
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
                            setTgogglWishlist(!wishlistActive);
                          }}
                        ></i>
                      )}
                    </div>
                  </SocialContianer>
                </>
              )}
            </DetailCard>
            <DetailCard>
              <MoreContianer>
                <div className="prodTitle">
                  <h2>More Products</h2>
                  <div>
                    <MdKeyboardArrowLeft
                      className="icon"
                      onClick={() => slider?.current?.slickPrev()}
                    />
                    <MdKeyboardArrowRight
                      className="icon"
                      onClick={() => slider?.current?.slickNext()}
                    />
                  </div>
                </div>
                <div className="border"></div>
                <Slider
                  ref={slider}
                  className="productGrid"
                  {...sideMoreProductSettings}
                >
                  <div>
                    {moreProduct.slice(0, 4).map((item) => {
                      return (
                        <MoreProduct
                          to={`/product-detail/${item.product_id}/${item.product_variant_id}`}
                          onClick={() => increment()}
                        >
                          <img src={item.image} alt="" />
                          <div className="data">
                            <h2>{item.product_name}</h2>
                            {/* <div className="ratings">
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                            </div> */}
                            <p>₹{item.product_price}</p>
                          </div>
                        </MoreProduct>
                      );
                    })}
                  </div>
                  <div>
                    {moreProduct.slice(5, 9).map((item) => {
                      return (
                        <MoreProduct
                          to={`/product-detail/${item.product_id}/${item.product_variant_id}`}
                          onClick={() => increment()}
                        >
                          <img src={item.image} alt="" />
                          <div className="data">
                            <h2>{item.product_name}</h2>
                            {/* <div className="ratings">
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                            </div> */}
                            <p>₹{item.product_price}</p>
                          </div>
                        </MoreProduct>
                      );
                    })}
                  </div>
                  <div>
                    {moreProduct.slice(10, 14).map((item) => {
                      return (
                        <MoreProduct
                          to={`/product-detail/${item.product_id}/${item.product_variant_id}`}
                          onClick={() => increment()}
                        >
                          <img src={item.image} alt="" />
                          <div className="data">
                            <h2>{item.product_name}</h2>
                            {/* <div className="ratings">
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                            </div> */}
                            <p>₹{item.product_price}</p>
                          </div>
                        </MoreProduct>
                      );
                    })}
                  </div>
                  <div>
                    {moreProduct.slice(14, 18).map((item) => {
                      return (
                        <MoreProduct
                          to={`/product-detail/${item.product_id}/${item.product_variant_id}`}
                          onClick={() => increment()}
                        >
                          <img src={item.image} alt="" />
                          <div className="data">
                            <h2>{item.product_name}</h2>
                            {/* <div className="ratings">
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                            </div> */}
                            <p>₹{item.product_price}</p>
                          </div>
                        </MoreProduct>
                      );
                    })}
                  </div>
                  <div>
                    {moreProduct.slice(19, 23).map((item) => {
                      return (
                        <MoreProduct
                          to={`/product-detail/${item.product_id}/${item.product_variant_id}`}
                          onClick={() => increment()}
                        >
                          <img src={item.image} alt="" />
                          <div className="data">
                            <h2>{item.product_name}</h2>
                            {/* <div className="ratings">
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                            </div> */}
                            <p>₹{item.product_price}</p>
                          </div>
                        </MoreProduct>
                      );
                    })}
                  </div>
                  <div>
                    {moreProduct.slice(24, 28).map((item) => {
                      return (
                        <MoreProduct
                          to={`/product-detail/${item.product_id}/${item.product_variant_id}`}
                          onClick={() => increment()}
                        >
                          <img src={item.image} alt="" />
                          <div className="data">
                            <h2>{item.product_name}</h2>
                            {/* <div className="ratings">
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                            </div> */}
                            <p>₹{item.product_price}</p>
                          </div>
                        </MoreProduct>
                      );
                    })}
                  </div>
                  <div>
                    {moreProduct.slice(29, 33).map((item) => {
                      return (
                        <MoreProduct
                          to={`/product-detail/${item.product_id}/${item.product_variant_id}`}
                          onClick={() => increment()}
                        >
                          <img src={item.image} alt="" />
                          <div className="data">
                            <h2>{item.product_name}</h2>
                            {/* <div className="ratings">
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                            </div> */}
                            <p>₹{item.product_price}</p>
                          </div>
                        </MoreProduct>
                      );
                    })}
                  </div>
                  <div>
                    {moreProduct.slice(29, 33).map((item) => {
                      return (
                        <MoreProduct
                          to={`/product-detail/${item.product_id}/${item.product_variant_id}`}
                          onClick={() => increment()}
                        >
                          <img src={item.image} alt="" />
                          <div className="data">
                            <h2>{item.product_name}</h2>
                            {/* <div className="ratings">
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                            </div> */}
                            <p>₹{item.product_price}</p>
                          </div>
                        </MoreProduct>
                      );
                    })}
                  </div>
                  <div>
                    {moreProduct.slice(34, 38).map((item) => {
                      return (
                        <MoreProduct
                          to={`/product-detail/${item.product_id}/${item.product_variant_id}`}
                          onClick={() => increment()}
                        >
                          <img src={item.image} alt="" />
                          <div className="data">
                            <h2>{item.product_name}</h2>
                            {/* <div className="ratings">
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                            </div> */}
                            <p>₹{item.product_price}</p>
                          </div>
                        </MoreProduct>
                      );
                    })}
                  </div>
                  <div>
                    {moreProduct.slice(39, 53).map((item) => {
                      return (
                        <MoreProduct
                          to={`/product-detail/${item.product_id}/${item.product_variant_id}`}
                          onClick={() => increment()}
                        >
                          <img src={item.image} alt="" />
                          <div className="data">
                            <h2>{item.product_name}</h2>
                            {/* <div className="ratings">
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                              <i class="fa-solid fa-star"></i>
                            </div> */}
                            <p>₹{item.product_price}</p>
                          </div>
                        </MoreProduct>
                      );
                    })}
                  </div>
                </Slider>
              </MoreContianer>
            </DetailCard>
          </DetailGrid>
        </Details>
        <Position>
          <MoreProducts className="rel_prod">
            <div className="prod_title">
              <h2>Related Products</h2>
              <h4>
                More Products <i class="fa-solid fa-arrow-right"></i>
              </h4>
            </div>
            <div className="prod_border"></div>
            <ProductGrid className="padding_bottom">
              <Swiper
                slidesPerView="auto"
                spaceBetween={10}
                loop={true}
                breakpoints={{
                  300: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                  },
                }}
                className="swiper"
              >
                {reletedProduct.map((item) => {
                  return (
                    <SwiperSlide>
                      <Link
                        to={`/product-detail/${item.product_id}/${item.product_variant_id}`}
                      >
                        <ProductsCard onClick={() => increment()}>
                          <img src={item.image} alt="" />
                          <h5>{item.category_name}</h5>
                          <h2>{item.product_name}</h2>
                          {/* <div className="ratings">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <span>(3 Reviews)</span>
                          </div> */}
                          <p>₹{item.product_price}</p>
                        </ProductsCard>
                      </Link>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </ProductGrid>
          </MoreProducts>
        </Position>
      </DetailContainer>
    </DetailBg>
  );
};

export default DetailProduct;

const DetailBg = styled.div`
  overflow: hidden;
`;

const DetailContainer = styled.div`
  padding: 4rem calc((100vw - 1200px) / 2);
  position: relative;

  h2 {
    font-family: "TillanaSemiBold";
    font-size: 20px;
    font-weight: 400;
    color: #333;

    i {
      font-size: 13px;
    }
  }
  @media only screen and (max-width: 991px) {
    h2 {
      margin-left: 1.5rem;
    }
  }
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 1.5rem;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const DetailCard = styled.div`
  width: 100%;
  height: 100%;
  .slider_container {
    width: 380px;
  }
  .slider_img {
    width: 380px;
    height: 400px;
  }
  .slider_asnav {
    width: 100%;
    height: 110px;
  }
  .slider_grid {
    display: flex;
    align-items: center;
    justify-content: center;
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
    h3,
    p {
      text-align: left;
      margin-left: 10px;
    }
  }
`;

const ProductPrice = styled.h2`
  margin-top: 10px;
  font-size: 35px !important;

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
  align-items: center;
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

  .color_Div > div {
    display: inline-block;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    margin-left: 10px;
    cursor: pointer;
  }

  .color_Div div:nth-child(1) {
    background-color: yellow;
  }
  .color_Div div:nth-child(2) {
    background-color: red;
  }
  .color_Div div:nth-child(3) {
    background-color: green;
  }
  .color_Div div:nth-child(4) {
    background-color: skyblue;
  }
  .color_Div div:nth-child(5) {
    background-color: black;
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
  padding: 20px 0px;

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
        margin-right: 5px;
        padding: 5px;
        background-color: #d1d1d1;
        color: gray;
        border-radius: 50%;
        cursor: pointer;
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
  cursor: pointer;
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

const ShippingFeatures = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  padding: 10px;
  margin-left: 20px;
  background-color: #fff;
  i {
    font-size: 20px;
    margin-right: 10px;
    margin-bottom: 15px;
    color: #333;
  }
  h3 {
    font-size: 17px;
    font-weight: 500;
  }
  p {
    display: block;
  }
  @media only screen and (max-width: 991px) {
    margin-left: 0px;
    margin: 0 auto;
    margin: 0px 10px;
    margin-bottom: 10px;
    /* width: 85%; */
  }
`;

const BannerImg = styled.div`
  position: relative;
  div {
    position: absolute;
    left: 10%;
    bottom: 10%;
    color: #fff;

    p {
      color: #fff !important;
      margin-top: -10px;
      font-size: 17px;
    }
    h3 {
      color: #fff !important;
    }
  }
  img {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: auto;
    width: 320px;
  }

  @media only screen and (max-width: 991px) {
    display: none;
  }
`;

const Position = styled.div`
  /* margin-top: -22.5rem; */

  @media only screen and (max-width: 991px) {
    margin-top: 0rem;
  }
`;

const OtherDetails = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const FrequentlyBought = styled.div`
  padding: 2rem 0rem;
  padding-bottom: 0rem;
  h2 {
    color: #000;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .freq_border {
    /* margin-top: 15px; */
    background-color: #c7c7c7;
    height: 1.3px;
    width: 820px;
  }
  @media only screen and (max-width: 991px) {
    margin: auto;
    padding-top: 0rem;
    .freq_border {
      width: 100%;
    }
  }
`;

const BuyThese = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem 0rem;

  .product_box {
    position: relative;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
    padding: 10px;
    background-color: #fff;
  }
  img {
    width: 150px;
    height: 150px;
  }
  input {
    position: absolute;
    top: 5%;
    left: 5%;
    width: 15px;
    height: 15px;
  }
  i {
    color: gray;
    margin: 0px 10px;
    font-size: 25px;
    font-weight: 300;
  }
  .price_total {
    margin-left: 20px;
    h2 {
      font-size: 32px;
      font-weight: 400;
      color: skyblue;
    }
    p {
      margin-top: -20px;
      font-weight: 500;
      font-size: 16px;
      color: gray;
    }
  }
  .add_all {
    padding: 7px 25px;
    color: #fff;
    background-color: #272727;
    border-radius: 9px;
    font-size: 17px;
    font-size: 700 !important;
    margin-top: 50px;
    /* margin-left: 30px; */
  }

  @media only screen and (max-width: 991px) {
    flex-direction: column;
    padding: 2rem 0rem;
    padding-top: 1rem;
    i {
      margin: 8px 10px;
    }
    .add_all {
      margin-top: 20px;
    }
  }
`;

const MoreProducts = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  position: relative;
  padding: 1rem 0rem;

  &:nth-child(1) {
    /* padding-top: 23rem; */
  }

  .padding-top {
    padding-top: 20rem;
  }
  h2 {
    color: #000;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 10px;
  }
  .prod_border {
    background-color: #c7c7c7;
    height: 1.2px;
    width: 835px;
    margin-bottom: 15px;
  }
  .padding_bottom {
    padding-bottom: 4rem;
  }
  .prod_title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
      position: absolute;
      right: 29%;
      font-size: 15px;
      font-weight: 500;

      i {
        font-size: 15px;
      }
    }
  }
  @media only screen and (max-width: 991px) {
    align-items: center;
    justify-content: center;
    &:nth-child(1) {
      padding-top: 0rem;
    }
    .prod_border {
      width: 100%;
    }
    .padding_bottom {
      padding-bottom: 10rem;
    }
    .prod_title {
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      text-align: center;
      position: relative;
      h4 {
        display: none;
      }
    }
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  max-width: 860px;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    margin-bottom: 30rem;
  }
`;

const ProductSlider = styled.div`
  width: 850px;
`;

const ProductsCard = styled.div`
  width: 300px;
  img {
    width: 100%;
    height: 300px;
    /* background-color: #e7e7e7; */
    padding: 10px;
  }
  h5 {
    color: gray;
    font-weight: 400;
  }
  h2 {
    font-weight: 500;
    font-size: 22px;
    margin-bottom: 0rem;
    color: #222222;
  }
  p {
    font-size: 17px;
    font-weight: 600;
    color: #333;
  }
  .ratings {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3px;
    margin-bottom: 4px;

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
  @media only screen and (max-width: 991px) {
    width: 100%;
    text-align: center;
    img {
      height: 100%;
    }
    .ratings {
      justify-content: center;
    }
  }
`;

const SideMoreProd = styled.div`
  position: absolute;
  top: 47%;
  right: 6%;
  margin-top: 1.5rem;
  margin-left: 1rem;
  width: 340px;
  .side_title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-size: 17px;
    }
    i {
      color: gray;
    }
  }
  .side_border {
    background-color: #c7c7c7;
    height: 0.7px;
    width: 100%;
    margin: 10px 0px;
  }
  .more_card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 15px;
    img {
      width: 100px;
      height: 100px;
      background-color: #e7e7e7;
      margin-right: 10px;
      padding: 5px;
    }
    .ratings {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 1px;
      margin-bottom: 3px;

      i {
        color: #f93;
        font-size: 12px;
      }
    }
    h2 {
      font-size: 15px;
    }
    p {
      color: #333;
      font-weight: 600;
    }
  }
  @media only screen and (max-width: 991px) {
    display: none;
  }
`;

const MoreContianer = styled.div`
  position: absolute;
  top: 7%;
  right: 5%;
  background-color: transparent;
  .productGrid {
    width: 330px;
  }
  .prodTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h2 {
      text-align: left;
      margin-left: 0rem !important;
    }
    .icon {
      font-size: 27px;
      color: #666;
      cursor: pointer;
    }
  }
  .border {
    background-color: #c7c7c7;
    height: 1px;
    width: 100%;
    margin-bottom: 20px;
  }
  @media only screen and (max-width: 991px) {
    position: absolute;
    top: 72%;
    right: 5%;
    z-index: 100000000;
  }
  @media only screen and (max-width: 414px) {
    .productGrid {
      width: 360px;
    }
  }
  @media only screen and (max-width: 375px) {
    .productGrid {
      width: 330px;
    }
  }
`;

const MoreProduct = styled(Link)`
  display: flex;
  width: 330px;
  margin-bottom: 1rem;
  position: relative;
  cursor: pointer;
  background-color: transparent;

  img {
    width: 120px;
    height: 120px;
    margin-right: 15px;
  }
  .data {
    /* margin-left: -20px; */
    .ratings {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 1px;
      margin-bottom: 3px;
      i {
        color: #f93;
        font-size: 12px;
      }
    }
    @media only screen and (max-width: 991px) {
      h2 {
        text-align: left;
        margin-left: 0rem !important;
      }
      p {
        text-align: left;
        margin-left: 0rem !important;
      }
    }
    @media only screen and (max-width: 414px) {
      width: 360px;
    }
  }
`;
