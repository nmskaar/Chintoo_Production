import React from "react";
import { Link } from "react-router-dom";
import {
  OrderDiv,
  ThanksCard,
  OrderStatus,
  DetailsHead,
  DetailProduct,
  SubOrder,
  Address,
  Back,
} from "../Styles/CommonStyles";

const OrderCompo = ({ detail }) => {
  const orderNo = localStorage.getItem("placeOrder");
  return (
    <OrderDiv>
      <ThanksCard>
        <h2>
          <i class="fa-solid fa-check"></i> Order #{orderNo} has been succesfully placed
          received.
        </h2>
        <Link to="/my-account">Check Your Order Detail</Link>
      </ThanksCard>
    </OrderDiv>
  );
};

export default OrderCompo;
