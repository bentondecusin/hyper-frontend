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
  const options = plotData["options"];
  options["indexAxis"] = "y" as const;
  options["plugin"]["legend"] = {
    legend: {
      position: "right" as const,
    },
  };
  return (
    <div className="flex w-full flex-grow overflow-hidden relative">
      <Bar options={options} data={plotData["data"]} />
    </div>
  );
};
export default DataPlot;
