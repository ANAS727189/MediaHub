const AppDialog = ({
  open,
  darkMode,
  title,
  message,
  variant = "info",
  primaryText = "OK",
  secondaryText,
  onPrimary,
  onSecondary,
}) => {
  if (!open) return null;

  const toneClass =
    variant === "error"
      ? darkMode
        ? "border-red-800"
        : "border-red-200"
      : variant === "warning"
        ? darkMode
          ? "border-amber-800"
          : "border-amber-200"
        : darkMode
          ? "border-blue-800"
          : "border-blue-200";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div
        className={`w-full max-w-md rounded-xl border p-4 shadow-2xl ${toneClass} ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className={`mt-2 text-sm whitespace-pre-line ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
          {message}
        </p>

        <div className="mt-4 flex justify-end gap-2">
          {secondaryText && (
            <button
              type="button"
              onClick={onSecondary}
              className={`rounded-md px-3 py-1.5 text-sm ${
                darkMode
                  ? "bg-gray-800 text-gray-200 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {secondaryText}
            </button>
          )}
          <button
            type="button"
            onClick={onPrimary}
            className={`rounded-md px-3 py-1.5 text-sm text-white ${
              variant === "error"
                ? "bg-red-600 hover:bg-red-700"
                : variant === "warning"
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {primaryText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppDialog;