import styled from "styled-components";
import { Link } from "react-router-dom";

export const ProcessHead = styled.div`
  padding: 5rem calc((100vw - 1250px) / 2);
  font-family: "TillanaBold" !important;

  h1 {
    text-align: center;
    font-size: 25px;
    margin-bottom: 25px;
    span {
      color: #336699;
    }
    i {
      font-size: 15px;
      margin: 0px 10px;
    }
    a {
      text-decoration: none;
      color: #333;
      font-family: "TillanaBold" !important;
    }
    span {
      font-family: "TillanaBold" !important;
    }
    @media only screen and (max-width: 991px) {
      font-size: 24px;
      padding: 10px;
      margin-bottom: 20px;
      i {
        font-size: 15px;
        margin: 0px 7px;
      }
    }
  }
  @media only screen and (max-width: 991px) {
    padding: 2rem calc((100vw - 1250px) / 2);
  }
`;

export const YearContainer = styled.div`
  padding: 8rem calc((100vw - 1000px) / 2);
  overflow-x: hidden;

  @media only screen and (max-width: 991px) {
    padding: 4rem calc((100vw - 1000px) / 2);
    padding-bottom: 15rem;
  }
`;

export const YearCards = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .activeCards {
    display: block;
  }
  .none {
    display: none;
  }
`;

export const YearContianer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 200px);
  grid-gap: 0.7rem;
  overflow-x: hidden;

  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

export const YearCard = styled(Link)`
  width: 100%;
  height: 100%;
  background-color: #f3f3f3;
  border: 2.4px solid #000;

  img {
    height: 60%;
    width: 100%;
    border-bottom: 2.4px solid #000;
  }

  h3 {
    text-align: center;
    color: #333;
    font-weight: 500;
    font-size: 22px;
    font-family: "TillanaSemiBold";
  }

  p {
    text-align: center;
    font-weight: 500;
    font-family: "TillanaSemiBold";
    color: #333;
  }

  @media only screen and (max-width: 991px) {
    margin-left: 20px;
    width: 90%;
  }
`;

export const PageInition = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ArrowLeft = styled.div`
  background-color: #afe3fc;
  padding: 4px 10px;
  margin-top: 1.2rem;
  margin-right: 1.5rem;
`;

export const ArrowRight = styled.div`
  background-color: #dffd70;
  padding: 4px 10px;
  margin-top: 1.2rem;
  margin-left: 1.5rem;
`;

export const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px 10px;
  background-color: #fff;
  border: 1px solid #000;
  margin-top: 1.1rem;

  div {
    font-family: "TillanaBold";
  }

  div:nth-child(1) {
    /* background-color: #95ce24;
    color: #fff; */
    padding: 4px 14px;
    border-radius: 50%;
    margin-right: 10px;
  }
  div:nth-child(2) {
    padding: 4px 14px;
    border-radius: 50%;
    margin-right: 10px;
  }
  div:nth-child(3) {
    padding: 4px 14px;
    border-radius: 50%;
    margin-right: 10px;
  }
  .activeTab {
    background-color: #95ce24;
    color: #fff;
    padding: 4px 14px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const OrderDiv = styled.div`
  padding-bottom: 5rem;
`;

export const ThanksCard = styled.div`
  border: 3px solid #eee;
  padding: 30px 0px;
  text-align: center;
  color: #333;
  font-size: 16px;

  i {
    margin-right: 10px;
    font-weight: 600;
  }
  h2 {
    font-family: "TillanaSemiBold";
    margin-bottom: 2rem;
  }
  a {
    font-family: "TillanaSemiBold";
    color: #fff;
    font-size: 20px;
    padding: 10px 20px;
    background-color: #336699;
    border-radius: 5px;
    text-decoration: none;
    text-transform: capitalize;
    font-weight: 500;
  }
  @media only screen and (max-width: 991px) {
    padding: 25px 0px;
    margin: 0px 10px;
    font-size: 15px;
    i {
      margin-right: 5px;
    }
  }
`;

export const OrderStatus = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  padding: 25px 0px;
  text-align: center;
  border: 1px solid #eeee;
  margin-bottom: 20px;

  p {
    font-weight: 500;
    color: #666;
    font-size: 21px;
    font-family: "TillanaSemiBold";
  }
  h3 {
    color: #333;
    font-weight: 500;
    font-size: 20px;
    font-family: "TillanaSemiBold";
  }
  @media only screen and (max-width: 991px) {
    display: grid;
    grid-template-columns: 1fr;
    text-align: left;
    padding: 10px 20px;
    p {
      font-weight: 500;
      color: #666;
      font-size: 18px;
    }
    h3 {
      color: #333;
      font-weight: 500;
      font-size: 16px;
    }
  }
`;

