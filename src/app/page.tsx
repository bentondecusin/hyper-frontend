// page.tsx
"use client";
import { Context } from "@/components/Context";
import Header from "@/components/Header";
import Query from "@/components/QueryBox";
import { useChat } from "ai/react";
import InstructionModal from "./components/InstructionModal";
import UpInit from "./components/UpInit";
import { useEffect, useState } from "react";
import QueryBox from "@/components/QueryBox";
import DataFrame from "./components/DataFrame";
import DataPlot from "./components/DataPlot";
import HyperQueryBox from "./components/HyperQueryBox";

const Page = () => {
  const [isUploadOpen, setUploadOpen] = useState(true);
  const [uploadValid, setUploadValid] = useState(false);
  const [uploadInfo, setUploadInfo] = useState<string[]>([
    "No file has been uploaded",
  ]);
  const [stringifiedTable, setStringifiedTable] = useState<string>("");
  const [file, setFile] = useState<File>();
  useEffect(() => {
    onUploadCSV(0);
  }, [file]);
  const [plotData, setPlotData] = useState<Object>({
    count: [],
    condition: [],
    // avg: [
    //   "1.3846153846153846154",
    //   "1.3437500000000000000",
    //   "1.0857142857142857143",
    //   "1.1666666666666666667",
    // ],
    // status: ["0.0", "1.0", "3.0", "2.0"],
  });

  // callback function that handles the csv upload
  const onUploadCSV = async (e: any) => {
    if (!file) return;

    // Remove default handler
    e && e.preventDefault();

    //must be csv files
    if (!e && file?.type != "text/csv") {
      setUploadInfo(["Wrong format: csv file only.", "Got: " + file?.type]);
      return;
    }

    const data = new FormData();
    data.set("file", file);
    const res = await fetch("/api/upload_csv", {
      method: "POST",
      body: data,
    })
      .then((res: Response) => {
        if (res?.status == 200) {
          res.json().then((rslt: { success: number; data: string }) => {
            setStringifiedTable(rslt["data"]);
            setUploadValid(true);
            setUploadInfo(["File " + file.name + " successfully uploaded  ✅"]);
          });
        } else {
          console.log("upload failed; error code: " + res?.status);
        }
      })
      .catch((e: any) => {
        console.log(" upload failed");
      });
  };

  // Disable all side-effects of dropping files, set file when dropped
  const onDrop = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    onUploadCSV(e);
    setFile(e.dataTransfer.files?.[0]);
  };

  // callback function that handles the SQL query
  const onQuery = async (qry: string) => {
    const res = await fetch("/api/SQL", {
      method: "POST",
      headers: {
        qry: qry,
      },
    }).then((res) =>
      res.json().then((data) => {
        const sql_rslt = JSON.parse(data.data);
        console.log(sql_rslt);
        setPlotData(sql_rslt);
      })
    );
  };

  // callback function that handles hypothetical update query
  const onHyperQuery = async (Ac: string, c: string) => {
    // we don't allow hyper query if no SQL query is issued
    if (!plotData) return;
    const res = await fetch("/api/whatif", {
      method: "POST",
      headers: {
        Ac: Ac,
        c: c,
      },
    }).then((rslt: any) => rslt.json());
    const sql_rslt = res?.props?.hyper_result;
    if (res?.success) {
      setPlotData((prevState: { count: any[]; condition: any[] }) => ({
        count: [...prevState["count"], sql_rslt["updated"]],
        condition: [...prevState["condition"], "updating " + Ac + " to " + c],
      }));
    }
  };
  return (
    <div className="flex flex-col justify-between h-screen bg-gray-800 p-2 mx-auto max-w-full">
      <Header className="my-5" />

      {/* <button
        onClick={() => setModalOpen(true)}
        className="fixed right-4 top-4 md:right-6 md:top-6 text-xl text-white animate-pulse-once"
      ></button> */}

      {/* <InstructionModal isOpen={true} onClose={() => setModalOpen(false)} /> */}
      <UpInit
        isOpen={isUploadOpen}
        onClose={() => setUploadOpen(false)}
        uploadInfo={uploadInfo}
        uploadValid={uploadValid}
        handleUpload={onUploadCSV}
        onDrop={onDrop}
      />
      <div className="flex w-full flex-grow overflow-hidden relative flex-col">
        <div className="flex w-full flex-grow overflow-hidden relative flex-row">
          <div
            style={{ background: "lightgray" }}
            className="flex w-full flex-grow overflow-hidden relative"
          >
            <DataPlot plotData={plotData} />
          </div>
          <DataFrame text={stringifiedTable}></DataFrame>
        </div>
        <HyperQueryBox onHyperQuery={onHyperQuery} />
        <QueryBox onQuery={onQuery} />
        <span className=" flex items-center pr-3 pointer-events-none text-gray-400">
          Press ⮐ to send
        </span>
      </div>

      {/* <div className="flex w-full flex-grow overflow-hidden relative">
        <div className="absolute transform translate-x-full transition-transform duration-500 ease-in-out right-0 w-2/3 h-full bg-gray-700 overflow-y-auto lg:static lg:translate-x-0 lg:w-2/5 lg:mx-2 rounded-lg"></div>
        <button
          type="button"
          className="absolute left-20 transform -translate-x-12 bg-gray-800 text-white rounded-l py-2 px-4 lg:hidden"
          onClick={(e) => {
            e.currentTarget.parentElement
              ?.querySelector(".transform")
              ?.classList.toggle("translate-x-full");
          }}
        >
          ☰
        </button>
      </div> */}
    </div>
  );
};

export default Page;
