import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  font-size: 1.5rem;
  margin-top: 2rem;
`;

const EmptyProductList = () => {
  return <Container>No products found.</Container>;
};

export default EmptyProductList;
