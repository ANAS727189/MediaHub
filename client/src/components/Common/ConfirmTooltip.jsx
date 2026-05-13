import { useEffect, useRef } from "react";

const ConfirmTooltip = ({
  open,
  title = "Confirm action",
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  darkMode,
}) => {
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        onCancel();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      ref={tooltipRef}
      className={`absolute top-12 right-2 z-30 w-64 rounded-lg border p-3 shadow-xl ${
        darkMode
          ? "bg-gray-900 border-gray-700 text-gray-100"
          : "bg-white border-gray-200 text-gray-900"
      }`}
      role="dialog"
      aria-modal="false"
    >
      <p className="text-sm font-semibold">{title}</p>
      <p className={`mt-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        {message}
      </p>

      <div className="mt-3 flex items-center justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className={`rounded px-2 py-1 text-xs ${
            darkMode
              ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {cancelText}
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
        >
          {confirmText}
        </button>
      </div>
    </div>
  );
};

export default ConfirmTooltip;