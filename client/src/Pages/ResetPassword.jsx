import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoginBg,
  LoginContainer,
  LoginCard,
  LoginForm,
  SignInBtn,
  PasswordCard,
} from "../Styles/AccountStyles";
import axios from "axios";
import { toast } from "react-toastify";
import PasswordInput from "../Components/PasswordInput";
import { FaTimes } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";

const ResetPassword = () => {
  const navigate = useNavigate();
  const userValue = JSON.parse(localStorage.getItem("username"));
  const [username, setUsername] = useState(userValue);
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

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
  const resetKey = JSON.parse(localStorage.getItem("verifyOtpKey"));
  const resetPasswordValue = {
    key: resetKey,
    username: username,
    password: cpassword,
  };
  const resetPassowrd = async () => {
    try {
      if (!username || !password || !cpassword) {
        return toast.error("All fields are required");
      }
      if (username.length > 10) {
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
        "/api1/reset_password",
        resetPasswordValue,
        options
      );
      if (res.data.response.message == "no data found") {
        return toast.error("No User Found");
      }
      if (res.data.response.message == "required_field") {
        return toast.error("All fields are required");
      }
      toast.success(res.data.response.message);
      if (res.data.response.message == "Password Updated Successfully") {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div>
      <LoginBg>
        <LoginContainer>
          <LoginCard>
            <LoginForm>
              <label>Enter Your Mobile No</label>
              <input
                type="mobile"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Reset Your Password</label>
              <PasswordInput
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Confirm Your Password</label>
              <PasswordInput
                type="password"
                required
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
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
            <SignInBtn onClick={resetPassowrd}>Reset Password</SignInBtn>
          </LoginCard>
        </LoginContainer>
      </LoginBg>
    </div>
  );
};

export default ResetPassword;
