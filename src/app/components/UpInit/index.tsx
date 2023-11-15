/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { FormEvent, ChangeEvent, useState, useEffect } from "react";
import QueryBox from "../QueryBox";
interface UpInitProps {
  isOpen: boolean;
  uploadValid: boolean;
  uploadInfo: string[];
  onClose: () => void;
  handleUpload: (e: any) => void;
  onDrop: (e: any) => void;
}

const UpInit: React.FC<UpInitProps> = ({
  isOpen,
  uploadValid,
  uploadInfo,
  onClose,
  handleUpload,
  onDrop,
}) => {
  /**
   * Status of uploading and initialization querying
   * Invariants:
   *    uploadValid => component closable
   */
  if (!isOpen) return null;

  // React hook that stores the state

  const inputRef = React.useRef<any>(null);

  // Whenever file is modified, call onUploadCSV, which handles the file with api calls

  // useEffect(() => {
  //   onUploadCSV(0);
  // }, [file]);

  // When clicked, click input node
  const onSumbitButtonClick = () =>
    inputRef && inputRef.current && inputRef.current.click();

  // Disable all side-effects of dragging files
  const onDrag = async (e: any) => {
    // Prevent default actions when dragging (but not dropping)
    // During dragging, onDragEnter, onDragLeave, onDragOver will be triggered
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black z-20 opacity-50"
        onClick={onClose}
      ></div>
      <div className="bg-gray-300 p-10 z-50 rounded-lg shadow-lg relative w-16/30 ">
        {uploadValid && (
          <button
            className="absolute right-4 text-3xl top-2 hover:text-primary-100"
            onClick={onClose}
          >
            &times;
          </button>
        )}

        <form
          onSubmit={handleUpload}
          style={{
            height: "16rem",
            width: "28rem",
            maxWidth: "100%",
            textAlign: "center",
            position: "relative",
          }}
          onDrop={onDrop}
          onDragEnter={onDrag}
          onDragLeave={onDrag}
          onDragOver={onDrag}
        >
          <input
            ref={inputRef}
            style={{ display: "none" }}
            type="file"
            name="file"
            id="label-file-upload "
            accept=".csv"
            onChange={(e) => {
              console.log("manually add");
              console.log(e);
              handleUpload(e);
            }}
          />

          <label id="label-file-upload" htmlFor="file">
            <div>
              <button
                className="upload-button"
                type="submit"
                onClick={onSumbitButtonClick}
              >
                <strong>Click here to upload a csv file </strong>
              </button>
              <span className=""> or drag it here</span>.
            </div>
          </label>
        </form>
        <div style={{ padding: "5px", textAlign: "center" }}>
          {uploadInfo?.map((msg, idx) => (
            <p key={idx}>{msg} </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpInit;
