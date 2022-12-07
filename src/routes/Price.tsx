import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

const Price24List = styled.ul`
    li {
        padding: 15px 10px;
        width: 100%;
        background-color: #00000050;
        display: flex;
        justify-content: center;
        border: solid 1px #99999950;
        margin-bottom: 10px;
        border-radius: 10px;
        &:last-child {
            margin-bottom: 0;
        }
        span:first-child {
            font-size: 70%;
            margin-right: 10px;
        }
    }
`;

interface PriceData {
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
      };
    };
  }

interface PriceProps {
    coinId: string;
}

function Price({ coinId }:PriceProps) {
  const { isLoading, data } = useQuery<PriceData>(["tickers2", coinId], () => 
    fetchCoinTickers(coinId)
  );
  
  return (
    <div>
      { isLoading ? (
            "Loading Price Info..."
        ) : (
            <Price24List>
                <li>
                    <span>
                        1h-change
                    </span>
                    <span>
                        {data?.quotes.USD.percent_change_1h}%
                    </span>
                </li>
                <li>
                    <span>
                        6h-change
                    </span>
                    <span>
                        {data?.quotes.USD.percent_change_6h}%
                    </span>
                </li>
                <li>
                    <span>
                        12h-change
                    </span>
                    <span>
                        {data?.quotes.USD.percent_change_12h}%
                    </span>
                </li>
                <li>
                    <span>
                        24h-change
                    </span>
                    <span>
                        {data?.quotes.USD.percent_change_24h}%
                    </span>
                </li>
            </Price24List>
        )
      }
    </div>
  )
}


  
export default Price;