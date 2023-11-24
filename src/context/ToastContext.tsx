import { createContext, FC, ReactNode, useContext, useState } from "react";

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

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  // function to add toast using type and message
  const addToast = (type: ToastType, message: string) => {
    const id = new Date().getTime();
    const newToast: ToastData = { id, type, message };

    // remove the latest one if toast item more than 5
    setToasts((prevToasts) => [...prevToasts.slice(-MAX_TOASTS + 1), newToast]);

    if (type !== "exit") {
      setTimeout(() => {
        removeToast(id);
      }, 3000);
    }
  };

  // function to remove toast
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

// custom hook to use toast context
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
