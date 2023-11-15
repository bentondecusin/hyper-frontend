// `pages/_app.js`
import "../../globals.css";
import { useRef } from "react";
interface DataFrameProps {
  text: string;
  uploadValid: boolean;
}
const DataFrame: React.FC<DataFrameProps> = ({ text, uploadValid }) => {
  if (!text || !uploadValid) return null;
  return <div dangerouslySetInnerHTML={{ __html: text }} />;
};
export default DataFrame;
