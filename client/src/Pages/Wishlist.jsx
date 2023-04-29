import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-toastify";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [productId, setProductId] = useState("");
  const [add, setAdd] = useState(1);
  const increment = () => {
    setAdd(add + 1);
  };
  const userId = JSON.parse(localStorage.getItem("userId"));
  const wishlistValue = {
    user_id: userId,
  };
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const getWishList = async () => {
    await axios
      .post("/api1/get_wishlist", wishlistValue, options)
      .then((res) => {
        setWishlist(res.data.response.wish_list);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteWishlist = async (item) => {
    try {
      const res = await axios.post(
        "/api1/delete_from_wishlist",
        { user_id: userId, product_id: item.product_id },
        options
      );
      if (res.data.response.message == "already exist") {
        return toast.error(res.data.response.message);
      }
      if (res.data.response.message == "required_field") {
        return toast.error(res.data.response.message);
      }
      increment();
      getWishList();
      toast.success("Deleted Succesfully");
    } catch (error) {
      toast.error(error);
    }
  };

  //-- ADD PRODUCT TO CART API --//
  const addToCart = async (item) => {
    try {
      const res = await axios.post(
        "/api1/add_to_cart",
        {
          user_id: userId,
          product_id: item.product_id,
          quantity: 1,
          action: "increment",
          product_variant_id: item.product_variant_id,
        },
        options
      );
      toast.success("Product Added To Cart Succesfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishList();
  }, [add]);
  return (
    <CartLayout>
      <CartCard>
        <div className="product">
          <div>
            <p>Product</p>
          </div>
          <div>
            <p>Price</p>
          </div>
          <div className="action">
            <p>Actions</p>
          </div>
        </div>
        <div className="border_product"></div>
        <>
          {wishlist ? (
            wishlist.map((item) => {
              return (
                <div className="flex_cart">
                  <div className="productImg">
                    <img src={item.product_image} alt="" />
                    <div
                      onClick={() => {
                        setProductId(item.product_id);
                        deleteWishlist(item);
                      }}
                    >
                      <i class="fa-solid fa-xmark"></i>
                    </div>
                  </div>
                  <p>{item.product_name}</p>
                  <h3>₹{item.product_price}</h3>
                  <div className="number">
                    <div className="numberProducts">
                      <div>
                        <span></span>
                      </div>
                      <div></div>
                    </div>
                  </div>
                  <div className="cartBtn" onClick={() => addToCart(item)}>
                    Add To Cart
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty">Wishlist is empty</div>
          )}
        </>
        {/* )} */}
      </CartCard>
    </CartLayout>
  );
};

export default Wishlist;

const CartLayout = styled.div`
  padding: 5rem calc((100vw - 1250px) / 2);
  padding-bottom: 10rem;
  font-family: "TillanaBold" !important;
`;

const CartCard = styled.div`
  margin-top: 1.5rem;
  .product {
    display: grid;
    grid-template-columns: 2.5fr 1.5fr 1fr;
    grid-gap: 1rem;

    p {
      font-weight: 500;
      font-size: 18px;
      font-family: "TillanaSemiBold";
    }
    .action {
      text-align: center !important;
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
    grid-template-columns: 0.45fr 1fr 1fr 0.5fr 0.8fr;
    grid-gap: 1rem;
    margin-bottom: 1rem;

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
      font-size: 15px;
      color: #2e2d2d;
      height: 6vh;

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
    .cartBtn {
      margin: auto;
      cursor: pointer;
      color: #fff;
      background-color: #336699;
      padding: 9px 15px;
      text-transform: uppercase;
      font-weight: 500;
      width: 100%;
      text-align: center;
      border-radius: 5px;
      height: 7vh;
      font-family: "TillanaSemiBold";
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
        right: 11%;
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
  @media only screen and (max-width: 991px) {
    margin-top: 0rem;
  }
`;
