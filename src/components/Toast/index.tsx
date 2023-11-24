import React from "react";
import { useToast } from "@/context/ToastContext";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }

  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const ToasterContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
`;

const Toast = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  animation: ${slideIn} 0.3s ease-in-out;

  &.success {
    background-color: ${({ theme }) => theme.colors.success};
    color: #fff;
  }

  &.error {
    background-color: ${({ theme }) => theme.colors.error};
    color: #fff;
  }

  &.exit {
    animation: ${slideOut} 0.3s ease-in-out;
  }
`;

const ToastIcon = styled.div`
  margin-right: 8px;
  display: flex;
  align-items: center;
`;

const ToastMessage = styled.span`
  flex: 1;
`;

const Toaster: React.FC = () => {
  const { toasts, removeToast } = useToast();

  return (
    <ToasterContainer>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          className={`toast ${toast.type} ${
            toast.type === "exit" ? "exit" : ""
          }`}
          onAnimationEnd={() => {
            if (toast.type === "exit") {
              removeToast(toast.id);
            }
          }}
        >
          <ToastIcon>
            {toast.type === "success" ? (
              <FaCheckCircle className="toast-icon success" />
            ) : (
              <FaTimesCircle className="toast-icon error" />
            )}
          </ToastIcon>
          <ToastMessage>{toast.message}</ToastMessage>
        </Toast>
      ))}
    </ToasterContainer>
  );
};

export default Toaster;
