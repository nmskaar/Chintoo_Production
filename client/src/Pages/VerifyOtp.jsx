import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LoginBg,
  VerifyContainer,
  VerifyCard,
  LoginCard,
  LoginForm,
  SignInBtn,
  RememberMe,
} from "../Styles/AccountStyles";
import axios from "axios";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const options = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const forgotKey = JSON.parse(localStorage.getItem("forgotKey"));
  const forgotValue = {
    key: forgotKey,
    otp: otp,
  };
  const verifyOtp = async () => {
    try {
      if (!otp) {
        return toast.error("All fields are required");
      }
      if (otp.length < 6) {
        return toast.error("Otp must be up to 6 characters");
      }
      const res = await axios.post(
        "https://applexinfotech.com/chintoo2/admin/api1/verify_otp",
        forgotValue,
        options
      );
      if (res.data.response.message == "no data found") {
        return toast.error("Invalid Otp");
      }
      if (res.data.response.message == "required_field") {
        return toast.error(res.data.response.message);
      }
      toast.success(res.data.response.message);
      localStorage.setItem(
        "verifyOtpKey",
        JSON.stringify(res.data.response.key)
      );
      if (res.data.response.message == "OTP Verified Successfully") {
        navigate("/reset-password");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const resendOtpValue = {
    key: forgotKey,
  };
  const resendOtp = async () => {
    try {
      const res = await axios.post(
        "https://applexinfotech.com/chintoo2/admin/api1/resend_otp",
        resendOtpValue,
        options
      );
      if (res.data.response.message == "no data found") {
        return toast.error(res.data.response.message);
      }
      toast.success(res.data.response.message);
      localStorage.setItem(
        "resendForgotOtp",
        JSON.stringify(res.data.response.otp)
      );
      localStorage.setItem("forgotKey", JSON.stringify(res.data.response.key));
      console.log(res);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div>
      <LoginBg>
        <VerifyContainer>
          <VerifyCard>
            <LoginForm>
              <label>Verify Otp</label>
              <input
                type="text"
                required
                name="mobileOtp"
                placeholder="Enter Otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <RememberMe>
                <div>
                  {/* <input type="checkbox" />
                <span>Remember me</span> */}
                </div>
                <div>
                  <Link to="#" onClick={resendOtp}>
                    Resend Otp
                  </Link>
                </div>
              </RememberMe>
            </LoginForm>
            <SignInBtn onClick={verifyOtp}>Verify Otp</SignInBtn>
          </VerifyCard>
        </VerifyContainer>
      </LoginBg>
    </div>
  );
};

export default VerifyOtp;
