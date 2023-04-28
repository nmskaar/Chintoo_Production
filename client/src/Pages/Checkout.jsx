import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ProcessHead } from "../Styles/CommonStyles";
import CheckoutCompo from "../Components/CheckoutCompo";

const Checkout = ({total, setTotal, reducerValue, add}) => {
  const [toggelForm, setToggelForm] = useState();
  const [toggelForm1, setToggelForm1] = useState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <ProcessHead>
      <h1>
        <Link to="/cart">Shopping Cart</Link>
        <i className="fa-solid fa-chevron-right"></i>
        <Link to="#">
          <span>Checkout</span>
        </Link>
        <i className="fa-solid fa-chevron-right"></i>
        <Link to="#">Order Complete</Link>
      </h1>
      <CheckoutCompo total={total} setTotal={setTotal} reducerValue={reducerValue} add={add} />
    </ProcessHead>
  );
};

export default Checkout;
