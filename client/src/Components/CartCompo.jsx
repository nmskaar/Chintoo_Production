import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAPI } from "../Context/apiContext";
import styled from "styled-components";
import product4 from "../Assets/products/product4.png";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineSignalCellularNull } from "react-icons/md";

const CartCompo = ({ add, increment, forceUpdate }) => {
  // const taxPrice = itemsPrice * 0.14;
  // const shippingPrice = itemsPrice > 2000 ? 0 : 20;
  const [showCart, setShowCart] = useState([]);
  const itemsPrice = showCart?.reduce(
    (a, item) => a + item.qty * item.price,
    0
  );
  const totalPrice = itemsPrice;
  const userId = JSON.parse(localStorage.getItem("userId"));
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
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
  const [data, setData] = useState("");
  const incrementData = () => {
    setData("increment");
  };
  const decrementData = () => {
    setData("decrement");
  };
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
      increment();
    } catch (error) {
      console.log(error);
    }
  };
  const decremnetCart = async (item) => {
    try {
      const res = await axios.post(
        "https://applexinfotech.com/chintoo2/admin/api1/add_to_cart",
        {
          product_id: item.product_id,
          user_id: userId,
          quantity: 1,
          action: "decrement",
          product_variant_id: item.product_variant_id,
        },
        options
      );
      increment();
    } catch (error) {
      console.log(error);
    }
  };
  const clearCart = async () => {
    try {
      const res = await axios.post(
        "https://applexinfotech.com/chintoo2/admin/api1/clear_cart",
        { user_id: userId },
        options
      );
      increment();
      getCart();
      forceUpdate();
      toast.success("Cart cleared succesfully");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCart();
  }, [add]);

  return (
    <CartLayout>
      <CartGrid>
        <CartCard>
          <div className="product">
            <div>
              <p>Product</p>
            </div>
            <div>
              <p>Price</p>
            </div>
            <div>
              <p>Quantity</p>
            </div>
            <div>
              <p>Subtotal</p>
            </div>
          </div>
          <div className="border_product"></div>
          <>
            {showCart ? (
              showCart.map((item) => {
                return (
                  <>
                    <div className="flex_cart" key={item.id}>
                      <div className="productImg">
                        <img src={item.image} alt="" />
                        <i
                          class="fa-solid fa-xmark"
                          onClick={() => {
                            increment();
                            deleteCart(item);
                          }}
                        ></i>
                      </div>
                      <p>{item.product_name}</p>
                      <h3>₹{item.price}</h3>
                      <div className="number">
                        <div className="numberProducts">
                          <div>
                            <span>{item.qty}</span>
                          </div>
                          <div>
                            <i
                              class="fa-solid fa-minus"
                              onClick={() => {
                                decremnetCart(item);
                              }}
                            ></i>
                            <i
                              class="fa-solid fa-plus"
                              onClick={() => {
                                addToCart(item);
                              }}
                            ></i>
                          </div>
                        </div>
                      </div>
                      <h2>₹{item.price * item.qty}</h2>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="empty">Cart is empty</div>
            )}
          </>
          <div className="border_product"></div>
          <div className="flex_cart">
            <Link to="/product" className="cart_btn back">
              <i class="fa-solid fa-arrow-left"></i> Continue Shopping
            </Link>
            <div className="flex">
              <div
                className="cart_btn clear"
                onClick={() => {
                  clearCart();
                }}
              >
                Clear Cart
              </div>
              {/* <div className="cart_btn update">Update Cart</div> */}
            </div>
          </div>
          {/* <div className="discount">
            <h3>COUPON DISCOUNT</h3>
            <input type="text" placeholder="Enter coupon code here" />
            <div className="apply">Apply Coupon</div>
          </div> */}
        </CartCard>
        <CartCard>
          <h3>CART TOTALS</h3>
          <div className="flex_data">
            <p>Subtotal</p>
            <p>₹{totalPrice}</p>
          </div>
          {/* <div className="border_bottom"></div> */}
          {/* <Shipping>
            <h3>Shipping</h3>
            <div>
              <input type="checkbox" />
              <span>Free Shipping</span>
            </div>
            <div>
              <input type="checkbox" />
              <span>Local Pickup</span>
            </div>
            <div>
              <input type="checkbox" />
              <span>Flat rate: $5.00</span>
            </div>
          </Shipping> */}
          <div className="border_bottom"></div>
          <div className="flex_data">
            <p>Total</p>
            <p>₹{totalPrice}</p>
          </div>
          <div className="proceed" onClick={() => increment()}>
            <Link to="/checkout">
              Proceed to checkout <i class="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </CartCard>
      </CartGrid>
    </CartLayout>
  );
};

export default CartCompo;

const CartLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 4rem;

  @media only screen and (max-width: 991px) {
    padding-bottom: 15rem;
  }
`;

const CartGrid = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-gap: 1rem;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const CartCard = styled.div`
  margin-top: 1.5rem;
  .product {
    display: grid;
    grid-template-columns: 3fr 1fr 1fr 1fr;
    grid-gap: 1rem;

    p {
      font-weight: 500;
      font-size: 18px;
      font-family: "TillanaSemiBold";
    }

    @media only screen and (max-width: 991px) {
      display: none;
    }
  }
  .border_product {
    background-color: #eee;
    height: 2px;
    width: 100%;
    margin: 15px 0px;
  }
  .flex_cart {
    display: grid;
    grid-template-columns: 1.2fr 1fr 1fr 1fr 1fr;
    grid-gap: 1rem;

    p {
      color: #333;
      font-weight: 600 !important;
      font-family: "TillanaSemiBold";
      text-align: center;
      margin: auto;
    }
    h3 {
      color: #666;
      font-weight: 500;
      text-align: center;
      margin: auto;
    }
    h2 {
      color: #333;
      font-size: 19px;
      font-weight: 500;
      text-align: center;
      margin: auto;
    }
    .number {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .numberProducts {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 2px 10px;
      border: 1px solid gray;
      font-size: 15px;
      color: #2e2d2d;
      height: 6vh;
      cursor: pointer;

      div {
        padding: 2px 0px;

        span {
          margin-right: 20px;
          font-weight: 500;
          font-family: "TillanaSemiBold";
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
    .productImg {
      position: relative;
      img {
        width: 100px;
        height: 100px;
        background-color: #eee;
        padding: 10px;
      }
      i {
        position: absolute;
        top: -10%;
        right: 35%;
        background-color: #fff;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
        color: #333;
        font-size: 17px;
        padding: 4px 7px;
        border-radius: 50%;
        cursor: pointer;
      }
    }
    .cart_btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      text-transform: uppercase;
      font-weight: 500;
      cursor: pointer;
    }
    .flex {
      display: flex;
    }
    .back {
      background-color: #336699;
      color: #fff;
      font-family: "TillanaSemiBold";
      width: 250px;
      padding: 10px 5px !important;

      i {
        margin-right: 8px;
      }

      &:hover {
        background-color: #4d4b4b;
        transition: all 0.3s ease-out;
      }
    }
    .clear {
      width: 180px;
      background-color: #fff;
      color: #333;
      border: 2px solid #336699;
      font-family: "TillanaSemiBold";
    }
    .update {
      width: 180px;
      background-color: #eee;
      color: #666;
      font-family: "TillanaSemiBold";
      margin-left: 15px;
    }
    @media only screen and (max-width: 991px) {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      p {
        color: #333;
        font-weight: 600 !important;
        font-size: 22px;
        margin-bottom: 5px;
      }
      h3 {
        color: #666;
        font-weight: 500;
        font-size: 22px;
        margin-bottom: 5px;
      }
      h2 {
        color: #333;
        font-size: 21px;
        margin-bottom: 5px;
      }
      .productImg {
        position: relative;
        img {
          width: 80vw;
          height: 70%;
          background-color: #eee;
          padding: 10px;
        }
        i {
          position: absolute;
          top: -5%;
          right: -3%;
          font-size: 15px;
        }
      }
      .numberProducts {
        margin: 3px;
      }
      .cart_btn {
        padding: 10px 20px;
        border-radius: 5px;
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 500;
        cursor: pointer;
        margin-bottom: 15px;
      }
      .flex {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }
    }
  }
  .discount {
    h3 {
      margin-top: 15px;
      color: #333;
      font-family: "TillanaSemiBold";
    }
    input {
      padding: 10px 15px;
      outline: none;
      border: none;
      border-bottom: 2px solid #eee;
      width: 100%;
      margin: 20px 0px;
      font-family: "TillanaSemiBold";
    }
    .apply {
      padding: 10px 20px;
      border-radius: 5px;
      text-decoration: none;
      text-transform: uppercase;
      font-weight: 500;
      cursor: pointer;
      background-color: #336699;
      color: #fff;
      width: 20%;
      font-family: "TillanaSemiBold";
      &:hover {
        background-color: #4d4b4b;
        transition: all 0.3s ease-out;
      }
    }
    @media only screen and (max-width: 991px) {
      padding: 10px;
      .apply {
        width: 68%;
      }
    }
    @media only screen and (max-width: 380px) {
      .apply {
        width: 68%;
      }
    }
  }
  &:nth-child(2) {
    border: 1px solid #eee;
    width: 400px;
    padding: 25px;
    font-family: "TillanaSemiBold";

    h3 {
      color: #333;
      font-family: "TillanaSemiBold";
    }
    .border_bottom {
      background-color: #eee;
      height: 2px;
      width: 100%;
      margin: 15px 0px;
    }
    .flex_data {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10px;

      p {
        color: #333;
        font-size: 17px;
        font-weight: 600;
        font-family: "TillanaSemiBold";
      }
    }
    select,
    input {
      padding: 11px 15px;
      outline: none;
      border: none;
      border: 1px solid #eee;
      border-radius: 8px;
      color: #666;
      width: 100%;
      margin-bottom: 10px;
      font-size: 400;
      font-size: 16px;
      font-family: "TillanaSemiBold";
    }
    .update_tools {
      cursor: pointer;
      border: 2px solid #336699;
      color: #333;
      padding: 9px 15px;
      text-transform: uppercase;
      font-weight: 500;
      width: 45%;
      text-align: center;
      border-radius: 5px;
      margin-bottom: 30px;
      font-family: "TillanaSemiBold";

      &:hover {
        background-color: #333;
        color: #fff;
        transition: all 0.3s ease-out;
      }
    }
    .proceed {
      cursor: pointer;
      color: #fff;
      background-color: #336699;
      padding: 9px 15px;
      text-transform: uppercase;
      font-weight: 500;
      width: 100%;
      text-align: center;
      border-radius: 5px;
      margin-bottom: 30px;
      margin-top: 25px;
      font-family: "TillanaSemiBold";
      i {
        margin-left: 8px;
      }
      a {
        color: #fff;
        font-family: "TillanaSemiBold";
      }
      &:hover {
        background-color: #4d4b4b;
        transition: all 0.3s ease-out;
      }
    }

    @media only screen and (max-width: 991px) {
      width: 100%;
      padding: 0px 10px;
    }
  }
  @media only screen and (max-width: 991px) {
    margin-top: 0rem;
  }
`;

const CartEmpty = styled.div`
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  font-family: "TillanaSemiBold";
`;

const Shipping = styled.div`
  h3 {
    color: #333;
    font-weight: 500;
    font-size: 18px;
  }
  div {
    display: grid;
    grid-template-columns: 1fr 30fr;
    input {
      width: 18px;
      height: 18px;
      margin-top: 10px;
    }
    span {
      margin: 8px;
      color: #333;
      font-weight: 500;
      font-size: 15px;
      font-family: "TillanaSemiBold";
    }
  }
`;
