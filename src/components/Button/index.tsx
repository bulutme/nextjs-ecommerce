import styled, { css } from "styled-components";
import React, { ButtonHTMLAttributes } from "react";
import Spinner from "../Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  iconSize?: number;
  loading?: boolean;
  variant?: "default" | "outlined" | "dashed" | "link" | "filled" | "rounded";
  color?: "primary" | "error" | "warning" | "secondary" | "success" | "info";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
}

const sizeStyles = {
  small: css`
    padding: 8px 16px;
    font-size: 14px;
  `,
  medium: css`
    padding: 12px 24px;
    font-size: 16px;
  `,
  large: css`
    padding: 16px 32px;
    font-size: 18px;
  `,
};

const colorStyles = {
  primary: css`
    background-color: #3bb77e;
    color: #fff;
  `,
  error: css`
    background-color: #e74c3c;
    color: #fff;
  `,
  warning: css`
    background-color: #f39c12;
    color: #fff;
  `,
  secondary: css`
    background-color: #2c3e50;
    color: #fff;
  `,
  success: css`
    background-color: #27ae60;
    color: #fff;
  `,
  info: css`
    background-color: #3bb77e;
    color: #fff;
  `,
};

const variantStyles = {
  default: css`
    /* Varsayılan stiller */
  `,
  outlined: css`
    border: 2px solid #3bb77e;
    background-color: transparent;
    color: #3bb77e;
  `,
  dashed: css`
    border: 2px dashed #3bb77e;
    background-color: transparent;
    color: #3bb77e;
  `,
  link: css`
    background-color: transparent;
    color: #3bb77e;
    text-decoration: underline;
  `,
  filled: css`
    background-color: #3bb77e;
    color: #fff;
  `,
  rounded: css`
    border-radius: 4px;
  `,
};

const ButtonStyled = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  white-space: nowrap;
  transition: color 0.2s ease;
  border: none;
  outline: none;

  ${({ size = "medium" }) => sizeStyles[size]}
  ${({ color = "primary" }) => colorStyles[color]}
  ${({ variant = "default" }) => variantStyles[variant]}

  ${({ fullWidth }) =>
    fullWidth &&
    css`
      width: 100%;
    `}

  ${({ loading }) =>
    loading &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}

  ${({ disabled, loading }) =>
    (disabled || loading) &&
    css`
      opacity: 0.5;
      cursor: not-allowed;
    `}
`;

const Button: React.FC<ButtonProps> = ({
  icon,
  iconSize = 16,
  loading = false,
  children,
  ...rest
}) => {
  return (
    <ButtonStyled {...rest}>
      {icon && (
        <span
          style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            fontSize: `${iconSize ?? 24}px`,
            marginRight: "8px",
          }}
        >
          {icon}
        </span>
      )}
      {loading && <Spinner />}
      {children}
    </ButtonStyled>
  );
};

export default Button;