export const DetailsHead = styled.h3`
  color: #333;
  font-size: 20px;
  font-weight: 500;
  margin-top: 30px;
  margin-bottom: 10px;
  font-family: "TillanaSemiBold";

  @media only screen and (max-width: 991px) {
    padding: 0px 10px;
  }
`;

export const DetailProduct = styled.div`
  border: 1px solid #eeee;
  padding: 25px;

  h3 {
    color: #333;
    font-size: 20px;
    font-weight: 500;
    font-family: "TillanaSemiBold";
  }
  .detail_border {
    background-color: #eee;
    height: 2px;
    width: 100%;
    margin: 10px 0px;
  }
  .flex_detail {
    display: flex;
    align-items: center;
    justify-content: space-between;

    p {
      margin-bottom: 25px;
      color: #333;
      font-weight: 400;
      font-family: "TillanaSemiBold";
    }
    h4 {
      color: #333;
      font-family: "TillanaSemiBold";
      a {
        text-decoration: none;
        color: #336699;
        font-weight: 400;
        font-family: "TillanaSemiBold";
      }
      i {
        margin: 0px 10px;
        font-size: 14px;
      }
    }
    span {
      font-weight: 500;
      font-size: 17px;
      color: #666;
    }
    h3 {
      font-size: 17px !important;
      font-weight: 600 !important;
      font-family: "TillanaSemiBold";
    }
    h5 {
      font-size: 18px;
      color: #666;
      font-weight: 600;
      font-family: "Poppins", sans-serif;
    }
    h2 {
      font-size: 22px;
      color: #333;
      font-weight: 700;
    }
  }
  @media only screen and (max-width: 991px) {
    margin: 0px 10px;
    padding: 15px;
    .flex_detail {
      span {
        font-weight: 500;
        font-size: 17px;
        color: #666;
      }
      h3 {
        font-size: 18px !important;
        font-weight: 500 !important;
        margin-right: 20px;
      }
      h5 {
        font-size: 18px;
        color: #666;
        font-weight: 500;
        text-align: right;
      }
      h2 {
        font-size: 23px;
        color: #333;
        font-weight: 700;
      }
    }
  }
`;

export const SubOrder = styled.div`
  h3 {
    color: #333;
    font-size: 20px;
    font-weight: 500;
    margin-top: 30px;
    margin-bottom: 10px;
    font-family: "TillanaSemiBold";
  }
  .note {
    border: 1px solid #eee;
    margin-top: 15px;
    padding: 20px;

    p {
      color: #666;
      font-weight: 500;
      font-size: 15px;
      font-family: "TillanaSemiBold";

      span {
        color: #333;
        font-weight: 600;
        font-size: 18px !important;
        font-family: "TillanaSemiBold";
      }
    }
  }
  @media only screen and (max-width: 991px) {
    h3 {
      color: #333;
      font-size: 19px;
      font-weight: 500;
      margin-top: 20px;
      margin-bottom: 7px;
      padding: 0px 10px;
    }
  }
`;

export const Address = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  padding: 25px;
  margin-bottom: 20px;

  .detail_border {
    background-color: #eee;
    height: 2px;
    width: 100%;
    margin: 15px 0px;
  }
  h4 {
    font-size: 19px !important;
    font-weight: 500 !important;
    font-family: "TillanaSemiBold";
  }
  p {
    color: #666;
    margin-bottom: 8px;
    font-weight: 400;
    font-family: "TillanaMedium" !important;
  }
  @media only screen and (max-width: 991px) {
    grid-template-columns: 1fr;
    margin-bottom: 10px;
  }
`;

export const Back = styled(Link)`
  padding: 10px 20px;
  background-color: #336699;
  border-radius: 5px;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 500;

  i {
    margin-right: 8px;
  }
  a {
    color: #fff;
    font-family: "TillanaSemiBold";
  }
  &:hover {
    background-color: #4d4b4b;
    transition: all 0.3s ease-out;
  }
  @media only screen and (max-width: 991px) {
    margin-left: 10px;
    padding: 8px 20px;
  }
`;

// OrderDiv, ThanksCard, OrderStatus, DetailsHead, DetailProduct, SubOrder, Address, Back, Address,
