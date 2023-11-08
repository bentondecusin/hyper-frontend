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
  if (!plotData) return null;
  var [xLabel, yLabel] = Object.keys(plotData);
  var xSeries: any[];
  var ySeries;
  xSeries = plotData[xLabel];
  if (xSeries.length == 0) return null;
  ySeries = plotData[yLabel];

  return (
    <div className="flex w-full flex-grow overflow-hidden relative">
      {/* <Bar
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
      /> */}
      <Bar options={plotData["options"]} data={plotData["data"]}></Bar>
    </div>
  );
};
export default DataPlot;
