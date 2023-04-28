import styled from "styled-components";

export const ModalContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalCard = styled.div`
  position: fixed;
  top: 75%;
  left: 20%;
  transform: translate(-80%, -35%);
  z-index: 10000;
  background-color: #fff;
  padding: 10px;
  margin-left: 30px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.3);
  animation: modalAnimation 0.5s;
  animation-timing-function: ease-out;
  animation-direction: alternate;
  overflow: hidden;

  @keyframes modalAnimation {
    from {
      left: 0%;
    }
    to {
      left: 20%;
    }
  }

  .cancel_popup {
    position: fixed;
    top: 0%;
    left: -4%;
    z-index: 100000000;
    font-size: 20px;
    color: #333;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    border-radius: 50%;
    padding: 6px 10px;
    cursor: pointer;
    display: none;
  }

  @media only screen and (max-width: 991px) {
    position: fixed;
    top: 80%;
    left: 39%;
    transform: translate(-55%, -25%);
    width: 80%;
  }
`;

export const ModalLayout = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div > img {
    width: 100px;
    height: 100px;
    margin-right: 15px;
  }
  div > h3 {
    font-family: "TillanaSemiBold";
    font-size: 17px;
    color: #333;
  }
  div > p {
    font-weight: 400;
    font-size: 14px;
  }
  .view_btn,
  .checkout_btn {
    text-transform: uppercase;
    padding: 7px 15px;
    border-radius: 7px;
    font-weight: 500;
    cursor: pointer;
  }
  .view_btn {
    background-color: #eee;
    margin-left: 10px;
    a {
      color: #333;
    }
  }
  .checkout_btn {
    background-color: #333;
    margin-right: 10px;
    a {
      color: #fff;
    }
  }
  @media only screen and (max-width: 991px) {
    justify-content: space-around;
  }
`;
