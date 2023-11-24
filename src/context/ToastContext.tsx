import React, { createContext, ReactNode, useContext, useState } from "react";

export type ToastType = "success" | "error" | "exit";

type ToastData = {
  id: number;
  type: ToastType;
  message: string;
};

type ToastContextType = {
  toasts: ToastData[];
  addToast: (type: ToastType, message: string) => void;
  removeToast: (id: number) => void;
};

const MAX_TOASTS = 5;

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const addToast = (type: ToastType, message: string) => {
    const id = new Date().getTime();
    const newToast: ToastData = { id, type, message };

    // En fazla 5 tostu koru
    setToasts((prevToasts) => [...prevToasts.slice(-MAX_TOASTS + 1), newToast]);

    if (type !== "exit") {
      setTimeout(() => {
        removeToast(id);
      }, 3000);
    }
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  const contextValue: ToastContextType = {
    toasts,
    addToast,
    removeToast,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
