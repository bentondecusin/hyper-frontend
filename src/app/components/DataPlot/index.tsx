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
  if (!plotData) return null;
  const [xLabel, yLabel] = Object.keys(plotData);
  const xSeries = plotData[xLabel];
  const ySeries = plotData[yLabel];
  return (
    <div className="flex w-full flex-grow overflow-hidden relative">
      <Bar
        // options={...}
        data={{
          labels: ySeries,
          datasets: [
            {
              label: xLabel,
              data: xSeries,
            },
          ],
        }}
        // {...props}
      />
    </div>
  );
};
export default DataPlot;
