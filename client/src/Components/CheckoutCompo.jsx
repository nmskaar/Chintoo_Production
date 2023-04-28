import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAPI } from "../Context/apiContext";
import axios from "axios";
import { toast } from "react-toastify";

const CheckoutCompo = ({ total, setTotal, setDetail, reducerValue, add }) => {
  const [check, setCheck] = useState(false);
  const [toggelForm1, setToggelForm1] = useState();
  const navigate = useNavigate();
  const { settingsData } = useAPI();

  // const taxPrice = itemsPrice * 0.14;
  // const shippingPrice = itemsPrice > 2000 ? 0 : 20;

  const user = JSON.parse(localStorage.getItem("userId"));
  const accountDetailValue = {
    user_id: user,
  };
  const [selectedID, setID] = useState("Individual");
  const [accountName, setAccountName] = useState("");
  const [gstinNo, setGstinNo] = useState("");
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [addressCountry, setAddressCountry] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressPhone, setAddressPhone] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [zipCode, setZipcode] = useState("");

  const [shipName, setShipName] = useState("");
  const [shipAddress, setShipAddress] = useState("");
  const [shipAddress2, setShipAddress2] = useState("");
  const [shipCountry, setShipCountry] = useState("");
  const [shipState, setShipState] = useState("");
  const [shipCity, setShipCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [orderNote, setOrderNote] = useState("");

  useEffect(() => {
    if (check === true) {
      setShipName(accountName);
      setShipAddress(addressOne);
      setShipAddress2(addressTwo);
      setShipCountry(addressCountry);
      setShipState(addressState);
      setShipCity(addressCity);
    } else {
      setShipName("");
      setShipAddress("");
      setShipAddress2("");
      setShipCountry("");
      setShipState("");
      setShipCity("");
    }
  });

  const getAddressDetail = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/address_detail", accountDetailValue, options)
      .then((res) => {
        setAddressOne(res.data.response.address_detail.customer_address);
        setAddressTwo(res.data.response.address_detail.address2);
        setZipcode(res.data.response.address_detail.zip);
        if (res.data.response.address_detail.country === null) {
        } else {
          setAddressCountry(res.data.response.address_detail.country);
        }
        if (res.data.response.address_detail.state === null) {
        } else {
          setAddressState(res.data.response.address_detail.state);
        }
        if (res.data.response.address_detail.city === null) {
        } else {
          setAddressCity(res.data.response.address_detail.city);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAccountDetail = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/account_detail", accountDetailValue, options)
      .then((res) => {
        setAccountName(res.data.response.account_detail.customer_name);
        setAccountEmail(res.data.response.account_detail.customer_email);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    getAddressDetail();
    getAccountDetail();
  }, []);
  const [billingDetails, setBillingDetails] = useState({
    billingCountry: "",
    billingState: "",
    billingCity: "",
    shippingCountry: "",
    shippingState: "",
    shippingCity: "",
  });

  const userId = JSON.parse(localStorage.getItem("userId"));
  // Country State City //
  const { country } = useAPI();
  const [stateId, setStateId] = useState([]);
  const [cityData, setCityData] = useState([]);
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const stateValue = {
    country_id: 101,
  };
  const cityValue = {
    state_id: addressState,
  };
  const getStateData = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/state_list", stateValue, options)
      .then((res) => {
        setStateId(res.data.response.states);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCityData = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/city_list", cityValue, options)
      .then((res) => {
        setCityData(res.data.response.cities);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getStateData();
    getCityData();
  }, []);
  const [stateData, setStateData] = useState([]);
  const [cities, setCities] = useState([]);
  const stateKey = {
    country_id: 101,
  };
  const cityKey = {
    state_id: shipState,
  };
  const getStates = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/state_list", stateKey, options)
      .then((res) => {
        setStateData(res.data.response.states);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCities = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/city_list", cityKey, options)
      .then((res) => {
        setCities(res.data.response.cities);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getStates();
    getCities();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setBillingDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [promo, setPromo] = useState("");
  const checkOutValue = {
    user_id: userId,
    billing_name: accountName,
    billing_gstin: gstinNo,
    billing_address1: addressOne,
    billing_address2: addressTwo,
    billing_country: addressCountry,
    billing_state: addressState,
    billing_city: addressCity,
    billing_zip: zipCode,
    billing_mobile: addressPhone,
    billing_email: accountEmail,
    shipping_name: shipName,
    shipping_address1: shipAddress,
    shipping_address2: shipAddress2,
    shipping_country: shipCountry,
    shipping_state: shipState,
    shipping_city: shipCity,
    shipping_zip: postCode,
    promo_code: promo,
    order_note: orderNote,
    billing_type: selectedID,
  };
  const [checkout, setCheckout] = useState([]);
  const [status, setStatus] = useState([]);
  const [billing, setBilling] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [productInfo, setProductInfo] = useState([]);
  const [trueValue, setTrueValue] = useState(false);
  const [invalidPromo, setInvalidPromo] = useState(false);
  const [proId, setProId] = useState([]);
  const [varId, setVarId] = useState([]);
  const [qtyId, setQtyId] = useState([]);
  const [pcgst, setPcgst] = useState([]);
  const [psgst, setPsgst] = useState([]);
  const [pigst, setPigst] = useState([]);
  const [price, setPrice] = useState([]);
  const [ptotal, setPtotal] = useState([]);

  const updateCheckout = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/checkout", checkOutValue, options)
      .then((res) => {
        if (
          res.data.response.message == "Invalid Promo Code..!!" ||
          res.data.response.message == ""
        ) {
          setTrueValue(false);
          setInvalidPromo(res.data.response.message);
          toast.error(res.data.response.message);
          console.log(res);
        } else {
          console.log(res);
          setTrueValue(true);
          setCheckout(res.data.response.checkout_detail);
          setBilling(res.data.response.checkout_detail.billing_address);
          setShipping(res.data.response.checkout_detail.shipping_address);
          setProductInfo(res.data.response.checkout_detail.product_info);
          setStatus(res.data.response.status);
          setTotal(checkout.total);
          setAddressPhone(JSON.parse(localStorage.getItem("username")));
          getStateData();
          getCityData();
        }
        if (res.data.response.status === "ok") {
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCheckBtn = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/checkout", checkOutValue, options)
      .then((res) => {
        if (
          res.data.response.message == "Invalid Promo Code..!!" ||
          res.data.response.message == ""
        ) {
          setTrueValue(false);
          setInvalidPromo(res.data.response.message);
          toast.error(res.data.response.message);
          console.log(res);
        } else {
          console.log(res);
          setTrueValue(true);
          setCheckout(res.data.response.checkout_detail);
          setBilling(res.data.response.checkout_detail.billing_address);
          setShipping(res.data.response.checkout_detail.shipping_address);
          setProductInfo(res.data.response.checkout_detail.product_info);
          setStatus(res.data.response.status);
          setTotal(checkout.total);
          setAddressPhone(JSON.parse(localStorage.getItem("username")));
          getStateData();
          getCityData();
          toast.success("Updated Checkout Detail");
        }
        if (res.data.response.status === "ok") {
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePromocode = () => {
    if (!promo) {
      return toast.error("Promo code is required");
    }
    if (!billingDetails.billingCountry) {
      return toast.error("Billing country is required");
    }
    if (!billingDetails.billingState) {
      return toast.error("Billing state is required");
    }
    if (!billingDetails.billingCity) {
      return toast.error("Billing city is required");
    }
    if (!billingDetails.shippingZip) {
      return toast.error("Postcode is required");
    }
    updateCheckout();
  };

  const [ApiKey, setApiKey] = useState("");
  const [ApiSecret, setApiSecret] = useState("");
  const [ApiImage, setApiImage] = useState("");
  const dataSetting = () => {
    settingsData.map((item) => {
      setApiKey(item.razorpay_key);
      setApiSecret(item.razorpay_secret);
      setApiImage(item.favicon);
      return <div></div>;
    });
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  const [crateOrder, setCreateOrder] = useState([]);
  const [orderAmount, setOrderAmount] = useState("");

  const totalCheck = localStorage.getItem("total");

  const displayRazorpay = async () => {
    const header = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const data = await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/create_order", { amount: totalCheck }, header)
      .then((res) => {
        setCreateOrder(res.data.response.order_detail);
        setOrderAmount(res.data.response.order_detail.amount);
        console.log(res.data.response.order_detail.amount);
      })
      .catch((err) => {
        console.log(err);
      });

    const options = {
      key: "rzp_test_RUdUif7nYHpw1g",
      currency: "INR",
      amount: totalCheck * 100,
      name: checkout.billing_name,
      description: "Test Wallet Transaction",
      image: ApiImage,
      order_id: crateOrder.id,
      callback_url: "",
      handler: function (response) {
        if (
          typeof response.razorpay_payment_id == "undefined" ||
          response.razorpay_payment_id < 1
        ) {
          navigate("/checkout");
        } else {
          navigate("/order-complete");
          localStorage.setItem("paymentId", response.razorpay_payment_id);
          localStorage.setItem("orderId", response.razorpay_order_id);
          localStorage.setItem("sign", response.razorpay_signature);
          console.log(placeValue);
          placeOrder();
        }
      },
      prefill: {
        name: billing.billing_name,
        email: billing.billing_email,
        contact: billing.billing_mobile,
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const paymentId = localStorage.getItem("paymentId");
  const orderId = localStorage.getItem("orderId");
  const signature = localStorage.getItem("sign");

  const handleInfo = () => {
    productInfo.map((item) => {
      setProId((current) => [...current, item.product_id]);
      setVarId((current) => [...current, item.product_variant_id]);
      setQtyId((current) => [...current, item.qty]);
      setPcgst((current) => [...current, item.pcgst]);
      setPsgst((current) => [...current, item.psgst]);
      setPigst((current) => [...current, item.pigst]);
      setPrice((current) => [...current, item.price]);
      setPtotal((current) => [...current, item.ptotal]);
      console.log(proId);
      console.log(varId);
      console.log(qtyId);
      console.log(psgst);
      console.log(pcgst);
      console.log(pigst);
      console.log(price);
      console.log(ptotal);
      return <></>;
    });
  };

  const placeValue = {
    user_id: userId,
    billing_name: billing.billing_name,
    billing_gstin: billing.billing_gstin,
    billing_address1: billing.billing_address1,
    billing_address2: billing.billing_address2,
    billing_country: billing.billing_country,
    billing_state: billing.billing_state,
    billing_city: billing.billing_city,
    billing_zip: billing.billing_zip,
    billing_mobile: billing.billing_mobile,
    billing_email: billing.billing_email,
    shipping_name: shipping.shipping_name,
    shipping_address1: shipping.shipping_address1,
    shipping_address2: shipping.shipping_address2,
    shipping_country: shipping.shipping_country,
    shipping_state: shipping.shipping_state,
    shipping_city: shipping.shipping_city,
    shipping_zip: shipping.shipping_zip,
    order_note: checkout.order_note,
    billing_type: checkout.billing_type,
    subtotal: checkout.subtotal,
    discount: checkout.discount,
    cgst: checkout.cgst,
    sgst: checkout.sgst,
    igst: checkout.igst,
    tax: checkout.tax,
    shipping: checkout.shipping,
    total: checkout.total,
    product_id: proId,
    product_variant_id: varId,
    qty: qtyId,
    pcgst: pcgst,
    psgst: psgst,
    pigst: pigst,
    price: price,
    ptotal: ptotal,
    razorpay_payment_id: localStorage.getItem("paymentId"),
    razorpay_order_id: localStorage.getItem("orderId"),
    razorpay_signature: localStorage.getItem("sign"),
  };
  const placeOrder = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/place_order", placeValue, options)
      .then((res) => {
        console.log(res);
        localStorage.setItem(
          "placeOrder",
          JSON.stringify(res.data.response.order_detail)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    updateCheckout();
  }, []);

  localStorage.setItem("total", JSON.stringify(checkout.total));

  useEffect(() => {
    dataSetting();
  }, []);

  return (
    <>
      <CheckoutLink>
        <h3>
          Have a coupon?{" "}
          <span onClick={() => setToggelForm1(!toggelForm1)}>
            ENTER YOUR CODE
          </span>
        </h3>
        <LinkForms className={toggelForm1 ? "block" : "none"}>
          <p>If you have a coupon code, please apply it below.</p>
          <CouponDiv>
            <div>
              <input
                type="text"
                value={promo}
                onChange={(e) => setPromo(e.target.value)}
                placeholder="Coupon code"
              />
            </div>
            <LoginBtn to="#" onClick={() => handlePromocode()}>
              APPLY COUPON
            </LoginBtn>
          </CouponDiv>
          <Message>{invalidPromo}</Message>
        </LinkForms>
      </CheckoutLink>
      <CheckoutLayout>
        <CheckoutGrid>
          <CheckoutCard>
            <h3>BILLING DETAILS</h3>
            <BillingType>
              <span>Billing Type *</span>
              <span>
                <input
                  type="radio"
                  id="Individual"
                  checked={"Individual" === selectedID}
                  onChange={() => {
                    setID("Individual");
                  }}
                />
              </span>
              <span>Individual</span>
              <span>
                <input
                  type="radio"
                  id="Buisness / Corporate"
                  checked={"Buisness / Corporate" === selectedID}
                  onChange={() => {
                    setID("Buisness / Corporate");
                  }}
                />
              </span>
              <span>Buisness / Corporate</span>
            </BillingType>
            <div className="grid">
              <div>
                <label>
                  {selectedID === "Buisness / Corporate"
                    ? "Company Name *"
                    : "Name *"}
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                />
              </div>
              <div>
                <label>
                  {selectedID === "Buisness / Corporate"
                    ? "Company GSTIN (optional)"
                    : "GSTIN (optional)"}
                </label>
                <input
                  type="text"
                  value={gstinNo}
                  onChange={(e) => setGstinNo(e.target.value)}
                />
              </div>
            </div>
            <label>
              {selectedID === "Buisness / Corporate"
                ? "Company Street Address *"
                : "Street Address *"}
            </label>
            <input
              type="text"
              placeholder="House number and street name"
              required
              value={addressOne}
              onChange={(e) => setAddressOne(e.target.value)}
            />
            <label></label>
            <input
              type="text"
              placeholder="Apartment, suit, unit etc. (optional)"
              required
              value={addressTwo}
              onChange={(e) => setAddressTwo(e.target.value)}
            />
            <div className="grid">
              <div>
                <label>
                  {selectedID === "Buisness / Corporate"
                    ? "Company Country/ Region *"
                    : "Country/ Region *"}
                </label>
                <select
                  value={addressCountry}
                  onChange={(e) => setAddressCountry(e.target.value)}
                >
                  <option>Select Country</option>
                  {country.map((item) => {
                    return (
                      <option value={item.id} id={item.id}>
                        {item.value}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label>
                  {selectedID === "Buisness / Corporate"
                    ? "Company State *"
                    : "State *"}
                </label>
                <select
                  onClick={() => getStateData()}
                  value={addressState}
                  onChange={(e) => setAddressState(e.target.value)}
                >
                  <option>Select State</option>
                  {addressCountry.length == 0 && null}
                  {addressCountry.length > 1 && (
                    <>
                      {stateId
                        ? stateId.map((state) => {
                            return (
                              <option value={state.st_id}>
                                {state.st_name}
                              </option>
                            );
                          })
                        : null}
                    </>
                  )}
                </select>
              </div>
            </div>
            <div className="grid">
              <div>
                <label>
                  {selectedID === "Buisness / Corporate"
                    ? "Company City *"
                    : "City *"}
                </label>
                <select
                  onClick={() => getCityData()}
                  value={addressCity}
                  onChange={(e) => setAddressCity(e.target.value)}
                >
                  <option>Select City</option>
                  {addressState.length == 0 && null}
                  {addressState.length > 1 && (
                    <>
                      {cityData
                        ? cityData.map((city) => {
                            return <option value={city.id}>{city.name}</option>;
                          })
                        : null}
                    </>
                  )}
                </select>
              </div>
              <div>
                <label>
                  {selectedID === "Buisness / Corporate"
                    ? "Company ZIP *"
                    : "ZIP *"}
                </label>
                <input
                  type="text"
                  value={zipCode}
                  onChange={(e) => setZipcode(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="grid">
              <div>
                <label>
                  {selectedID === "Buisness / Corporate"
                    ? "Company Phone *"
                    : "Phone *"}
                </label>
                <input
                  type="number"
                  value={addressPhone}
                  onChange={(e) => setAddressPhone(e.target.value)}
                />
              </div>
              <div>
                <label>
                  {selectedID === "Buisness / Corporate"
                    ? "Company Email address *"
                    : "Email address *"}
                </label>
                <input
                  type="email"
                  value={accountEmail}
                  onChange={(e) => setAccountEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="flex_address">
              <input type="checkbox" onChange={() => setCheck(!check)} />
              <span>Same as above?</span>
            </div>
            <h3>SHIPPING DETAILS</h3>
            <div className="grid">
              <div>
                <label>Name*</label>
                <input
                  type="text"
                  value={check ? accountName : shipName}
                  onChange={(event) => setShipName(event.target.value)}
                />
              </div>
              <div>
                <label>Company name (optional)*</label>
                <input type="text" />
              </div>
            </div>
            <label>Street Address *</label>
            <input
              type="text"
              placeholder="House number and street name"
              required
              value={check ? addressOne : shipAddress}
              onChange={(event) => setShipAddress(event.target.value)}
            />
            <label></label>
            <input
              type="text"
              placeholder="Apartment, suit, unit etc. (optional)"
              required
              value={check ? addressTwo : shipAddress2}
              onChange={(event) => setShipAddress2(event.target.value)}
            />
            <div className="grid">
              <div>
                <label>Country*</label>
                <select
                  name="shippingCountry"
                  value={check ? addressCountry : shipCountry}
                  onChange={(e) => setShipCountry(e.target.value)}
                >
                  <option>Select Country</option>
                  {country.map((item) => {
                    return (
                      <option value={item.id} id={item.id}>
                        {item.value}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label>State *</label>
                <select
                  name="shippingState"
                  onClick={() => getStates()}
                  value={check ? addressState : shipState}
                  onChange={(e) => setShipState(e.target.value)}
                >
                  <option>Select State</option>
                  {check ? (
                    <>
                      {addressCountry.length == 0 && null}
                      {addressCountry.length > 1 && (
                        <>
                          {stateId
                            ? stateId.map((state) => {
                                return (
                                  <option value={state.st_id}>
                                    {state.st_name}
                                  </option>
                                );
                              })
                            : null}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {shipCountry == 0 && null}
                      {shipCountry > 1 && (
                        <>
                          {stateData.map((state) => {
                            return (
                              <option value={state.st_id}>
                                {state.st_name}
                              </option>
                            );
                          })}
                        </>
                      )}
                    </>
                  )}
                </select>
              </div>
            </div>
            <div className="grid">
              <div>
                <label>City *</label>
                <select
                  onClick={() => getCities()}
                  name="shippingCity"
                  value={check ? addressCity : shipCity}
                  onChange={(e) => setShipCity(e.target.value)}
                >
                  <option>Select City</option>
                  {check ? (
                    <>
                      {addressState.length == 0 && null}
                      {addressState.length > 1 && (
                        <>
                          {cityData
                            ? cityData.map((city) => {
                                return (
                                  <option value={city.id}>{city.name}</option>
                                );
                              })
                            : null}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {shipState.length == 0 && null}
                      {shipState.length > 1 && (
                        <>
                          {cities
                            ? cities.map((city) => {
                                return (
                                  <option value={city.id}>{city.name}</option>
                                );
                              })
                            : null}
                        </>
                      )}
                    </>
                  )}
                </select>
              </div>
              <div>
                <label>Postcode *</label>
                <input
                  type="text"
                  required
                  value={postCode}
                  onChange={(e) => setPostCode(e.target.value)}
                />
              </div>
            </div>
            <label>Order notes (optional)</label>
            <textarea
              cols="30"
              rows="3"
              value={orderNote}
              onChange={(e) => setOrderNote(e.target.value)}
              placeholder="Notes about your order, e.g special notes for delivery"
            ></textarea>
            <UpdateBtn
              onClick={() => {
                handleInfo();
                updateCheckout();
              }}
            >
              Update Details
            </UpdateBtn>
          </CheckoutCard>

          <CheckoutCard>
            <h3>YOUR ORDER</h3>
            <h4>Product</h4>
            <div className="border_card"></div>
            {trueValue === true ? (
              <>
                <>
                  {productInfo.map((item, index) => {
                    return (
                      <div key={index}>
                        <div className="flex_order">
                          <p>
                            {item.product_name}{" "}
                            <i class="fa-solid fa-xmark"></i>
                            {item.qty}
                          </p>
                          <p>₹{item.price}</p>
                        </div>
                      </div>
                    );
                  })}
                </>
                <div>
                  <div className="flex_order">
                    <h4>Subtotal:</h4>
                    <h4>₹{checkout.subtotal}</h4>
                  </div>
                  <div className="flex_order">
                    <h4>Discount:</h4>
                    <h4>₹{checkout.discount}</h4>
                  </div>
                  <div className="flex_order">
                    <h4>Shipping Charges:</h4>
                    <h4>₹{checkout.shipping}</h4>
                  </div>
                  <div className="flex_order">
                    <h4>Total Tax:</h4>
                    <h4>₹{checkout.tax}</h4>
                  </div>
                  <div className="border_card"></div>
                  <div className="flex_order">
                    <h4>Total</h4>
                    <h4>₹{checkout.total}</h4>
                  </div>
                </div>
              </>
            ) : null}
            <div className="border_card"></div>
            <PlaceOrderBtn
              onClick={() => {
                displayRazorpay();
                handleInfo();
              }}
            >
              <Link to="#">PLACE ORDER</Link>
            </PlaceOrderBtn>
          </CheckoutCard>
        </CheckoutGrid>
      </CheckoutLayout>
    </>
  );
};

export default CheckoutCompo;

const CheckoutLink = styled.div`
  margin-bottom: 25px;
  h3 {
    font-size: 15px;
    font-weight: 500;
    line-height: 1.1;
    margin-bottom: 1rem;
    color: #666;
    font-family: "TillanaSemiBold";

    span {
      color: #333;
      cursor: pointer;
      font-family: "TillanaSemiBold";
      margin-left: 2px;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  @media only screen and (max-width: 991px) {
    padding: 0px 10px;
  }
`;

const LinkForms = styled.div`
  border: 1px solid #eee;
  border-top-width: 4px;
  margin-bottom: 1rem;
  transition: all 0.3s ease-in-out;
  padding: 30px;

  .none {
    display: none;
  }
  .block {
    display: block;
  }
  p {
    color: #666;
    font-weight: 500;
    font-size: 15px;
    font-family: "TillanaSemiBold";
  }
  .grid_input {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 1rem;
    padding: 15px 0px;
    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: #666;
      font-family: "TillanaSemiBold";
    }
    input {
      width: 100%;
      padding: 10px 15px;
      outline: none;
      border: none;
      border: 1px solid #dad9d9;
      font-size: 16px;
      font-weight: 500;
      border-radius: 5px;
      font-family: "TillanaSemiBold";
    }
  }
  @media only screen and (max-width: 991px) {
    .grid_input {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 1rem;
    }
  }
`;

const Message = styled.div`
  /* display: block; */
  margin-bottom: 10px;
  color: red;
  font-weight: 500;
`;

const LoginBtn = styled(Link)`
  margin: auto;
  margin-bottom: 20px;
  padding: 7px 20px;
  border-radius: 5px;
  background-color: #eee;
  font-weight: 500;
  font-size: 18px;
  color: #333;
  font-family: "TillanaSemiBold";

  &:hover {
    background-color: #336699;
    color: #fff;
    transition: all 0.3s ease-out;
  }
  @media only screen and (max-width: 991px) {
    padding: 7px 25px;
  }
`;

const CouponDiv = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 250px 200px;
  input {
    width: 250px;
    padding: 10px 15px;
    outline: none;
    border: none;
    border: 1px solid #dad9d9;
    font-size: 16px;
    font-weight: 500;
    margin-right: 15px;
    border-radius: 5px;
  }
  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    input {
      margin-bottom: 0px;
    }
  }
`;

const CheckoutLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media only screen and (max-width: 991px) {
    padding-bottom: 10rem;
  }
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 2fr;
  grid-gap: 1rem;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    grid-gap: 0rem;
  }
`;

const CheckoutCard = styled.div`
  padding-bottom: 4rem;
  .none {
    display: none;
  }
  .block {
    display: block;
  }
  h3 {
    text-align: left;
    color: #333;
    margin-top: 20px;
    font-family: "TillanaSemiBold";
  }
  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #666;
    margin-top: 15px;
    font-family: "TillanaSemiBold";
  }
  input,
  select,
  textarea {
    width: 100%;
    padding: 10px 15px;
    outline: none;
    border: none;
    border: 1px solid #dad9d9;
    font-size: 16px;
    font-weight: 500;
    border-radius: 5px;
    color: #000;
    font-family: "TillanaSemiBold";

    &::placeholder {
      color: #666;
    }
  }
  .marginTop {
    margin-top: 10px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.5rem;

    input {
      width: 350px;
      font-family: "TillanaSemiBold";
    }
  }
  .flex_address {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    input {
      width: 18px;
      height: 18px;
    }
    span {
      margin: 8px;
      color: #333;
      font-weight: 500;
      font-size: 17px;
      font-family: "TillanaSemiBold";
    }
  }
  &:nth-child(2) {
    border: 1px solid #eee;
    height: 700px;
    padding: 20px;
    margin-top: 50px;

    h4 {
      padding: 5px 0px;
      color: #333;
      font-size: 17px;
      font-weight: 500;
      font-family: "TillanaSemiBold";
    }
    .border_card {
      background-color: #eee;
      height: 2px;
      width: 100%;
      margin: 10px 0px;
    }
    .flex_order {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 7px;

      p {
        font-weight: 500;
        color: #666;
        font-family: "TillanaSemiBold";
      }
      i {
        margin: 0px 5px;
      }
      h4 {
        font-weight: 500 !important;
        font-size: 17px !important;
        font-family: "TillanaSemiBold";
      }
    }
    @media only screen and (max-width: 991px) {
      margin-top: 20px;
    }
  }
  @media only screen and (max-width: 991px) {
    padding: 0px 10px;
    .grid {
      display: grid;
      grid-template-columns: 1fr;
      grid-gap: 0.5rem;

      input {
        width: 100%;
      }
    }
  }
`;

const Shipping = styled.div`
  div {
    display: flex;
    align-items: center;
    input {
      width: 18px;
      height: 18px;
    }
    span {
      margin: 8px;
      color: #333;
      font-weight: 500;
      font-size: 15px;
      font-family: "TillanaSemiBold";
    }
  }
`;

const PaymentMethods = styled.div`
  .payment_grid {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    input {
      width: 18px;
      height: 18px;
      margin-top: 8px;
      margin-right: 10px;
    }
    span {
      margin: 8px;
      color: #333;
      font-weight: 500;
      font-size: 15px;
    }
    h4 {
      font-size: 15px !important;
      font-weight: 400;
      color: #666;

      a {
        text-decoration: none;
        color: #336699;
        font-family: "TillanaSemiBold";
        margin-left: 10px;
      }
    }
  }
`;

const PlaceOrderBtn = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 10px;
  background-color: #336699;
  border-radius: 5px;
  text-align: center;
  font-weight: 500;
  cursor: pointer;

  a {
    color: #fff;
    font-family: "TillanaSemiBold";
  }
`;

const UpdateBtn = styled.div`
  border: 2px solid #333;
  padding: 4px 15px;
  width: 25%;
  text-align: center;
  border-radius: 3px;
  font-weight: 500;
  margin-top: 1rem;
  color: #333;
  font-family: "TillanaSemiBold";
  cursor: pointer;
`;

const BillingType = styled.form`
  display: flex;
  input {
    width: 20px;
    height: 20px;
  }
  span {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
  }
`;
