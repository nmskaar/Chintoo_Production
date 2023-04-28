import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({ placeholder, value, onChange, name, onPaste }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <PassContainer>
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required
        name={name}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
      />
      <div className="icon" onClick={togglePassword}>
        {showPassword ? (
          <AiOutlineEyeInvisible size={20} />
        ) : (
          <AiOutlineEye size={20} />
        )}
      </div>
    </PassContainer>
  );
};

export default PasswordInput;

const PassContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;

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
  .icon {
    position: absolute;
    top: 0.5rem;
    right: 1rem;
    cursor: pointer;
  }
  @media only screen and (max-width: 991px) {
    /* align-items: center; */
    input {
      width: 100%;
    }
  }
`;
