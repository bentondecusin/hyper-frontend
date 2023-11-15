/* eslint-disable react-hooks/rules-of-hooks */
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
  uploadValid: boolean;
}

const QueryBox: React.FC<QueryBoxProps> = ({ onQuery, uploadValid }) => {
  if (!uploadValid) return null;
  const formRef = React.useRef<any>(null);
  const inputRef = React.useRef<any>(null);
  const onQuerySubmit = async (e: any) => {
    e.preventDefault();
    onQuery(inputRef.current?.value);
    // formRef.current?.reset();
  };
  return (
    <div className="w-full h-full m-1 p-1">
      <span className="flex p-1 items-center pr-3 pointer-events-none ">
        Enter SQL query here:
      </span>
      <form
        className="flex p-1 items-center h-20 "
        ref={formRef}
        onSubmit={onQuerySubmit}
        // className="relative bg-gray-700 rounded-lg"
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
          style={{ background: "white", color: "black" }}
          className="input-glow appearance-none border rounded w-full h-full whitespace-pre-line py-2 px-3 leading-tight focus:outline-none focus:shadow-outline pl-3 pr-3 bg-gray-600 border-gray-600 transition-shadow duration-200 font-mono"
          defaultValue="SELECT COUNT(*) FROM german WHERE credit=1.0 "
          type="text"
          name="text"
        />
      </form>
      <span className=" flex items-center pl-3 pr-3 pointer-events-none ">
        ENTER: Send SQL query
      </span>
      <span className=" flex items-center pl-3 pr-3 pointer-events-none ">
        SHIFT+ENTER: new line.
      </span>
    </div>
  );
};

export default QueryBox;
