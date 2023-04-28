import React from "react";
import styled from "styled-components";

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <ArrowRight className="button-55" onClick={onClick}>
      <i class="fa-solid fa-arrow-right"></i>
    </ArrowRight>
  );
};

export default NextArrow;

const ArrowRight = styled.div`
  background-color: #dffd70;
  padding: 4px 10px;
  margin-top: 1.2rem;
  margin-left: 1.5rem;
`;
