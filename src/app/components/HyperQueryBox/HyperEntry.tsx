/* eslint-disable react-hooks/rules-of-hooks */

"use client";

interface HyperEntryProps {
  Ac: string;
  c: string;
  idx: number;
  unSelectedKeys: Set<string>;
  handleFieldRemove: (idx: number) => void;
  handleFieldChange: (e: Event, idx: number) => void;
  onQuerySubmit: (e: Event) => void;
}

const HyperEntry: React.FC<HyperEntryProps> = ({
  Ac,
  c,
  idx,
  unSelectedKeys,
  handleFieldRemove,
  handleFieldChange,
  onQuerySubmit,
}) => {
  return (
    <div className="flex flex-row border rounded border-gray-600">
      <div className="grow-0 flex flex-row">
        <div className="grow-0 py-1">
          <h2 className="text-center m-1 p-1">update</h2>
        </div>
        <div className="grow-0 py-1">
          <select
            style={{ background: "white", color: "black" }}
            className="input-glow appearance-none m-1 pt-1 pb-1 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline pl-1 pr-1 bg-gray-600 border-gray-600 transition-shadow duration-200 text-center"
            type="text"
            name="Ac"
            onChange={(e) => handleFieldChange(e, idx)}
          >
            <option value="">--Select a key--</option>
            {[...unSelectedKeys]?.map((attribute) =>
              attribute == Ac ? (
                <option selected="selected">{attribute} </option>
              ) : (
                <option>{attribute} </option>
              )
            )}
          </select>
        </div>

        <div className="grow-0 py-1">
          <h2 className="text-center m-1 p-1"> to </h2>
        </div>
        <div className="grow-0 py-1 w-3/12">
          <input
            style={{ background: "white", color: "black" }}
            className=" input-glow appearance-none m-1 pt-1 pb-1 border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline pl-3 pr-3 bg-gray-600 border-gray-600 transition-shadow duration-200"
            onChange={(e) => handleFieldChange(e, idx)}
            onSubmit={onQuerySubmit}
            type="text"
            name="c"
            value={c}
          />
        </div>
        <div className="grow-0 py-1 px-1 ">
          <button
            className=" text-center m-1 p-1 rounded-lg border-2"
            type="button"
            onClick={() => handleFieldRemove(idx)}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default HyperEntry;
