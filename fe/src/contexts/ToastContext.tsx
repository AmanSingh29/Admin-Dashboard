"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle } from "lucide-react";

type ToastType = "success" | "error";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextType = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, type: ToastType = "success") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, type }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, 4000);
    },
    []
  );

  const getIcon = (type: ToastType) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-600" size={20} />;
      case "error":
        return <XCircle className="text-red-600" size={20} />;
    }
  };

  const colorStyle = {
    success: "bg-green-50 text-green-800",
    error: "bg-red-50 text-red-800",
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-4 right-4 z-[9999] space-y-3 w-[320px]">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`${
              colorStyle[toast.type]
            } flex items-start gap-3 p-3 rounded-lg shadow-lg text-sm animate-slideInUp`}
          >
            {getIcon(toast.type)}
            <p>{toast.message}</p>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideInUp {
          animation: slideInUp 0.3s ease-out;
        }
      `}</style>
    </ToastContext.Provider>
  );
};
