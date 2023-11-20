import styled from "styled-components";
import React from "react";

interface SpinnerProps {
  style?: React.CSSProperties;
  className?: string;
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

const Spinner: React.FC<SpinnerProps> = ({ style, className }) => {
  return (
    <SpinnerStyled role="status" className={className} style={style}>
      <span className="sr-only">Loading...</span>
    </SpinnerStyled>
  );
};

export default Spinner;
