import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { BsCardChecklist } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { ImLocation } from "react-icons/im";
import { BsArrowLeft } from "react-icons/bs";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { FaFileInvoiceDollar } from "react-icons/fa";
import { TbFileInvoice } from "react-icons/tb";
import styled from "styled-components";
import { toast } from "react-toastify";
import PasswordInput from "../Components/PasswordInput";
import axios from "axios";
import { useAPI } from "../Context/apiContext";

const MyAccount = ({ setAccount }) => {
  const [toggleBtn, setToggleBtn] = useState(1);

  const toggleTab = (index) => {
    setToggleBtn(index);
  };

  const [editAddress, setEditAddress] = useState(false);
  const user = JSON.parse(localStorage.getItem("userId"));
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const accountDetailValue = {
    user_id: user,
  };
  const [accountName, setAccountName] = useState("");
  const [accountEmail, setAccountEmail] = useState("");
  const [detailData, setDetailData] = useState([]);
  const getAccountDetail = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/account_detail", accountDetailValue, options)
      .then((res) => {
        setDetailData(res.data.response.account_detail);
        setAccountName(res.data.response.account_detail.customer_name);
        setAccountEmail(res.data.response.account_detail.customer_email);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Update Accout Details
  const accountValue = {
    user_id: user,
    name: accountName,
    email: accountEmail,
  };
  const updateAccountDetails = async () => {
    try {
      if (!accountName || !accountEmail) {
        return toast.error("All fields are required");
      }
      const res = await axios.post(
        "https://applexinfotech.com/chintoo2/admin/api1/update_account_detail",
        accountValue,
        options
      );
      if (res.data.response.message == "required_field") {
        return toast.error(res.data.response.message);
      }
      toast.success(res.data.response.message);
      console.log(res);
    } catch (error) {
      toast.error(error);
    }
  };

  const [addressData, setAddressData] = useState([]);
  const [addressOne, setAddressOne] = useState("");
  const [addressTwo, setAddressTwo] = useState("");
  const [zipCode, setZipcode] = useState("");

  const getAddressDetail = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/address_detail", accountDetailValue, options)
      .then((res) => {
        setAddressData(res.data.response.address_detail);
        setAddressOne(res.data.response.address_detail.customer_address);
        setAddressTwo(res.data.response.address_detail.address2);
        setZipcode(res.data.response.address_detail.zip);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [add, setAdd] = useState(1);
  const increment = () => {
    setAdd(add + 1);
  };

  const { country } = useAPI();
  const [cntId, setCntId] = useState("");
  const [stId, setStid] = useState("");
  const [idCity, setIdCity] = useState("");
  const [stateId, setStateId] = useState([]);
  const [cityData, setCityData] = useState([]);
  const stateValue = {
    country_id: cntId,
  };
  const cityValue = {
    state_id: stId,
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

  const userAddress = JSON.parse(localStorage.getItem("userId"));

  // Invoice List
  const [invoiceList, setInvoiceList] = useState([]);
  const getInvoiceList = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/invoice_list", { user_id: userAddress }, options)
      .then((res) => {
        setInvoiceList(res.data.response.invoice_list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Order List
  const [orderList, setOrderList] = useState([]);
  const getOrderList = async () => {
    await axios
      .post("https://applexinfotech.com/chintoo2/admin/api1/order_list", { user_id: userAddress }, options)
      .then((res) => {
        setOrderList(res.data.response.order_list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addressUpdateValue = {
    user_id: userAddress,
    address1: addressOne,
    address2: addressTwo,
    city: idCity,
    state: stId,
    country: cntId,
    zip: zipCode,
  };
  const updateAdrees = async (event) => {
    try {
      if (
        !addressOne ||
        !addressTwo ||
        !idCity ||
        !stId ||
        !cntId ||
        !zipCode
      ) {
        return toast.error("All fields are required");
      }
      const res = await axios.post(
        "https://applexinfotech.com/chintoo2/admin/api1/update_address_detail",
        addressUpdateValue,
        options
      );
      if (res.data.response.message == "required_field") {
        return toast.error(res.data.response.message);
      }
      toast.success(res.data.response.message);
      console.log(res);
      setEditAddress(false);
      increment();
      setAddressOne("");
      setAddressTwo("");
      setZipcode("");
      event.preventDefault();
    } catch (error) {
      toast.error(error);
    }
  };

  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("userId");
    setAccount(false);
    toast.success("Logout Successfull");
    navigate("/Login");
  };

  const [updatePassword, setUpdatePassword] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const passwordValue = {
    user_id: user,
    old_password: updatePassword.oldPassword,
    new_password: updatePassword.newPassword,
  };
  const updatePasswordForm = async () => {
    try {
      if (!updatePassword.oldPassword || !updatePassword.newPassword) {
        return toast.error("All fields are required");
      }
      const res = await axios.post(
        "https://applexinfotech.com/chintoo2/admin/api1/change_password",
        passwordValue,
        options
      );
      if (res.data.response.message == "invalid old password") {
        return toast.error(res.data.response.message);
      }
      toast.success(res.data.response.message);
      console.log(res);
      setUpdatePassword({
        oldPassword: "",
        newPassword: "",
      });
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getAccountDetail();
    getAddressDetail();
    getInvoiceList();
    getOrderList();
  }, [add]);

  useEffect(() => {
    console.log("");
  }, [cntId, stId]);

  return (
    <AccountContainer>
      <Accoutgrid>
        <AccountCard>
          <ul>
            <li
              className={toggleBtn === 1 ? "active" : ""}
              onClick={() => {
                toggleTab(1);
              }}
            >
              <Link to="#">Dashboard</Link>
            </li>
            <li
              className={toggleBtn === 2 ? "active" : ""}
              onClick={() => {
                toggleTab(2);
              }}
            >
              <Link to="#">Order</Link>
            </li>
            <li
              className={toggleBtn === 6 ? "active" : ""}
              onClick={() => {
                toggleTab(6);
              }}
            >
              <Link to="#">Invoices</Link>
            </li>
            <li
              className={toggleBtn === 3 ? "active" : ""}
              onClick={() => {
                toggleTab(3);
              }}
            >
              <Link to="#">Addresses</Link>
            </li>
            <li
              className={toggleBtn === 4 ? "active" : ""}
              onClick={() => {
                toggleTab(4);
              }}
            >
              <Link to="#">Account details</Link>
            </li>
            <li
              className={toggleBtn === 5 ? "active" : ""}
              onClick={() => {
                toggleTab(5);
              }}
            >
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link to="#" onClick={() => logoutHandler()}>
                Logout
              </Link>
            </li>
          </ul>
        </AccountCard>
        <AccountCard>
          <div className={toggleBtn === 1 ? "block" : "none"}>
            <p>
              From your account dashboard you can view your{" "}
              <Link to="#">recent orders</Link>, manage your{" "}
              <Link to="#">shipping and billing addresses</Link>, and{" "}
              <Link to="#">edit your password and account details.</Link>
            </p>
            <DashboardGrid>
              <DashboardCard>
                <BsCardChecklist className="icon" />
                <Link
                  to="#"
                  className={toggleBtn === 2 ? "" : ""}
                  onClick={() => {
                    toggleTab(2);
                  }}
                >
                  Order
                </Link>
              </DashboardCard>
              <DashboardCard>
                <TbFileInvoice className="icon" />
                <Link
                  to="#"
                  className={toggleBtn === 6 ? "" : ""}
                  onClick={() => {
                    toggleTab(6);
                  }}
                >
                  Invoice
                </Link>
              </DashboardCard>
              <DashboardCard>
                <GoLocation className="icon" />
                <Link
                  to="#"
                  className={toggleBtn === 3 ? "" : ""}
                  onClick={() => {
                    toggleTab(3);
                  }}
                >
                  Addresses
                </Link>
              </DashboardCard>
              <DashboardCard>
                <IoPersonOutline className="icon" />
                <Link
                  to="#"
                  className={toggleBtn === 4 ? "" : ""}
                  onClick={() => {
                    toggleTab(4);
                  }}
                >
                  Account details
                </Link>
              </DashboardCard>
              <DashboardCard>
                <AiOutlineHeart className="icon" />
                <Link to="/wishlist">Wishlist</Link>
              </DashboardCard>
              <DashboardCard>
                <BiLogOut className="icon" />
                <Link to="#" onClick={() => logoutHandler()}>
                  Logout
                </Link>
              </DashboardCard>
            </DashboardGrid>
          </div>
          <div className={toggleBtn === 2 ? "block" : "none"}>
            <AddressDetail style={{ marginBottom: "2rem" }}>
              <div className="address_title">
                <BiPurchaseTagAlt className="mapIcon" /> Orders
              </div>
              <InvoiceGrid className="m1">
                <InvoiceCard className="border">
                  <h2>Order</h2>
                </InvoiceCard>
                <InvoiceCard className="border">
                  <h2>Date</h2>
                </InvoiceCard>
                <InvoiceCard className="border">
                  <h2>Status</h2>
                </InvoiceCard>
                <InvoiceCard className="border">
                  <h2>Total</h2>
                </InvoiceCard>
                <InvoiceCard className="border">
                  <h2>Actions</h2>
                </InvoiceCard>
              </InvoiceGrid>
              <>
                {orderList ? (
                  orderList.map((order) => {
                    return (
                      <InvoiceGrid>
                        <InvoiceCard className="border">
                          <p>#{order.order_no}</p>
                        </InvoiceCard>
                        <InvoiceCard className="border">
                          <p>{order.date}</p>
                        </InvoiceCard>
                        <InvoiceCard className="border">
                          <p>{order.status}</p>
                        </InvoiceCard>
                        <InvoiceCard className="border">
                          <p>{order.total}</p>
                        </InvoiceCard>
                        <InvoiceCard className="border">
                          <Link
                            className="btnInvoice"
                            to={`/order-detail/${order.id}`}
                          >
                            VIEW
                          </Link>
                        </InvoiceCard>
                      </InvoiceGrid>
                    );
                  })
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "TillanaSemiBold",
                      fontSize: "25px",
                      padding: "15px",
                      borderBottom: "1px solid #666 !important",
                    }}
                  ></div>
                )}
              </>
            </AddressDetail>
            <GoShop to="/product/">
              GO SHOP <BsArrowRight className="rightIcon" />
            </GoShop>
          </div>
          <div className={toggleBtn === 6 ? "block" : "none"}>
            <AddressDetail style={{ marginBottom: "2rem" }}>
              <div className="address_title">
                <TbFileInvoice className="mapIcon" /> Invoices
              </div>
              <InvoiceGrids className="m1">
                <InvoiceCard className="border">
                  <h2>Invoice</h2>
                </InvoiceCard>
                <InvoiceCard className="border">
                  <h2>Date</h2>
                </InvoiceCard>
                <InvoiceCard className="border">
                  <h2>Total Amount</h2>
                </InvoiceCard>
                <InvoiceCard className="border">
                  <h2>Actions</h2>
                </InvoiceCard>
              </InvoiceGrids>
              <>
                {invoiceList ? (
                  invoiceList.map((invoic) => {
                    return (
                      <InvoiceGrids>
                        <InvoiceCard className="border">
                          <p>#{invoic.invoice}</p>
                        </InvoiceCard>
                        <InvoiceCard className="border">
                          <p>{invoic.date}</p>
                        </InvoiceCard>
                        <InvoiceCard className="border">
                          <p>{invoic.total_amount}</p>
                        </InvoiceCard>
                        <InvoiceCard className="border">
                          <div className="btnInvoice">VIEW</div>
                        </InvoiceCard>
                      </InvoiceGrids>
                    );
                  })
                ) : (
                  <div
                    style={{
                      textAlign: "center",
                      fontFamily: "TillanaSemiBold",
                      fontSize: "25px",
                      padding: "15px",
                      borderBottom: "1px solid #666 !important",
                    }}
                  ></div>
                )}
              </>
              {/* <InvoiceGrids>
                <InvoiceCard className="border">
                  <p>#121</p>
                </InvoiceCard>
                <InvoiceCard className="border">
                  <p>2022-05-30</p>
                </InvoiceCard>
                <InvoiceCard className="border">
                  <p>1.00</p>
                </InvoiceCard>
                <InvoiceCard className="border">
                  <div className="btnInvoice">VIEW</div>
                </InvoiceCard>
              </InvoiceGrids> */}
            </AddressDetail>
            <GoShop to="/product/">
              GO SHOP <BsArrowRight className="rightIcon" />
            </GoShop>
          </div>
          <div className={toggleBtn === 3 ? "block" : "none"}>
            {/* <AddressDetail>
               <div className="address_title">
               <GoLocation className="mapIcon" /> Addresses
               </div>
                <p>
                  The following addresses will be used on the checkout page by
                  default.
                 </p>
                 <Address>
                   <div>
                     <h4>Billing Address</h4>
                     <div className="detail_border"></div>
                     <div className="grid">
                      <div>
                         <p>Name:</p>
                       <p>Address:</p>
                        <p>Address2:</p>
                         <p>City:</p>
                       <p>State:</p>
                         <p>Country:</p>
                       <p>Zipcode:</p>
                       </div>
                     <div>
                        <p>{detailData.customer_name}</p>
                        <p>{addressData.customer_address}</p>
                       <p>{addressData.address2}</p>
                        <p></p>
                       <p></p>
                       <p>India</p>
                       <p>{addressData.zip}</p>
                       </div>
                     </div>
                     <Link
                      to="#"
                       className="flex-center"
                     onClick={() => setEditAddress(true)}
                    >
                       EDIT YOUR BILLING ADDRESS{" "}
                       <BsArrowRight className="icon" />
                    </Link>
                  </div>
                 </Address>
              </AddressDetail> */}
            <AccountDetail>
              <div className="detailTitle">
                <GoLocation className="detailIcon" />
                Address
              </div>
              <AddressGrid>
                <AccoutCard>
                  <label>Address2 *</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={addressOne}
                    onChange={(e) => setAddressOne(e.target.value)}
                  />
                </AccoutCard>
                <AccoutCard>
                  <label>Address2 *</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={addressTwo}
                    onChange={(e) => setAddressTwo(e.target.value)}
                  />
                </AccoutCard>
              </AddressGrid>
              <AccountGrid>
                <AccoutCard>
                  <label>Country *</label>
                  <select
                    value={cntId}
                    onChange={(e) => {
                      setCntId(e.target.value);
                    }}
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
                </AccoutCard>
                <AccoutCard>
                  <label>State *</label>
                  <select
                    onClick={() => getStateData()}
                    value={stId}
                    onChange={(event) => setStid(event.target.value)}
                  >
                    <option>Select State</option>
                    {cntId.length === 0 && null}
                    {cntId.length > 1 && (
                      <>
                        {stateId.map((state) => {
                          return (
                            <option value={state.st_id}>{state.st_name}</option>
                          );
                        })}
                      </>
                    )}
                  </select>
                </AccoutCard>
                <AccoutCard>
                  <label>City *</label>
                  <select
                    onClick={() => getCityData()}
                    value={idCity}
                    onChange={(event) => setIdCity(event.target.value)}
                  >
                    <option>Select City</option>
                    {stId.length == 0 && null}
                    {stId.length > 1 && (
                      <>
                        {cityData.map((city) => {
                          return <option value={city.id}>{city.name}</option>;
                        })}
                      </>
                    )}
                  </select>
                </AccoutCard>
                <AccoutCard>
                  <label>Zip *</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={zipCode}
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </AccoutCard>
                <div className="save" onClick={updateAdrees}>
                  Update Address
                </div>
              </AccountGrid>
            </AccountDetail>
          </div>
          <div className={toggleBtn === 4 ? "block" : "none"}>
            <AccountDetail>
              <div className="detailTitle">
                <IoPersonOutline className="detailIcon" /> Account Details
              </div>
              <AccountGrid>
                <AccoutCard>
                  <label>Name *</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={accountName}
                    onChange={(event) => setAccountName(event.target.value)}
                    placeholder={detailData.customer_name}
                  />
                </AccoutCard>
                <AccoutCard>
                  <label>Email *</label>
                  <input
                    type="text"
                    name=""
                    id=""
                    value={accountEmail}
                    onChange={(event) => setAccountEmail(event.target.value)}
                    placeholder={detailData.customer_email}
                  />
                </AccoutCard>
                <div className="save" onClick={() => updateAccountDetails()}>
                  Save Changes
                </div>
              </AccountGrid>
            </AccountDetail>
            <AccountDetail>
              <div className="detailTitle mL">Password change</div>
              <AccountGrid>
                <AccoutCard>
                  <label>Current Password *</label>
                  <PasswordInput
                    type="text"
                    name=""
                    id=""
                    value={updatePassword.oldPassword}
                    onChange={(event) =>
                      setUpdatePassword({
                        ...updatePassword,
                        oldPassword: event.target.value,
                      })
                    }
                    // placeholder="Enter Full Name"
                  />
                </AccoutCard>
                <AccoutCard>
                  <label>New Password *</label>
                  <PasswordInput
                    type="text"
                    name=""
                    id=""
                    value={updatePassword.newPassword}
                    onChange={(event) =>
                      setUpdatePassword({
                        ...updatePassword,
                        newPassword: event.target.value,
                      })
                    }
                    // placeholder="Enter Valid Email"
                  />
                </AccoutCard>
                <div className="save" onClick={() => updatePasswordForm()}>
                  Save Changes
                </div>
              </AccountGrid>
            </AccountDetail>
          </div>
        </AccountCard>
      </Accoutgrid>
    </AccountContainer>
  );
};

export default MyAccount;

const AccountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem calc((100vw - 1250px) / 2);
  padding-bottom: 10rem;
  font-family: "TillanaBold" !important;

  @media only screen and (max-width: 991px) {
    padding-bottom: 15rem;
  }
`;

const Accoutgrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 2rem;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const AccountCard = styled.div`
  ul {
    list-style: none;
    width: 100%;
    li {
      padding: 13px 10px;
      padding-right: 85px;
      width: 100%;
      border-bottom: 1px solid #666;
      a {
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        font-family: "TillanaSemiBold" !important;
        font-size: 17px;
        color: #333;
      }
    }
  }
  p {
    color: #666;
    font-family: "TillanaMedium" !important;
    font-weight: 400;

    a {
      font-family: "TillanaMedium" !important;
    }

    @media only screen and (max-width: 991px) {
      margin: 0px 12px;
    }
  }
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin-top: 1rem;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    margin: 0px 11px;
  }
`;

const DashboardCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border: 1px solid #dddddd;
  padding: 25px;
  border-radius: 5px;
  cursor: pointer;

  .icon {
    font-size: 50px;
    color: #333;
  }
  a {
    color: #333;
    font-size: 22px;
    margin-top: 20px;
    font-family: "TillanaMedium" !important;
  }

  &:hover {
    color: #336699;
    box-shadow: 0px 0px 9px rgba(0, 0, 0, 0.2);
  }
  &:hover .icon {
    transform: scale(1.2);
    transition: all 0.5s ease-out;
    color: #336699;
  }
  &:hover a {
    color: #336699;
  }
`;

const AddressDetail = styled.div`
  .address_title {
    font-size: 25px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: #333;
    font-family: "TillanaSemiBold";
  }
  .mapIcon {
    font-size: 40px;
    color: #333;
  }
`;

const Address = styled.div`
  display: grid;
  grid-template-columns: 450px 450px;
  grid-gap: 1rem;
  padding: 25px;
  margin-bottom: 40px;

  .grid {
    display: grid;
    grid-template-columns: 100px 1fr;
    grid-gap: 1rem;
  }
  .flex-center {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-family: "TillanaSemiBold";
    margin-top: 10px;
    color: #336699;

    .icon {
      margin-left: 7px;
      color: #336699;
      font-weight: 600;
    }
  }
  .detail_border {
    background-color: #eee;
    height: 2px;
    width: 100%;
    margin: 15px 0px;
  }
  p {
    color: #666;
    margin-bottom: 8px;
    font-weight: 400;
    font-family: "TillanaSemiBold";
  }
  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    margin-bottom: 10px;
  }
`;

const AccountDetail = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  .detailTitle {
    font-size: 25px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    color: #333;
    font-family: "TillanaSemiBold";
  }
  .detailIcon {
    font-size: 40px;
    color: #333;
    margin-left: 15px;
    margin-right: 10px;
  }
  .save {
    text-align: center !important;
    cursor: pointer;
    color: #fff;
    background-color: #336699;
    padding: 5px 15px;
    text-transform: uppercase;
    font-weight: 500;
    width: 40%;
    border-radius: 5px;
    font-family: "TillanaSemiBold";

    @media only screen and (max-width: 991px) {
      width: 65%;
    }
  }
  .mL {
    margin-left: 1rem;
  }
`;

const AccountGrid = styled.div`
  display: grid;
  grid-template-columns: 450px 450px;
  grid-gap: 1rem;
  padding: 25px;
  margin-bottom: 40px;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: 900px;
  grid-gap: 1rem;
  padding: 25px;
  padding-bottom: 0px;
  margin-bottom: 0px;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const AccoutCard = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-family: "TillanaSemiBold";
  }

  input,
  select {
    width: 100%;
    border: none;
    outline: none;
    border: 1px solid #dddddd;
    padding: 10px 20px;
    font-family: "TillanaSemiBold";
    border-radius: 7px;
  }
  @media only screen and (max-width: 991px) {
    input {
      width: 365px;
      border: none;
      outline: none;
      border: 1px solid #dddddd;
      padding: 10px 20px;
      font-family: "TillanaSemiBold";
      border-radius: 7px;
    }
  }
  @media only screen and (max-width: 375px) {
    input {
      width: 330px;
      border: none;
      outline: none;
      border: 1px solid #dddddd;
      padding: 10px 20px;
      font-family: "TillanaSemiBold";
      border-radius: 7px;
    }
  }
`;

const InvoiceGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 180px);
  grid-gap: 1rem;
  border-bottom: 1px solid #666 !important;
  padding: 15px 0px;

  .m1 {
    margin-top: 1rem;
  }

  @media only screen and (max-width: 991px) {
    grid-template-columns: repeat(5, 70px);
  }
  @media only screen and (max-width: 375px) {
    grid-template-columns: repeat(5, 62px);
  }
`;

const InvoiceGrids = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 230px);
  grid-gap: 1rem;
  border-bottom: 1px solid #666 !important;
  padding: 15px 0px;

  .m1 {
    margin-top: 1rem;
  }

  @media only screen and (max-width: 991px) {
    grid-template-columns: repeat(4, 91px);
  }
  @media only screen and (max-width: 375px) {
    grid-template-columns: repeat(4, 83px);
  }
`;

const InvoiceCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  h2 {
    text-align: center;
    font-weight: 500;
    font-size: 19px;
  }
  p {
    text-align: center;
    color: #666;
  }
  .btnInvoice {
    margin: auto;
    padding: 5px 2px;
    width: 70%;
    border: 2px solid #eee;
    color: #333;
    text-align: center;
    font-family: "TillanaSemiBold";
    cursor: pointer;
  }

  @media only screen and (max-width: 991px) {
    h2 {
      text-align: center;
      font-weight: 500;
      font-size: 16px;
    }
    p {
      text-align: center;
      color: #666;
    }
    .btnInvoice {
      font-size: 14px;
      margin: auto;
      padding: 5px 2px;
      width: 100%;
      border: 2px solid #eee;
      color: #333;
      text-align: center;
      font-family: "TillanaSemiBold";
      cursor: pointer;
    }
  }
`;

const GoShop = styled(Link)`
  position: relative;
  padding: 10px 25px;
  padding-right: 35px;
  margin-left: 25px;
  background-color: #333;
  border-radius: 5px;
  color: #fff;
  .rightIcon {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 5px;
  }
`;
