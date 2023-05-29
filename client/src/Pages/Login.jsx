import React, { useState, useEffect, useReducer } from "react";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import PasswordInput from "../Components/PasswordInput";
import {
  LoginBg,
  Banner,
  LoginContainer,
  LoginCard,
  SigninToggel,
  LoginForm,
  RememberMe,
  SignInBtn,
  SignWithSocial,
  CustomerVendor,
  Terms,
  AgreePolicy,
  SocialLinks,
} from "../Styles/AccountStyles";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAPI } from "../Context/apiContext";

const registerState = {
  name: "",
  mobile: "",
  email: "",
  password: "",
  cpassword: "",
};

const Login = ({ cartItems, accout, setAccount }) => {
  const [user, setUser] = useState({
    username: "",
  });
  const characters = "abc123";
  function generateString(length) {
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  const captcha = generateString(6); // Function called here and save in captcha variable
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    user[name] = value;
    setUser(user);
  };
  const onSubmit = (e) => {
    var element = document.getElementById("succesBTN");
    var inputData = document.getElementById("inputType");
    element.style.cursor = "wait";
    element.innerHTML = "Checking...";
    inputData.disabled = true;
    element.disabled = true;
    var myFunctions = function () {
      if (captcha == user.username) {
        element.style.backgroundColor = "green";
        element.innerHTML = "Captcha Verified";
        element.disabled = true;
        element.style.cursor = "not-allowed";
        inputData.style.display = "none";
      } else {
        element.style.backgroundColor = "red";
        element.style.cursor = "not-allowed";
        element.innerHTML = "Not Matched";
        element.disabled = true;
        //  element.disabled = true;
        var myFunction = function () {
          element.style.backgroundColor = "#007bff";
          element.style.cursor = "pointer";
          element.innerHTML = "Verify Captcha";
          element.disabled = false;
          inputData.disabled = false;
          inputData.value = "sssss";
        };
        setTimeout(myFunction, 5000);
      }
    };
    setTimeout(myFunctions, 5000);
  };

  const [toggleBtn, setToggleBtn] = useState(1);

  const toggleTab = (index) => {
    setToggleBtn(index);
  };

  const navigate = useNavigate();

  const [reducerValue, forceUpdate] = useReducer((x) => x + 1, 0);

  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const [productId, setProductId] = useState("");
  const [variantId, setVariantId] = useState("");
  const [quntity, setQuantity] = useState("");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const localCartData = () => {
    return cartItems.length == 0
      ? null
      : cartItems.map((item) => {
          setProductId(item.product_id);
          setVariantId(item.product_variant_id);
          setQuantity(item.qty);
          return <div></div>;
        });
  };
  useEffect(() => {
    localCartData();
  }, []);
  const loginValue = {
    username: loginData.username,
    password: loginData.password,
    // product_id: [productId],
    // product_variant_id: [variantId],
    // quantity: [quntity],
  };
  localStorage.setItem("username", JSON.stringify(loginData.username));
  const loginUser = async () => {
    try {
      const res = await axios.post("/api1/login", loginValue, options);
      console.log(res);
      if (res.data.response.message == "required_field") {
        return toast.error(res.data.response.message);
      }
      if (res.data.response.message == "invalid password") {
        return toast.error(res.data.response.message);
      }
      if (
        res.data.response.message ==
        "Please Verify Email ID and Mobile Number...!!"
      ) {
        toast.success(res.data.response.message);
      }
      if (res.data.response.message == "login successful") {
        toast.success(res.data.response.message);
        navigate("/");
      }
      localStorage.setItem("userId", JSON.stringify(res.data.response.user_id));
      console.log(res);
      setAccount(true);
      forceUpdate();
    } catch (error) {
      toast.error(error);
    }
  };

  const [verfied, setVerifed] = useState(false);

  const { settingsData } = useAPI();

  function onChange(value) {
    console.log("Captcha value:", value);
    setVerifed(true);
  }

  return (
    <LoginBg>
      {/* {cartItems.length == 0
        ? null
        : cartItems.map((item) => {
            setProductId(item.product_id);
            setVariantId(item.product_variant_id);
            setQuantity(item.qty);
            return <></>;
          })} */}
      <></>
      <LoginContainer>
        <LoginCard>
          <SigninToggel>
            <Link
              to="/login"
              className={toggleBtn === 1 ? "activeBorder" : "borderBottom"}
              onClick={() => {
                toggleTab(1);
              }}
            >
              SIGN IN
            </Link>
            <Link
              to="/register"
              className={toggleBtn === 2 ? "activeBorder" : "borderBottom"}
              onClick={() => {
                toggleTab(2);
              }}
            >
              SIGN UP
            </Link>
          </SigninToggel>
          <div>
            <LoginForm>
              <label>Username*</label>
              <input
                type="text"
                name="username"
                value={loginData.username}
                onChange={(event) =>
                  setLoginData({ ...loginData, username: event.target.value })
                }
              />
              <label>Password*</label>
              <PasswordInput
                name="password"
                value={loginData.password}
                onChange={(event) =>
                  setLoginData({ ...loginData, password: event.target.value })
                }
              />
            </LoginForm>
            <RememberMe>
              <div>
                <input type="checkbox" />
                <span>Remember me</span>
              </div>
              <div>
                <Link to="/forgot-password">Forgot Password</Link>
              </div>
            </RememberMe>
            {settingsData.map((item) => {
              return (
                <>
                  <ReCAPTCHA sitekey={item.site_key} onChange={onChange} />
                </>
              );
            })}
            <SignInBtn onClick={loginUser} disabled={!verfied}>
              Sign In
            </SignInBtn>
            <SignWithSocial>Sign in with social account</SignWithSocial>{" "}
            <SocialLinks>
              <i class="fa-brands fa-facebook-f"></i>
              <i class="fa-brands fa-twitter"></i>
              <i class="fa-brands fa-google"></i>
            </SocialLinks>
          </div>
        </LoginCard>
      </LoginContainer>
    </LoginBg>
  );
};

export default Login;
