"use client";
import React, {
  FormEvent,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
} from "react";

interface QueryBoxProps {
  onQuery: (s: string) => void;
}

const QueryBox: React.FC<QueryBoxProps> = ({ onQuery }) => {
  const formRef = React.useRef<any>(null);
  const inputRef = React.useRef<any>(null);
  const onQuerySubmit = async (e: any) => {
    e.preventDefault();
    console.log(inputRef.current?.value);
    onQuery(inputRef.current?.value);
    // formRef.current?.reset();
  };
  return (
    <div className="border-2 border-gray-600 rounded-lg overflow-y-scroll  flex flex-col justify-end bg-white">
      <form
        ref={formRef}
        onSubmit={onQuerySubmit}
        className="relative bg-gray-700 rounded-lg"
      >
        <label htmlFor="sqlQuery"></label>
        {/* <textarea
          className="input-glow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline pl-3 pr-10 bg-gray-600 border-gray-600 transition-shadow duration-200"
          id="sqlQuery"
          name="sqlQuery"
          rows="5"
        ></textarea> */}
        <input
          ref={inputRef}
          onSubmit={onQuerySubmit}
          style={{ background: "lightblue", color: "black" }}
          className="input-glow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline pl-3 pr-10 bg-gray-600 border-gray-600 transition-shadow duration-200"
          // value={input}
          type="text"
          name="text"
        />
      </form>
    </div>
  );
};

export default QueryBox;
