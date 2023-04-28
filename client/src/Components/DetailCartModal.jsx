import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Aos from "aos";
import { ModalContainer, ModalCard, ModalLayout } from "../Styles/NotifyModal";

const DetailCartModal = ({ localCart, cartItems }) => {
  const navigate = useNavigate();

  const wishlistProtected = () => {
    if (localStorage.getItem("userId")) {
      console.log("true");
    } else {
      navigate("/login");
    }
  };
  return (
    <ModalContainer>
      {/* <>
        {localCart === false && (
          <>
            {cartItems
              .filter((x) => x.product_id === productId)
              .map((item) => {
                return (
                  <ModalCard>
                    <i
                      class="fa-solid fa-xmark cancel_popup"
                    ></i>
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
                      <div className="checkout_btn">
                        <Link
                          to="/checkout"
                          onClick={() => wishlistProtected()}
                        >
                          checkout
                        </Link>
                      </div>
                    </ModalLayout>
                  </ModalCard>
                );
              })}
          </>
        )}
      </> */}
    </ModalContainer>
  );
};

export default DetailCartModal;
