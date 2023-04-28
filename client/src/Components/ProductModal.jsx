import React from "react";
import { Link } from "react-router-dom";
import { ModalContainer, ModalCard, ModalLayout } from "../Styles/NotifyModal";

const ProductModal = ({
  wishlistProtected,
  cartItems,
  productId,
  localCart,
  productName,
  productImage,
}) => {
  return (
    <ModalContainer>
      {localCart === false && (
        <>
          {cartItems
            .filter((x) => x.product_id === productId)
            .map((item) => {
              return (
                <ModalCard>
                  <i class="fa-solid fa-xmark cancel_popup"></i>
                  <ModalLayout>
                    <div>
                      <img src={item.image} alt="" />
                    </div>
                    <div>
                      <h3>{item.product_name}</h3>
                      <p>has been added to cart:</p>
                    </div>
                  </ModalLayout>
                  <ModalLayout>
                    <div className="view_btn">
                      <Link to="/cart" onClick={() => wishlistProtected()}>
                        view cart
                      </Link>
                    </div>
                    <div
                      className="checkout_btn"
                      onClick={() => wishlistProtected()}
                    >
                      <Link to="/checkout">checkout</Link>
                    </div>
                  </ModalLayout>
                </ModalCard>
              );
            })}
        </>
      )}
      {localCart === true && (
        <>
          <ModalCard>
            <i class="fa-solid fa-xmark cancel_popup"></i>
            <ModalLayout>
              <div>
                <img src={productImage} alt="" />
              </div>
              <div>
                <h3>{productName}</h3>
                <p>has been added to cart:</p>
              </div>
            </ModalLayout>
            <ModalLayout>
              <div className="view_btn">
                <Link to="/cart" onClick={() => wishlistProtected()}>
                  view cart
                </Link>
              </div>
              <div className="checkout_btn" onClick={() => wishlistProtected()}>
                <Link to="/checkout">checkout</Link>
              </div>
            </ModalLayout>
          </ModalCard>
        </>
      )}
    </ModalContainer>
  );
};

export default ProductModal;
