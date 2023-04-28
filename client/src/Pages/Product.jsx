import React, { useEffect } from "react";
import ProductCompo from "../Components/ProductCompo";

const Product = ({
  showFilterSidebar,
  setShowFilterSidebar,
  onAdd,
  cartItems,
  onRemove,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <ProductCompo
        showFilterSidebar={showFilterSidebar}
        setShowFilterSidebar={setShowFilterSidebar}
        onAdd={onAdd}
        cartItems={cartItems}
        onRemove={onRemove}
      />
    </div>
  );
};

export default Product;
