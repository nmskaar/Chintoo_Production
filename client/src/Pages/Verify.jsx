import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginBg,
  LoginContainer,
  LoginCard,
  LoginForm,
  SignInBtn,
  RememberMe,
} from "../Styles/AccountStyles";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const navigate = useNavigate();
  const [emailOtp, setEmailOtp] = useState("");
  const [mobileOtp, setMobileOtp] = useState("");
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const registerKey = JSON.parse(localStorage.getItem("key"));
  const otpValue = {
    key: registerKey,
    mobile_otp: mobileOtp,
    email_otp: emailOtp,
  };
  const verifyUser = async () => {
    try {
      // if (mobileOtp.length > 6) {
      //   return toast.error("Otp must be only 6 characters");
      // }
      // if (emailOtp.length > 6) {
      //   return toast.error("Otp must be only 6 characters");
      // }
      const res = await axios.post(
        "/api1/verify_login_otp",
        otpValue,
        options
      );
      if (res.data.response.message == "invalid email and mobile otp") {
        return toast.error(res.data.response.message);
      }
      if (res.data.response.message == "invalid mobile otp") {
        return toast.error(res.data.response.message);
      }
      if (res.data.response.message == "invalid email otp") {
        return toast.error(res.data.response.message);
      }
      toast.success(res.data.response.message);
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("invalid email and mobile otp");
    }
  };

  const resendOtpValue = {
    key: registerKey,
  };
  const resendLoginOtp = async () => {
    try {
      const res = await axios.post(
        "/api1/resend_login_otp",
        resendOtpValue,
        options
      );
      if (res.data.response.message == "no data found") {
        return toast.error(res.data.response.message);
      }
      localStorage.setItem(
        "resendMobileOtp",
        JSON.stringify(res.data.response.mobile_otp)
      );
      localStorage.setItem(
        "resendMobileOtp",
        JSON.stringify(res.data.response.email_otp)
      );
      toast.success(res.data.response.message);
      localStorage.setItem("key", JSON.stringify(res.data.response.key));
      console.log(res);
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <LoginBg>
      <LoginContainer>
        <LoginCard>
          <LoginForm>
            <label>Mobile Otp</label>
            <input
              type="text"
              required
              value={mobileOtp}
              onChange={(e) => setMobileOtp(e.target.value)}
            />
            <label>Email Otp</label>
            <input
              type="text"
              required
              value={emailOtp}
              onChange={(e) => setEmailOtp(e.target.value)}
            />
            <RememberMe>
              <div>
                {/* <input type="checkbox" />
                <span>Remember me</span> */}
              </div>
              <div>
                <Link to="#" onClick={resendLoginOtp}>
                  Resend Otp
                </Link>
              </div>
            </RememberMe>
          </LoginForm>
          <SignInBtn onClick={verifyUser}>Verify Otp</SignInBtn>
        </LoginCard>
      </LoginContainer>
    </LoginBg>
  );
};

export default Verify;
