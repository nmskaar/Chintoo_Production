import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Aos from "aos";
import product4 from "../Assets/products/product4.png";
import axios from "axios";
import { toast } from "react-toastify";

const CartSidebar = ({
  showSidebar,
  setShowSidebar,
  cartItems,
  onAdd,
  onRemove,
  setCartItems,
  removeItem,
}) => {
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.product_price, 0);
  // const taxPrice = itemsPrice * 0.14;
  // const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const totalPrice = itemsPrice;

  //-- LOCAL CART SETUP --//
  const [localCart, setLocalCart] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("userId")) {
      setLocalCart(true);
    } else {
      setLocalCart(false);
    }
  }, []);

  const [showCart, setShowCart] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userId"));
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const cartPrice = showCart?.reduce((a, item) => a + item.qty * item.price, 0);
  const totalCart = cartPrice;
  const getCart = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/get_cart", { user_id: userId }, options)
      .then((res) => {
        setShowCart(res.data.response.cart);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCart = async (item) => {
    try {
      const res = await axios.post(
        "https://applexinfotech.com/chintoo2/admin/api1/remove_from_cart",
        {
          user_id: userId,
          product_id: item.product_id,
          product_variant_id: item.product_variant_id,
        },
        options
      );
      toast.success("Product removed succesfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
    Aos.init({ duration: 1000, disable: "mobile" });
  }, []);

  return (
    <div>
      <Sidebar data-aos="fade-left">
        <SidebarContainer>
          <SideHeader>
            <h2>SHOPPING CART</h2>
            <p onClick={() => setShowSidebar(false)}>
              Close <i class="fa-solid fa-arrow-right"></i>
            </p>
          </SideHeader>
          <BorderCart></BorderCart>
          {localCart === false && (
            <>
              {cartItems.length == 0 && <>Cart is empty</>}
              {cartItems.map((item) => {
                return (
                  <SideHeader>
                    <div>
                      <h3>{item.product_name}</h3>
                      <div className="price_qun">
                        <h5>
                          {item.qty} <i class="fa-solid fa-xmark"></i>
                        </h5>
                        <span>
                          <i class="fa-solid fa-indian-rupee-sign"></i>{" "}
                          {item.product_price}
                        </span>
                      </div>
                    </div>
                    <div>
                      <img src={item.image} alt="" />
                      <i
                        class="fa-solid fa-xmark cancel_product"
                        onClick={() => removeItem(item)}
                      ></i>
                    </div>
                  </SideHeader>
                );
              })}
              <BorderCart></BorderCart>
              <SideHeader>
                <span>Subtotal:</span>
                <h4>
                  <i class="fa-solid fa-indian-rupee-sign"></i> {totalPrice}
                </h4>
              </SideHeader>
            </>
          )}
          {localCart === true && (
            <>
              {showCart ? (
                showCart.map((item) => {
                  return (
                    <SideHeader>
                      <div>
                        <h3>{item.product_name}</h3>
                        <div className="price_qun">
                          <h5>
                            {item.qty} <i class="fa-solid fa-xmark"></i>
                          </h5>
                          <span>
                            <i class="fa-solid fa-indian-rupee-sign"></i>{" "}
                            {item.price}
                          </span>
                        </div>
                      </div>
                      <div>
                        <img src={item.image} alt="" />
                        <i
                          class="fa-solid fa-xmark cancel_product"
                          onClick={() => {
                            deleteCart(item);
                            getCart();
                          }}
                        ></i>
                      </div>
                    </SideHeader>
                  );
                })
              ) : (
                <>Cart is empty</>
              )}
              <BorderCart></BorderCart>
              <SideHeader>
                <span>Subtotal:</span>
                <h4>
                  <i class="fa-solid fa-indian-rupee-sign"></i> {totalCart}
                </h4>
              </SideHeader>
            </>
          )}
          <SideHeader>
            <CartBtn to="/cart" onClick={() => setShowSidebar(false)}>
              View Cart
            </CartBtn>
            <Checkout to="/checkout" onClick={() => setShowSidebar(false)}>
              Checkout
            </Checkout>
          </SideHeader>
        </SidebarContainer>
      </Sidebar>
    </div>
  );
};

export default CartSidebar;

const Sidebar = styled.div`
  position: fixed;
  top: 0%;
  right: 0%;
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
  position: relative;
  padding: 10px 15px;
`;

const SideHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  .mb {
    margin-top: 2rem;
  }
  h2 {
    font-family: "TillanaSemiBold";
    font-size: 20px;
    font-weight: 500;
    text-transform: uppercase;
  }
  p {
    font-family: "TillanaSemiBold";
    font-weight: 400;
    color: #666;
    cursor: pointer;
  }
  span {
    color: #333;
    font-weight: 500;
    font-family: "TillanaSemiBold";
  }
  h4 {
    color: #333;
    font-weight: 500;
  }
  i {
    font-size: 15px;
  }
  img {
    width: 90px;
    height: 100px;
    padding: 10px;
    background-color: #eee;
    margin-top: 0.5rem;
  }
  h3 {
    font-family: "TillanaSemiBold";
    font-weight: 500;
    font-size: 17px;
  }
  .price_qun {
    display: flex;
    align-items: center;

    h5 {
      color: #666;
      i {
        color: #666;
        margin-left: 7px;
      }
    }
    span {
      margin-left: 10px;
    }
  }
  .cancel_product {
    position: absolute;
    right: -1.8%;
    top: -1%;
    background-color: #fff;
    color: #000;
    padding: 4px 7px;
    border-radius: 50%;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }
  @media only screen and (max-width: 991px) {
    h3 {
      font-family: "TillanaSemiBold";
      font-weight: 500;
      font-size: 15px;
    }
  }
`;

const BorderCart = styled.div`
  margin: 10px;
  background-color: #eee;
  height: 2px;
  width: 100%;
`;

const CartBtn = styled(Link)`
  border: 2px solid #333;
  padding: 4px 15px;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 1rem;
  color: #333;
  font-family: "TillanaSemiBold";
`;

const Checkout = styled(Link)`
  background-color: #336699;
  padding: 6px 15px;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 1rem;
  color: #fff;
  font-family: "TillanaSemiBold";
`;
