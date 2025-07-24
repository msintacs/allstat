import clsx from "clsx";
import React from "react";

type SignupInputProps = {
  placeholder: string;
  value: string;
  isValid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function SignupInput({
  placeholder,
  isValid,
  value,
  onChange,
}: SignupInputProps) {
  const isEmpty = typeof value !== "string" || value.trim() === "";

  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={clsx(
        "h-14 w-full rounded-xl border p-6 focus:border-transparent focus:outline-none focus:ring-2",
        isEmpty
          ? "border-gray-300 focus:ring-gray-300"
          : isValid === true
            ? "border-indigo-300 focus:ring-indigo-300"
            : "border-red-300 focus:ring-red-300"
      )}
    />
  );
}

export default SignupInput;
