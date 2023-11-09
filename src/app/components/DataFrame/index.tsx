// `pages/_app.js`
import "../../globals.css";
import { useRef } from "react";
interface DataFrameProps {
  text: string;
  uploadValid: boolean;
}
const DataFrame: React.FC<DataFrameProps> = ({ text, uploadValid }) => {
  if (!text || !uploadValid) return null;
  const lines: string[] = text.split("\n");
  const data: string[][] = lines.map((line) => line.split(","));
  const headers = data[0];
  const rows = data.slice(1);
  return (
    <div className="flex w-full flex-grow overflow-hidden relative">
      {/* <table
        className="fancy-table"
        style={{
          overflowX: "scroll",
          display: "block",
          border: "1px solid black",
        }}
      >
        <thead style={{}}>
          <tr style={{ border: "1px solid black" }}>
            {headers?.map((header, i) => (
              <th style={{ border: "1px solid black" }} key={i}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody
          style={{
            overflowY: "scroll",
            border: "1px solid black",
          }}
        >
          {rows?.map((rowData, i) => {
            return (
              <tr style={{ border: "1px solid red", width: "90px" }} key={i}>
                {rowData?.map((data, i) => {
                  return (
                    <td
                      style={{ border: "1px solid black", width: "90px" }}
                      key={i}
                    >
                      {data}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table> */}
      <div
        style={{
          overflowX: "scroll",
          display: "block",
          border: "1px solid black",
          color: "white",
        }}
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};
export default DataFrame;
