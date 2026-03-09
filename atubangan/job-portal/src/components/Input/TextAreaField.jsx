import { AlertCircle } from "lucide-react";

const TextAreaField = ({
  label,
  id,
  placeholder,
  value,
  onChange,
  error,
  helperText,
  required = false,
  disabled = false,
  rows = 6,
}) => {
  return (
    <div className="space-y-2">

      <label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`w-full px-4 py-3 rounded-lg bg-[#1a1a1a] border text-white placeholder-gray-500 transition outline-none resize-y ${
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-500"
            : "border-white/10 focus:ring-2 focus:ring-orange-500"
        }`}
      />

      {error && (
        <div className="flex items-center space-x-1 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}

      {helperText && !error && (
        <p className="text-xs text-gray-500">{helperText}</p>
      )}

    </div>
  );
};

export default TextAreaField;