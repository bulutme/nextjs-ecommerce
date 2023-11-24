import { FC } from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerStyled = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 64px;
  height: 64px;
  animation: ${rotate} 1s linear infinite;
`;

const Spinner: FC = () => {
  return <SpinnerStyled />;
};

export default Spinner;
