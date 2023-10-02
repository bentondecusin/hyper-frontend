"use client";
import React, {
  FormEvent,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
} from "react";

interface QueryBox {}

const QueryBox: React.FC<QueryBox> = () => {
  const onQuerySubmit = async (e: any) => {
    e.preventDefault();
    console.log(e);
    formRef.current?.reset();
  };
  const formRef = React.useRef<any>(null);
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
          style={{ background: "blue" }}
          className="input-glow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline pl-3 pr-10 bg-gray-600 border-gray-600 transition-shadow duration-200"
          // value={input}
          type="text"
          name="text"
        />
        <span className=" flex items-center pr-3 pointer-events-none text-gray-400">
          Press ⮐ to send
        </span>
        <span className=" flex items-center pr-3 pointer-events-none text-gray-400">
          Press shift + ⮐ to enter a new line
        </span>
      </form>
    </div>
  );
};

export default QueryBox;
