import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {
  ProcessHead,
  OrderDiv,
  ThanksCard,
  OrderStatus,
  DetailsHead,
  DetailProduct,
  SubOrder,
  Address,
  Back,
} from "../Styles/CommonStyles";
import styled from "styled-components";

const OrderDetail = () => {
  const [orderDetail, setOrderDetail] = useState([]);
  const [productList, setProductList] = useState([]);
  const { id } = useParams();
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const getOrderDetail = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/order_detail", { id: id }, options)
      .then((res) => {
        setOrderDetail(res.data.response.order_detail);
        setProductList(res.data.response.order_detail.product_info);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getOrderDetail();
    window.scrollTo(0, 0);
  }, []);
  return (
    <ProcessHead>
      <Address>
        <div>
          <h4>Order Details</h4>
          <div className="detail_border"></div>
          <p>
            <>Order Detail:</> {orderDetail.order_no}
          </p>
          <p>
            <>Order Date:</> {orderDetail.date}
          </p>
          <p>
            <>Order Status:</> {orderDetail.status}
          </p>
          <p>
            <>Order Total:</> {orderDetail.total}
          </p>
          <p>
            <>Order Note:</> {orderDetail.note}
          </p>
        </div>
        <div>
          <h4>Billing Address</h4>
          <div className="detail_border"></div>
          <p>{orderDetail.billing_name}</p>
          <p>{orderDetail.billing_mobile}</p>
          <p>{orderDetail.billing_email}</p>
          <p>{orderDetail.billing_company_name}</p>
          <p>{orderDetail.billing_gstin}</p>
          <p>{orderDetail.billing_address1}</p>
          <p>{orderDetail.billing_address2}</p>
          <p>{orderDetail.billing_country}</p>
          <p>{orderDetail.billing_state}</p>
          <p>{orderDetail.billing_city}</p>
          <p>{orderDetail.billing_zip}</p>
        </div>
        <div>
          <h4>Shipping Address</h4>
          <div className="detail_border"></div>
          <p>{orderDetail.shipping_name}</p>
          <p>{orderDetail.shipping_company_name}</p>
          <p>{orderDetail.shipping_address1}</p>
          <p>{orderDetail.shipping_address2}</p>
          <p>{orderDetail.shipping_country}</p>
          <p>{orderDetail.shipping_state}</p>
          <p>{orderDetail.shipping_city}</p>
          <p>{orderDetail.shipping_zip}</p>
        </div>
      </Address>
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
              {productList.map((item) => {
                return (
                  <>
                    <>
                      <div className="flex_cart" key={item.id}>
                        <p>{item.product_name}</p>
                        <p></p>
                        <h3>₹{item.price}</h3>
                        <div className="number">
                          <div>
                            <div className="qty">
                              <span>{item.qty}</span>
                            </div>
                          </div>
                        </div>
                        <h2>₹{item.price * item.qty}</h2>
                      </div>
                      <div className="border_product"></div>
                    </>
                  </>
                );
              })}
            </>
          </CartCard>
          <CartCard>
            <h3>ORDER TOTALS</h3>
            <div className="flex_data">
              <p>Subtotal</p>
              <p>₹ {orderDetail.subtotal}</p>
            </div>
            <div className="flex_data">
              <p>Shipping</p>
              <p>₹ {orderDetail.shipping}</p>
            </div>
            <div className="flex_data">
              <p>Total Tax</p>
              <p>₹ {orderDetail.totaltax}</p>
            </div>
            <div className="pading">
              <div className="otherData">
                <div>
                  <input type="checkbox" disabled name="" id="" />
                </div>
                CGST : ₹ {orderDetail.cgst}
              </div>
              <div className="otherData">
                <div>
                  <input type="checkbox" disabled name="" id="" />
                </div>
                SGST : ₹ {orderDetail.sgst}
              </div>
              <div className="otherData">
                <div>
                  <input type="checkbox" disabled name="" id="" />
                </div>
                IGST : ₹ {orderDetail.igst}
              </div>
            </div>
            <div className="flex_data">
              <p>Total Discount</p>
              <p>₹ {orderDetail.discount}</p>
            </div>
            <div className="border_bottom"></div>
            <div className="flex_data">
              <p>Total</p>
              <p>₹ {orderDetail.total}</p>
            </div>
          </CartCard>
        </CartGrid>
      </CartLayout>
    </ProcessHead>
  );
};

export default OrderDetail;

const CartLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 4rem;

  @media only screen and (max-width: 991px) {
    padding-bottom: 13rem;
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
  .qty {
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
    margin-bottom: 0.5rem;

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
    .flex {
      display: flex;
    }
    @media only screen and (max-width: 991px) {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      grid-gap: 0rem;

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
      .flex {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
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
    .pading {
      padding-top: 1rem;
    }
    .otherData {
      display: grid;
      grid-template-columns: 20px 1fr;
      grid-gap: 0.5rem;
      padding-bottom: 0.4rem;
      color: #666;
      font-family: "TillanaMedium";

      input {
        width: 20px;
        height: 20px;
      }
      .mtop {
        padding-top: 0.7rem;
      }
      .mbot {
        margin-bottom: 0%.7rem;
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
    @media only screen and (max-width: 991px) {
      width: 400px;
      padding: 0px 10px;
    }
    @media only screen and (max-width: 375px) {
      width: 360px;
      padding: 0px 10px;
    }
  }
  @media only screen and (max-width: 991px) {
    margin-top: 0rem;
  }
`;
