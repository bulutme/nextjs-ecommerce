"use client";

import React from "react";
import Button from "@/components/Button";
import styled from "styled-components";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ErrorText = styled.h1`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 20px;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  margin-bottom: 20px;
`;

export default function Error({ error, reset }: ErrorProps) {
  return (
    <ErrorContainer>
      <ErrorText>Oops! Something went wrong.</ErrorText>
      <ErrorMessage>{error.message}</ErrorMessage>
      <Button onClick={reset} size="large" color="primary" $variant="rounded">
        Try Again!
      </Button>
    </ErrorContainer>
  );
}
