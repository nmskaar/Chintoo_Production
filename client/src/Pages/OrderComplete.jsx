import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ProcessHead } from "../Styles/CommonStyles";
import OrderCompo from "../Components/OrderCompo";

const OrderComplete = ({ detail }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <ProcessHead>
      <OrderCompo detail={detail} />
    </ProcessHead>
  );
};

export default OrderComplete;
