// page.tsx
"use client";
import Header from "@/components/Header";
// import InstructionModal from "./components/InstructionModal";
import UpInit from "./components/UpInit";
import { useEffect, useState } from "react";
import QueryBox from "@/components/QueryBox";
import DataFrame from "./components/DataFrame";
import DataPlot from "./components/DataPlot";
import HyperQueryBox from "./components/HyperQueryBox";
import HelpBox from "./components/HelpBox";
import ErrorBox from "./components/ErrorBox";
import Swal from "sweetalert2";

import { Helpcenter, FolderUpload } from "@icon-park/react";

import {
  astVisitor,
  parseFirst,
  SelectStatement,
  Statement,
} from "pgsql-ast-parser";
import { assert } from "console";

interface Info {
  q_type: string;
  postlst: Array<string>;
  postvallst: Array<string>;
  AT?: string;
}
const Page = () => {
  const [isUploadOpen, setUploadOpen] = useState(true);
  const [isHelpOpen, setHelpOpen] = useState(false);
  const [hasError, setErrOn] = useState(false);

  // When error exists, throw error component
  const [errMsg, setErrMsg] = useState("");
  // useEffect(() => {
  //   setErrOn(true);
  // }, [errMsg]);

  const [uploadValid, setUploadValid] = useState(false);
  const [uploadInfo, setUploadInfo] = useState<string[]>([
    "No file has been uploaded",
  ]);

  // By default: horizontal; could be vertical, stacked
  const [plotMode, setPlotMode] = useState<string>("horizontal");

  // Keys in table; e.g. month, credit, etc
  // If selected in what if, then it's used
  const [unusedKeys, setUnusedKeys] = useState<Array<string>>([]);
  // const [usedKeys, setUsedKeys] = useState(new Set());

  // Preview of data table. Rendered in DataFrame component
  const [stringifiedTable, setStringifiedTable] = useState<string>("");
  const [numRecord, setNumRecord] = useState("");

  const [sqlInfo, setSqlInfo] = useState<Info>();

  // Uploaded file in File type
  const [file, setFile] = useState<File>();
  useEffect(() => {
    onUploadCSV(0);
  }, [file]);
  const [plotData, setPlotData] = useState<Object>();
  const ALLOWED_Q_TYPE = ["COUNT", "AVG"];

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
    console.log(file);
    const data = new FormData();
    data.set("file", file);
    const res = await fetch("/api/upload_csv", {
      method: "POST",
      body: data,
    })
      .then((res: Response) => {
        if (res?.status == 200) {
          res
            .json()
            .then(
              (rslt: { success: number; data: string; header: string[] }) => {
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Upload Success",
                  showConfirmButton: false,
                  timer: 2000,
                });
                setStringifiedTable(rslt["data"]);
                setNumRecord(rslt!["header"].pop());
                if (rslt.header == undefined) return;
                setUnusedKeys((_) => [...rslt.header]);
                setUploadValid(true);
                setUploadInfo([
                  "File " + file.name + " successfully uploaded  ✅",
                  "Close the window or re-upload",
                ]);
              }
            );
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

  // TODO: can be relaxed
  const extract_sql_info = (qry: string) => {
    try {
      const parsed: Statement = parseFirst(qry);
      console.log(parsed);
      // must be select type
      if (parsed.type != "select") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "SELECT query only",
        });
        return undefined;
      }

      const exp_file_name = file!.name.split(".")[0];
      const got_file_name = parsed.from[0]["name"]["name"];

      // must from 1 table and table names must match
      if (parsed.from.length != 1 || exp_file_name != got_file_name) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          html:
            '<pre class="text-left">' +
            "table names not match: " +
            "<br> expected: " +
            exp_file_name +
            "<br> got: " +
            got_file_name +
            "</pre>",
        });
        return undefined;
      }

      // TODO: support more columns
      const q_type: string = parsed.columns[0].expr?.function.name;
      if (q_type == "count")
        return {
          q_type: q_type,
          postlst: [parsed.where.left.name],
          postvallst: [parsed.where.right.value],
        };
      else if (q_type == "avg")
        return {
          q_type: q_type,
          AT: parsed.columns[0].expr.args[0].name,
          postlst: [parsed.where.left.name],
          postvallst: [parsed.where.right.value],
        };
    } catch (e: any) {
      console.log(e);
      Swal.fire({
        icon: "error",
        title: "SQL syntax error:",
        html:
          '<pre class="text-left">' +
          e.message.replaceAll("\n", "<br>") +
          "</pre>",
        grow: "row",
      });
      return undefined;
    }
  };

  // callback function that handles the SQL query
  const onQuery = async (qry: string) => {
    const newSqlInfo = extract_sql_info(qry);
    if (newSqlInfo == undefined) return;
    if (!ALLOWED_Q_TYPE.includes(newSqlInfo.q_type.toUpperCase())) {
      alert(newSqlInfo.q_type.toUpperCase() + " query not supported");
      return;
    }
    const res = await fetch("/api/SQL", {
      method: "POST",
      headers: {
        qry: qry,
      },
    }).then((res: Response) => {
      if (res?.status == 200) {
        res
          .json()
          .then((data) => {
            const sql_rslt = JSON.parse(data.data);
            setSqlInfo(newSqlInfo);
            setPlotData(sql_rslt);
          })
          .catch((res) => {
            console.log(res);
          });
      } else {
        res.json().then((data) => {
          Swal.fire({
            icon: "error",
            title: "SQL query fails:",
            text: data.error,
          });
        });
      }
    });
  };

  // callback function that handles hypothetical update query
  const onHyperQuery = async (
    lst: Array<{ Ac: string; c: string }>,
    plotMode: string
  ) => {
    // we don't allow hyper query if no SQL query is issued
    if (!plotData || Object.keys(plotData).length === 0) return;
    const Ac = lst.map((val, _) => val["Ac"]).join();
    const c = lst.map((val, _) => val["c"]).join();
    const res = await fetch("/api/whatif_qry", {
      method: "POST",
      headers: {
        Ac: Ac,
        c: c,
        AT: sqlInfo!["AT"],
        postlst: sqlInfo!["postlst"].join(),
        postvallst: sqlInfo!["postvallst"].join(),
        qt: sqlInfo!["q_type"],
        plotMode: plotMode,
      },
    }).then((res) => {
      if (res?.status == 200) {
        res.json().then((data) => {
          const sql_rslt = JSON.parse(data.data);
          setPlotData(sql_rslt);
        });
      } else {
        // TODO print more detailed error. Need to coordinate with backend
        console.log(res);
        res.json().then((data) => {
          Swal.fire({
            icon: "error",
            title: "Hyper query fails:",
            text: data.error,
          });
        });
      }
    });
  };
  return (
    <div className="flex flex-col justify-between h-screen bg-slate-100 p-2 mx-auto max-w-full">
      <Header className="my-5" />

      {/* --------------------- HELP SECTION --------------------- */}

      {/* Help button */}
      <Helpcenter
        className="fixed right-5 top-5 md:right-6 md:top-6 text-xl text-white animate-pulse-once help-button"
        theme="outline"
        onClick={() => setHelpOpen(true)}
        size="50"
        fill="#333"
      />
      {/* Help text */}
      <HelpBox isOpen={isHelpOpen} onClose={() => setHelpOpen(false)} />

      {/* --------------------- UPLOAD SECTION --------------------- */}
      {/* NOTE: Upload button */}
      <FolderUpload
        className="fixed right-20 top-5 md:right-20 md:top-6 text-xl text-white animate-pulse-once upload-button"
        theme="outline"
        onClick={() => setUploadOpen(true)}
        size="50"
        fill="#333"
      />
      <UpInit
        isOpen={isUploadOpen}
        onClose={() => setUploadOpen(false)}
        uploadInfo={uploadInfo}
        uploadValid={uploadValid}
        handleUpload={onUploadCSV}
        onDrop={onDrop}
      />
      <div className="flex w-full flex-grow overflow-hidden relative flex-row">
        <div className="bg-blue-100 rounded-xl flex m-1 p-4 flex-grow overflow-hidden relative flex-col w-8/12 ">
          <div className="bg-blue-50 relative m-1 w-full h-3/12 rounded-lg border-2 overflow-y-scroll flex flex-row justify-start bg-white">
            <QueryBox
              onQuery={onQuery}
              uploadValid={uploadValid}
              setErrMsg={setErrMsg}
            />
          </div>
          <div className="bg-blue-50 relative m-1 w-full grow rounded-lg border-2  overflow-y-scroll flex flex-row justify-start bg-white">
            <HyperQueryBox
              onHyperQuery={onHyperQuery}
              hasPlot={plotData && Object.keys(plotData).length !== 0}
              unSelectedKeys={unusedKeys}
              setErrMsg={setErrMsg}
            />
          </div>
        </div>
        {uploadValid && (
          <div className="bg-pink-100 rounded-xl m-1 flex w-full flex-grow overflow-hidden relative flex-col">
            {plotData && (
              <div className="bg-white rounded-xl m-1 border-red-200 border-4 flex w-full relative flex-grow ">
                <DataPlot plotData={plotData} plotMode={plotMode} />
              </div>
            )}
            {uploadValid && (
              <div>
                <h1 className="text-center">
                  Table name: {file!.name} (top 200/{numRecord})records are
                  shown
                </h1>
              </div>
            )}
            {uploadValid && (
              <div className="bg-white rounded-xl m-1 border-red-200 border-4 flex w-full relative overflow-y-scroll flex-grow">
                <DataFrame text={stringifiedTable} uploadValid={uploadValid} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
