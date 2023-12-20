/* eslint-disable react-hooks/rules-of-hooks */

"use client";
import React, {
  FormEvent,
  ChangeEvent,
  useState,
  useEffect,
  useRef,
} from "react";
import HyperEntry from "./HyperEntry";

interface HyperQueryBoxProps {
  onHyperQuery: (lst: Array<{ Ac: string; c: string }>) => void;
  hasPlot: boolean | undefined;
  unSelectedKeys: Set<string>;
  selectedKeys: Set<string>;
  setErrMsg: (errMsg: string) => void;
}

const HyperQueryBox: React.FC<HyperQueryBoxProps> = ({
  onHyperQuery,
  hasPlot,
  unSelectedKeys,
  selectedKeys,
  setErrMsg,
}) => {
  if (!hasPlot) return null;
  const formRef = React.useRef<any>(null);
  const input_AcRef = React.useRef<any>(null);
  const input_cRef = React.useRef<any>(null);

  const onQuerySubmit = async (e: any) => {
    e.preventDefault();
    // Only query if both inputs have values
    onHyperQuery(hypoUpdateList);

    // formRef.current?.reset();
  };

  const [hypoUpdateList, setHypoUpdateList] = useState([{ Ac: "", c: "" }]);

  // when user updates a field in hypo update list
  const handleFieldChange = (e: Event, idx: Number) => {
    const { name, value } = e.target!;
    const lst = [...hypoUpdateList];
    lst[idx][name] = value;
    setHypoUpdateList(lst);
  };

  // when user removes an entire field
  const handleFieldRemove = (idx: number) => {
    const lst = [...hypoUpdateList];
    lst.splice(idx, 1);
    console.log(lst);
    setHypoUpdateList(lst);
  };

  // when user adds an entire field
  const handleFieldAdd = () => {
    setHypoUpdateList([...hypoUpdateList, { Ac: "", c: "" }]);
  };
  return (
    <div>
      <div className="grow-0 py-2 px-3 align-center">
        <h2> What if </h2>
      </div>
      <form
        className="flex flex-col m-2"
        ref={formRef}
        onSubmit={onQuerySubmit}
      >
        {/* This section contains fields, each has 2 inputs (attribute, value) */}

        {hypoUpdateList.map((singleField, idx) => (
          <HyperEntry
            Ac={singleField["Ac"]}
            c={singleField["c"]}
            idx={idx}
            unSelectedKeys={unSelectedKeys}
            handleFieldRemove={handleFieldRemove}
            handleFieldChange={handleFieldChange}
            onQuerySubmit={onQuerySubmit}
          />
        ))}

        {/* This section has one button that allows users to add field */}
        <div className="flex flex-center flex-row content-center">
          <button
            className="text-center m-1 p-1 rounded-lg border-2"
            type="button"
            onClick={handleFieldAdd}
          >
            More key +
          </button>
          <button
            className="text-center m-1 p-1 rounded-lg border-2"
            onClick={onQuerySubmit}
          >
            Submit
            {/* <input type="submit"></input> */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default HyperQueryBox;
