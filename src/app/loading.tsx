"use client";

import { FC } from "react";
import Spinner from "@/components/Spinner";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loading: FC = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default Loading;
