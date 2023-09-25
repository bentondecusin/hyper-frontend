"use client";
import React, { FormEvent, ChangeEvent, useState, useEffect } from "react";
import InitQuery from "./InitQuery";
interface UpInit {}

const UpInit: React.FC<UpInit> = () => {
  /**
   * Status of uploading and initialization querying
   * Invariants:
   *    uploadValid => user able to issue query
   *    initValid => component closable
   */
  const [uploadValid, setUploadValid] = useState(false);
  const [initValid, setInitValid] = useState(false);

  // React hook that stores the state
  const [file, setFile] = useState<File>();
  const [uploadInfo, setUploadInfo] = useState<String>(
    "No file has been uploaded"
  );

  const inputRef = React.useRef<any>(null);
  const formRef = React.useRef<any>(null);

  // Whenever file is modified, call onUploadCSV, which handles the file with api calls
  useEffect(() => {
    onUploadCSV(0);
  }, [file]);

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

  // Disable all side-effects of dropping files, set file when dropped
  const onDrop = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(e.dataTransfer.files[0]);
  };

  // callback function that handles the csv upload
  const onUploadCSV = async (e: any) => {
    if (!file) return;

    // Remove default handler
    e && e.preventDefault();

    //must be csv files
    if (!e && file?.type != "text/csv") {
      setUploadInfo("Wrong format: csv file only. Got: " + file?.type);
      return;
    }
    try {
      // create new payload
      const data = new FormData();
      data.set("file", file);

      // call api
      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      // handle the error
      if (!res.ok) throw new Error(await res.text());
      setUploadValid(true);
      setUploadInfo(
        "File uploaded: " +
          file?.name +
          ". \n Run an initialization query or upload a new csv file"
      );
    } catch (e: any) {
      // Handle errors here
      console.error(e);
      setUploadValid(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-gray-300 p-10 z-50 rounded-lg shadow-lg relative w-16/30 ">
        <button className="absolute right-4 text-3xl top-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <form
          onSubmit={onUploadCSV}
          ref={formRef}
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
              setFile(e.target.files?.[0]);
              onUploadCSV(e);
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
        <div style={{ padding: "5px", textAlign: "center" }}>{uploadInfo}</div>
        <InitQuery />
        {/* uploadValid && */}
      </div>
    </div>
  );
};

export default UpInit;
