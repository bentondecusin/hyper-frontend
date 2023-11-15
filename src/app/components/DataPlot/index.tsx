import { Bar } from "react-chartjs-2";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { data } from "cheerio/lib/api/attributes";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataPlotProps {
  plotData: any;
}
const DataPlot: React.FC<DataPlotProps> = ({ plotData }) => {
  if (!plotData || Object.keys(plotData).length === 0) return null;

  return (
    <div>
      <Bar options={plotData["options"]} data={plotData["data"]}></Bar>
    </div>
  );
};
export default DataPlot;
