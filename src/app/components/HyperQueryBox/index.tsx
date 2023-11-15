/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import React, {
  FormEvent,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
} from "react";

interface HyperQueryBoxProps {
  onHyperQuery: (attribute_name: string, attribute_val: string) => void;
  hasPlot: boolean | undefined;
}

const HyperQueryBox: React.FC<HyperQueryBoxProps> = ({
  onHyperQuery,
  hasPlot,
}) => {
  if (!hasPlot) return null;
  const formRef = React.useRef<any>(null);
  const input_AcRef = React.useRef<any>(null);
  const input_cRef = React.useRef<any>(null);

  const onQuerySubmit = async (e: any) => {
    e.preventDefault();
    // Only query if both inputs have values
    if (input_AcRef.current && input_cRef.current) {
      onHyperQuery(input_AcRef.current?.value, input_cRef.current?.value);
    }
    // formRef.current?.reset();
  };
  return (
    <div>
      <form ref={formRef} onSubmit={onQuerySubmit}>
        <label htmlFor="sqlQuery"></label>
        {/* <textarea
          className="input-glow appearance-none border rounded w-full py-2 px-3 text-gray-200 leading-tight focus:outline-none focus:shadow-outline pl-3 pr-10 bg-gray-600 border-gray-600 transition-shadow duration-200"
          id="sqlQuery"
          name="sqlQuery"
          rows="5"
        ></textarea> */}
        <div className="grow-0 py-2 px-3">
          <h2>What if we update</h2>
        </div>
        <div className="grow-0">
          <input
            ref={input_AcRef}
            onSubmit={onQuerySubmit}
            style={{ background: "white", color: "black" }}
            className=" input-glow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline pl-3 pr-3 bg-gray-600 border-gray-600 transition-shadow duration-200"
            // value={input}
            type="text"
            name="text"
          />
        </div>

        <div className="grow-0 py-2 px-3 ">
          <h2>to </h2>
        </div>
        <div className="grow-0">
          <input
            ref={input_cRef}
            onSubmit={onQuerySubmit}
            style={{ background: "white", color: "black" }}
            className="input-glow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline pl-3 pr-3 bg-gray-600 border-gray-600 transition-shadow duration-200"
            type="text"
            name="text"
          />
        </div>
        <input type="submit" hidden />
      </form>
    </div>
  );
};

export default HyperQueryBox;
