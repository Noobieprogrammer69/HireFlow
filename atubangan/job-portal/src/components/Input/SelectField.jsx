import { AlertCircle } from "lucide-react";

const SelectField = ({
  label,
  id,
  value,
  onChange,
  options,
  placeholder,
  error,
  required = false,
  disabled = false,
  icon: Icon,
}) => {
  return (
    <div className="space-y-2">

      <label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <div className="relative">

        {Icon && (
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-gray-500" />
          </div>
        )}

        <select
          id={id}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full ${
            Icon ? "pl-10" : "pl-4"
          } pr-10 py-3 rounded-lg bg-[#1a1a1a] border text-white transition outline-none appearance-none ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500"
              : "border-white/10 focus:ring-2 focus:ring-orange-500"
          }`}
        >
          <option value="">{placeholder}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}

        </select>

      </div>

      {error && (
        <div className="flex items-center space-x-1 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default SelectField;