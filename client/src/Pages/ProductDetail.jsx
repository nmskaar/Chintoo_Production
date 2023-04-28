import React, { useEffect } from "react";
import DetailProduct from "../Components/DetailProduct";

const ProductDetail = ({
  cartItems,
  onAdd,
  onRemove,
  setCartItems,
  forceUpdate,
  reducerValue,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <DetailProduct
        onAdd={onAdd}
        cartItems={cartItems}
        setCartItems={setCartItems}
        onRemove={onRemove}
        forceUpdate={forceUpdate}
        reducerValue={reducerValue}
      />
    </div>
  );
};

export default ProductDetail;
