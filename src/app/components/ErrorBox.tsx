"use client";
import React from "react";

interface ErrorBoxProps {
  isOpen: boolean;
  onClose: () => void;
  errMsg: string;
}

const ErrorBox: React.FC<ErrorBoxProps> = ({ isOpen, onClose, errMsg }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-300 p-5 z-50 rounded-lg shadow-lg relative w-8/12 md:w-5/12">
        <button
          onClick={onClose}
          className="absolute right-2 text-3xl top-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Error:</h2>
        <p>{errMsg}</p>
      </div>
      <div
        className="absolute inset-0 bg-black z-20 opacity-50"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default ErrorBox;
