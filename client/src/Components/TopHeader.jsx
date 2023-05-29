import React, { useState, useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const TopHeader = ({
  showSidebar,
  setShowSidebar,
  accout,
  setAccount,
  forceUpdate,
  reducerValue,
}) => {
  const [loginUser, setLoginUser] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userId"));
    if (user) {
      setLoginUser(user);
      setAccount(true);
      forceUpdate();
    } else {
    }
  }, [reducerValue]);
  return (
    <>
      <TopNav>
        <div>
          <TermsLink to="/privacy">PRIVACY POLICY</TermsLink>
          <LeftBorder>|</LeftBorder>
          <TermsLink to="/cookie">terms of use</TermsLink>
          <LeftBorder>|</LeftBorder>
          <TermsLink to="/cookie">cookies</TermsLink>
        </div>
        <div>
          <select>
            <option>INR</option>
          </select>
          <select>
            <option>ENG</option>
            <option>MAR</option>
            <option>HINDI</option>
          </select>
          <LeftBorder>|</LeftBorder>
          <TopLink to="#" onClick={() => setShowSidebar(true)}>
            Cart <i class="fa-solid fa-cart-shopping"></i>
          </TopLink>
          {accout == true ? (
            <Link to="/my-account">My Account</Link>
          ) : (
            <>
              <Link to="/login">Sign In</Link>
              <LeftBorder>/</LeftBorder>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
        {showSidebar === true ? (
          <SidebarOverlay
            onClick={() => setShowSidebar(false)}
          ></SidebarOverlay>
        ) : null}
      </TopNav>
    </>
  );
};

export default TopHeader;

const TopNav = styled.div`
  width: 100%;
  z-index: 1000000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 10px;
  box-shadow: 0 0 4px 1px rgb(38 38 38 / 18%);
  background-color: #fff;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
  }
  a {
    margin: 0px 10px;
    font-weight: 500;
    font-size: 13px;
    font-family: "Anton", sans-serif;
    font-family: "ForBold";
    color: #333;
    /* letter-spacing: 1px; */
  }
  select {
    margin: 0px 4px;
    font-weight: 500;
    font-size: 13px;
    /* font-family: "TillanaSemiBold"; */
    text-transform: uppercase;
    font-family: "Anton", sans-serif;
    font-family: "ForBold";
    /* letter-spacing: 1px; */
    color: #333;
    outline: none;
    border: none;
  }

  @media only screen and (max-width: 991px) {
    flex-direction: column;
  }
`;

const LeftBorder = styled.div`
  padding-top: 3px;
  font-size: 10px;
  font-weight: 400;
`;

const TopLink = styled(Link)`
  margin: 0px 15px;
  font-weight: 500;
  font-size: 15px;
  color: #2b2b2b;
`;

const TermsLink = styled(Link)`
  margin: 0px 10px;
  font-weight: 500;
  font-size: 13px;
  text-transform: uppercase;
  /* font-family: "TillanaSemiBold"; */
  font-family: "Anton", sans-serif;
    font-family: "ForBold";
  color: #333;
  /* letter-spacing: 1px; */
`;

const SidebarOverlay = styled.div`
  position: fixed;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  display: none;
  background-color: #000;
  opacity: 0.5;
  z-index: 10000000;
  overflow-y: hidden;
`;
