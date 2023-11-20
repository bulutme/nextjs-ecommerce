import styled from "styled-components";
import React from "react";

interface SpinnerProps {
  style?: React.CSSProperties;
}

const SpinnerStyled = styled.div<SpinnerProps>`
  position: relative;
  width: 24px;
  height: 24px;
  font-size: 24px;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const Spinner: React.FC<SpinnerProps> = ({ style }) => {
  return (
    <SpinnerStyled role="status" style={style}>
      <span>Loading...</span>
    </SpinnerStyled>
  );
};

export default Spinner;
