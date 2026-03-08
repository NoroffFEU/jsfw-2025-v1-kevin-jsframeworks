"use client";

import { useToastStore } from "@/stores/toastStore";

export default function ToastNotification() {
  const toasts = useToastStore((state) => state.toasts);
  const removeToast = useToastStore((state) => state.removeToast);

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "80px",
        right: "16px",
        width: "320px",
        maxWidth: "calc(100vw - 32px)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            backgroundColor: toast.type === "success" ? "#dcfce7" : "#fee2e2",
            color: toast.type === "success" ? "#166534" : "#991b1b",
            border: `1px solid ${
              toast.type === "success" ? "#86efac" : "#fca5a5"
            }`,
            borderRadius: "12px",
            padding: "12px 16px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <p style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>
              {toast.message}
            </p>

            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
                fontWeight: 700,
                lineHeight: 1,
                color: "inherit",
              }}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
