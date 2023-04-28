import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CartCompo from "../Components/CartCompo";
import { ProcessHead } from "../Styles/CommonStyles";

const Cart = ({
  add,
  setAdd,
  increment,
  cartItems,
  onAdd,
  onRemove,
  removeItem,
  forceUpdate,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <ProcessHead>
      <h1>
        <Link to="#">
          <span>Shopping Cart</span>
        </Link>
        <i className="fa-solid fa-chevron-right"></i>
        <Link to="/checkout" onClick={() => increment()}>
          Checkout
        </Link>
        <i className="fa-solid fa-chevron-right"></i>
        <Link to="#">Order Complete</Link>
      </h1>
      <CartCompo
        add={add}
        setAdd={setAdd}
        increment={increment}
        cartItems={cartItems}
        onAdd={onAdd}
        onRemove={onRemove}
        removeItem={removeItem}
        forceUpdate={forceUpdate}
      />
    </ProcessHead>
  );
};

export default Cart;
