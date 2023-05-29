import styled from "styled-components";
import BgBlack from "../Assets/strips/bg1.png";
import { Link } from "react-router-dom";

export const LoginBg = styled.div`
  background-image: url(${BgBlack});
  background-position: center;
  background-repeat: repeat;
  height: 100%;
  width: 100%;
  position: relative;
`;

export const Banner = styled.div`
  background-color: #eee;
  height: 30vh;
  width: 100%;
  position: relative;

  h2 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #333;
    font-size: 35px;
    font-weight: 500;
    font-family: "TillanaSemiBold";
  }

  @media only screen and (max-width: 991px) {
    height: 20vh;
    h2 {
      font-size: 22px;
    }
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 185vh;
  position: relative;

  @media only screen and (max-width: 414px) {
    height: 145vh;
  }
  @media only screen and (max-width: 375px) {
    height: 170vh;
  }
`;

export const VerifyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  position: relative;

  @media only screen and (max-width: 414px) {
    height: 80vh;
  }
  @media only screen and (max-width: 375px) {
    height: 80vh;
  }
`;

export const VerifyCard = styled.div`
  position: absolute;
  top: 10%;
  padding: 40px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  font-family: "Roboto", sans-serif;
  background-color: #fff;

  .content {
    display: none;
  }
  .activeContent {
    display: block;
  }
  @media only screen and (max-width: 991px) {
    padding: 20px;
  }
`;

export const LoginCard = styled.div`
  position: absolute;
  top: 5%;
  padding: 40px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.2);
  font-family: "Roboto", sans-serif;
  background-color: #fff;

  .content {
    display: none;
  }
  .activeContent {
    display: block;
  }
  @media only screen and (max-width: 991px) {
    padding: 20px;
  }
`;

export const SigninToggel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;

  a {
    font-size: 17px;
    font-weight: 500;
    padding: 10px 90px;
    font-family: "TillanaSemiBold";
  }
  .borderBottom {
    color: #333;
    border-bottom: 2px solid lightgray;
  }
  .activeBorder {
    color: #336699;
    border-bottom: 2px solid #336699;
  }
  @media only screen and (max-width: 991px) {
    a {
      font-size: 15px;
      font-weight: 500;
      padding: 10px 50px;
    }
  }
`;

export const LoginForm = styled.div`
  display: flex;
  flex-direction: column;

  input {
    padding: 8px 15px;
    margin-bottom: 10px;
    width: 500px;
    outline: none;
    border: none;
    border: 1px solid lightgray;
    font-family: "TillanaSemiBold";
  }
  label {
    color: #444444;
    font-weight: 400;
    margin-bottom: 5px;
    font-family: "TillanaSemiBold";
  }
  @media only screen and (max-width: 991px) {
    /* align-items: center; */
    input {
      width: 100%;
    }
  }
`;

export const RememberMe = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 1rem;

  div {
    span {
      margin-left: 5px;
      font-family: "TillanaSemiBold";
      color: #333;
    }
    a {
      text-decoration: none;
      color: red;
      font-size: 14px;
      font-weight: 400;
      font-family: "TillanaSemiBold";
    }
  }
`;

export const SignInBtn = styled.button`
  cursor: pointer;
  width: 100%;
  background-color: #336699;
  text-align: center;
  color: #fff;
  padding: 9px 0px;
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
  margin-top: 18px;
  font-family: "TillanaSemiBold";
  outline: none;
  border: none;
`;

export const SignWithSocial = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  padding-top: 15px;
  color: #333;
  font-weight: 400;
  font-family: "TillanaSemiBold";
`;

export const CustomerVendor = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    margin-left: 10px;
    font-family: "TillanaSemiBold";
  }
`;

export const Terms = styled.div`
  p {
    margin-bottom: 18px;
    margin-top: 15px;
    color: #333;
    font-family: "TillanaSemiBold";
    a {
      text-decoration: none;
      font-family: "TillanaSemiBold";
    }
  }
  a {
    font-size: 15px;
    font-weight: 400;
    font-family: "TillanaSemiBold";
  }
`;

export const AgreePolicy = styled.div`
  margin-top: 18px;
  display: flex;

  span {
    align-items: center;
    margin-left: 5px;
    font-family: "TillanaSemiBold";
    color: #333;
  }
`;

export const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    margin: 10px 7px;
    border-radius: 50%;
    cursor: pointer;
    &:nth-child(1) {
      color: #1b4f9b;
      border: 2px solid #1b4f9b;
      padding: 10px 13px;
      &:hover {
        background-color: #1b4f9b;
        color: #fff;
      }
    }
    &:nth-child(2) {
      color: #00adef;
      border: 2px solid #00adef;
      padding: 10px 10px;
      &:hover {
        background-color: #00adef;
        color: #fff;
      }
    }
    &:nth-child(3) {
      color: #dd4b39;
      border: 2px solid #dd4b39;
      padding: 10px 10px;
      &:hover {
        background-color: #dd4b39;
        color: #fff;
      }
    }
  }
`;

export const PasswordCard = styled.div`
  border: 1px solid #336699;
  padding: 5px;
  margin-bottom: 20px;
  ul {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
    list-style: none;
    li {
      span {
        color: #333;
        font-size: 15px;
        font-weight: 500;

        .--passIcon {
          margin-bottom: -3px;
        }
      }
    }
  }
`;
