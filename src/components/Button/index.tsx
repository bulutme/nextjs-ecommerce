import styled, { css } from "styled-components";
import { ButtonHTMLAttributes, FC } from "react";
import Spinner from "../Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  iconSize?: number;
  loading?: boolean;
  $variant?: "default" | "link" | "rounded";
  color?: "primary";
  size?: "small" | "medium" | "large";
  $fullwidth?: boolean;
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
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};

    &:hover {
      background-color: ${({ theme }) => theme.colors.primaryDark};
    }
  `,
};

const variantStyles = {
  default: css``,
  link: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    border-radius: 4px;

    &:hover {
      background: none;
    }
  `,
  rounded: css`
    border-radius: 4px;
  `,
};

const ButtonStyled = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: ${({ theme }) => theme.fontWeight.medium};
  cursor: pointer;
  width: fit-content;
  position: relative;
  white-space: nowrap;
  transition: color 0.2s ease;
  border: none;
  outline: none;

  ${({ size = "medium" }) => sizeStyles[size]}
  ${({ color = "primary" }) => colorStyles[color]}
  ${({ $variant = "default" }) => variantStyles[$variant]}

  ${({ $fullwidth }) =>
    $fullwidth &&
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
      background: ${({ theme }) => theme.colors.gray};

      &:hover {
        background: ${({ theme }) => theme.colors.gray};
      }
    `}
`;

const Button: FC<ButtonProps> = ({
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
