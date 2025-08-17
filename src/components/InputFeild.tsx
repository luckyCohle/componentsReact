import React, { useState } from "react";
import { FaEye, FaRegEyeSlash } from "react-icons/fa"

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  pwdToggle?: boolean;
}

function InputField(props: InputFieldProps) {
  const {
    value,
    onChange,
    label,
    placeholder,
    helperText,
    errorMessage,
    disabled = false,
    invalid = false,
    variant = "outlined",
    size = "md",
    pwdToggle = false
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPwd = () => { setShowPassword((prev) => !prev) };

  // Base styles 
  const base = "w-full rounded-lg border focus:outline-none focus:ring-2 focus:ring-offset-1 transition-all duration-200";

  
  const variants: Record<string, string> = {
    filled: `bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 focus:ring-blue-100 
             hover:bg-gray-100 ${invalid ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}`,
    outlined: `bg-white border-gray-300 focus:border-blue-500 focus:ring-blue-100 
               hover:border-gray-400 ${invalid ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}`,
    ghost: `bg-transparent border-transparent focus:bg-white focus:border-blue-500 focus:ring-blue-100 
            hover:bg-gray-50 ${invalid ? "border-red-400 focus:border-red-500 focus:ring-red-100" : ""}`
  };

  // Improved sizes
  const sizes: Record<string, string> = {
    sm: "text-sm px-3 py-2",
    md: "text-base px-4 py-3",
    lg: "text-lg px-5 py-4"
  };

  const inputType = pwdToggle ? (showPassword ? "text" : "password") : "text";

  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}

      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder ?? ""}
          disabled={disabled}
          className={`${base} ${variants[variant]} ${sizes[size]} ${
            pwdToggle ? "pr-12" : ""
          } ${
            invalid ? "" : ""
          } ${disabled ? "bg-gray-100 border-gray-200 cursor-not-allowed text-gray-500" : ""}`}
        />
        {pwdToggle && (
          <button
            type="button"
            onClick={toggleShowPwd}
            className="absolute right-3  transform translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 rounded transition-colors"
            disabled={disabled}
          >
            {showPassword ? < FaEye className="w-4 h-4" /> : <FaRegEyeSlash className="w-4 h-4" />}
          </button>
        )}
      </div>

      {/* Message area */}
      {invalid && errorMessage ? (
        <p className="text-sm text-red-600 font-medium">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-sm text-gray-600">{helperText}</p>
      ) : null}
    </div>
  );
}

export default InputField;