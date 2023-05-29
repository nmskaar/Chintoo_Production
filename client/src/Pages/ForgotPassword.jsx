import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginBg,
  VerifyContainer,
  VerifyCard,
  LoginForm,
  SignInBtn,
} from "../Styles/AccountStyles";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const userValue = JSON.parse(localStorage.getItem("username"));
  const [mobile, setMobile] = useState(userValue); 
  localStorage.setItem("username", JSON.stringify(mobile));
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const forgotValue = {
    mobile: mobile,
  };

  const forgotPassword = async () => {
    try {
      if (!mobile) {
        return toast.error("All fields are required");
      }
      if (mobile.length > 10) {
        return toast.error("Enter a valid mobile no");
      }
      const res = await axios.post(
        "https://applexinfotech.com/chintoo2/admin/api1/forgot_password",
        forgotValue,
        options
      );
      if (res.data.response.messag == "no data found") {
        toast.error("Invalid Mobile No");
      }
      toast.success(res.data.response.message);
      localStorage.setItem("forgotOtp", JSON.stringify(res.data.response.otp));
      localStorage.setItem("forgotKey", JSON.stringify(res.data.response.key));
      navigate("/verify-otp");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <LoginBg>
      <VerifyContainer>
        <VerifyCard>
          <LoginForm>
            <label>Enter Your Mobile No</label>
            <input
              type="mobile"
              required
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </LoginForm>
          <SignInBtn onClick={forgotPassword}>Send Otp</SignInBtn>
        </VerifyCard>
      </VerifyContainer>
    </LoginBg>
  );
};

export default ForgotPassword;
