import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const View = styled.div`
  display:flex;
  justify-content:space-between;
  background-color:rgba(0,0,0,0.5);
  padding:10px 20px;
  border-radius: 10px;
  margin:10px 0px;
`;
const ViewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface IPriceData{
  coinId: string;
};

interface PriceData{
id: string;
name: string;
symbol: string;
rank: number;
circulating_supply: number;
total_supply: number;
max_supply: number;
beta_value: number;
first_data_at: string;
last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  };
}
function Price({ coinId }: IPriceData) {
  const { isLoading, data } = useQuery<PriceData>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval:5000,
    }
  );
  return (
    <>
    {
      isLoading?(
        "Loading..."
      ): (
      <>
      <View>
        <ViewItem>
          <span>Now</span>
        </ViewItem>
        <ViewItem>
          {data?.quotes?.USD?.price}
        </ViewItem>
      </View>
      <View>
        <ViewItem>
          <span>1 Hour vs.</span>
        </ViewItem>
        <ViewItem>
          {data?.quotes?.USD?.percent_change_1h}
        </ViewItem>
      </View>
      <View>
        <ViewItem>
          <span>1 Day vs.</span>
        </ViewItem>
        <ViewItem>
          {data?.quotes?.USD?.percent_change_24h}
        </ViewItem>
      </View>
      <View>
        <ViewItem>
          <span>1 Week vs.</span>
        </ViewItem>
        <ViewItem>
          {data?.quotes?.USD?.percent_change_7d}
        </ViewItem>
      </View>
      <View>
        <ViewItem>
          <span>30 Days vs.</span>
        </ViewItem>
        <ViewItem>
          {data?.quotes?.USD?.percent_change_30d}
        </ViewItem>
      </View>
      <View>
        <ViewItem>
          <span>1 Year vs.</span>
        </ViewItem>
        <ViewItem>
          {data?.quotes?.USD?.percent_change_1y}
        </ViewItem>
      </View>
    </>
    )}</>
  )
};
export default Price;
