import React, { InputHTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const StyledInput = styled.input`
  flex: 1;
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  outline: none;
  height: 100%;

  &:focus {
    border-color: #3bb77e;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

const Input = (props: Props) => {
  return <StyledInput {...props} />;
};

export default Input;
