import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type SignupInputProps = {
  placeholder: string;
  value: string;
  isValid: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
};

function SignupInput({
  placeholder,
  isValid,
  value,
  onChange,
  errorMessage,
}: SignupInputProps) {
  const isEmpty = typeof value !== "string" || value.trim() === "";

  return (
    <div className="w-full space-y-2">
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
      <AnimatePresence mode="wait">
        {!isValid && value !== "" && (
          <motion.p
            className="px-2 text-xs text-red-400"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SignupInput;
