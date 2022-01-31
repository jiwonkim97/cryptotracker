import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface ChartProps{
  coinId: string;
}

interface IHistorical{
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    {
    refetchInterval:10000,
    }
  )
  return (
    <div>
      {isLoading ? ("Loading chart..."
        ) : (
          <ApexChart
            type="candlestick"
            series={[
              {
                name:"price",
                data: data?.map(price => {
                  return { x: price.time_open, y: [price.open.toFixed(3), price.high.toFixed(3), price.low.toFixed(3), price.close.toFixed(3)] };
                }),
              },
            ]}
            options={{
              theme: {
                mode: isDark ? "dark" : "light"
              },
              chart: {
                height: 500,
                width: 500,
                toolbar: {
                  show:false,
                },
                background:"transparent",
              },
              stroke: {
                curve: "smooth",
                width:2,
              },
              grid: {
                show: false,
              },
              yaxis: {
                show:false,
              },
              xaxis: {
                labels: {
                  show:false,
                },
                axisTicks: {
                  show:false,
                },
                axisBorder: {
                  show:false,
                },
                categories: data?.map(price => price.time_close),
                type:"datetime",
              },
            }}
          />
      )}
    </div>
  );
};
export default Chart;
