"use client";
import React from "react";

interface HelpBoxProps {
  isOpen: boolean;
  onClose: () => void;
}
const HelpBox: React.FC<HelpBoxProps> = ({ isOpen, onClose }) => {
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
        <h2 className="text-2xl font-bold mb-4">Usage Guide</h2>
        <h3 className="text-2l font-bold ">How to upload</h3>
        <p>
          Click upload button on the upright. Then you can drag to upload a csv
        </p>
        <h3 className="text-2l font-bold ">How to do what-if Query</h3>
        <p>
          First, run a SELECT query. (e.g. SELECT COUNT(*) FROM german WHERE
          credit=1.0 )
        </p>
      </div>
      <div
        className="absolute inset-0 bg-black z-20 opacity-50"
        onClick={onClose}
      ></div>
    </div>
  );
};

export default HelpBox;
