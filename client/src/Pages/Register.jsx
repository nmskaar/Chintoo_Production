import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "../Components/PasswordInput";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
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
  PasswordCard,
} from "../Styles/AccountStyles";
import axios from "axios";
import { toast } from "react-toastify";

const registerState = {
  name: "",
  mobile: "",
  email: "",
  password: "",
  cpassword: "",
};

const Register = () => {
  const [toggleBtn, setToggleBtn] = useState(1);

  const toggleTab = (index) => {
    setToggleBtn(index);
  };
  const navigate = useNavigate();

  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);

  const timesIcon = <FaTimes color="red" size={15} className="--passIcon" />;
  const checkIcon = (
    <BsCheck2All color="green" size={15} className="--passIcon" />
  );

  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return timesIcon;
  };

  // Registration //
  const [registerData, setRegisterData] = useState(registerState);
  const { name, mobile, email, password, cpassword } = registerData;
  localStorage.setItem("username", JSON.stringify(mobile));
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  useEffect(() => {
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    if (password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    if (password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }
  }, [password]);

  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const userRegisterData = {
    name,
    mobile,
    email,
    password,
    cpassword,
  };
  const registerUser = async (e) => {
    try {
      if (!name || !email || !password) {
        return toast.error("All fields are required");
      }
      if (mobile.length > 10) {
        return toast.error("Enter a valid mobile no");
      }
      if (password.length < 6) {
        return toast.error("Password must be up to 6 characters");
      }
      if (password !== cpassword) {
        return toast.error("Passwords do not match");
      }
      if (!uCase || !num) {
        return toast.error("Weak Password");
      }
      const res = await axios.post(
        "https://applexinfotech.com/chintoo2/admin/api1/user_registration",
        userRegisterData,
        options
      );
      if (res.data.response.message == "This user allredy exist") {
        return toast.error(res.data.response.message);
      }
      // "This user allredy exist..Please Verify Email ID and Mobile Number to proceed..!!"
      toast.success(res.data.response.message);
      localStorage.setItem("key", JSON.stringify(res.data.response.key));
      localStorage.setItem(
        "emailOtp",
        JSON.stringify(res.data.response.email_otp)
      );
      localStorage.setItem(
        "mobileOtp",
        JSON.stringify(res.data.response.mobile_otp)
      );
      console.log(res);
      navigate("/verify");
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <LoginBg>
      <LoginContainer>
        <LoginCard>
          <SigninToggel>
            <Link
              to="/login"
              className={toggleBtn === 2 ? "activeBorder" : "borderBottom"}
              onClick={() => {
                toggleTab(1);
              }}
            >
              SIGN IN
            </Link>
            <Link
              to="/register"
              className={toggleBtn === 1 ? "activeBorder" : "borderBottom"}
              onClick={() => {
                toggleTab(2);
              }}
            >
              SIGN UP
            </Link>
          </SigninToggel>
          <div>
            <LoginForm>
              <label>Name</label>
              <input
                type="text"
                required
                name="name"
                value={name}
                onChange={handleRegisterChange}
              />
              <label>Email address*</label>
              <input
                type="email"
                required
                name="email"
                value={email}
                onChange={handleRegisterChange}
              />
              <label>Mobile No*</label>
              <input
                type="number"
                required
                name="mobile"
                value={mobile}
                onChange={handleRegisterChange}
              />
              <label>Password*</label>
              <PasswordInput
                placeholder=""
                name="password"
                value={password}
                onChange={handleRegisterChange}
              />
              <label>Confirm Password*</label>
              <PasswordInput
                placeholder=""
                name="cpassword"
                value={cpassword}
                onChange={handleRegisterChange}
              />
              <PasswordCard>
                <ul className="form-list">
                  <li>
                    <span>
                      {switchIcon(uCase)}
                      &nbsp; Lowercase & Uppercase
                    </span>
                  </li>
                  <li>
                    <span>
                      {switchIcon(num)}
                      &nbsp; Number (0-9)
                    </span>
                  </li>
                  <li>
                    <span>
                      {switchIcon(sChar)}
                      &nbsp; Special Character (!@#$%^&*)
                    </span>
                  </li>
                  <li>
                    <span>
                      {switchIcon(passLength)}
                      &nbsp; At least 6 Character
                    </span>
                  </li>
                </ul>
              </PasswordCard>
            </LoginForm>
            <Terms>
              <p>
                Your personal data will be used to support your experience{" "}
                <br />
                throughout this website, to manage access to your account,
                <br /> and for other purposes described in our{" "}
                <a href="#">privacy policy</a>.
              </p>
            </Terms>
            <AgreePolicy>
              <input type="checkbox" name="" id="" checked />
              <span>I agree to the privacy policy</span>
            </AgreePolicy>
            <SignInBtn onClick={registerUser}>Sign Up</SignInBtn>
          </div>
        </LoginCard>
      </LoginContainer>
    </LoginBg>
  );
};

export default Register;
