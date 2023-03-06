import React from "react"
import { useParams } from "react-router-dom"
import showStore from "../stores/showStore"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Header from "../components/Header";

export default function Show() {
  const store = showStore()
  const params = useParams()

  React.useEffect(() => {
    store.fetchData(params.id)
  }, [])
  
  return (
    <div>
      <Header back />
      <header className="show-header">
        <img src={store.detailData?.image} />
        <h2>
          {store.detailData?.name} {store.detailData?.symbol}
        </h2>
      </header>
      <div className="width">
        <div className="show-graph">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={store.graphData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="Price" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="show-details">
        <div className="width">
          <h2>Details</h2>
          <div className="show-details-row">
            <h3>Market cap Rank</h3>
            <span>{store.detailData?.market_cap_rank}</span>
          </div>
          <div className="show-details-row">
            <h3>Highest 24h</h3>
            <span>${store.detailData?.data_high_24h}</span>
          </div>
          <div className="show-details-row">
            <h3>Lowest 24h</h3>
            <span>${store.detailData?.data_low_24h}</span>
          </div>
          <div className="show-details-row">
            <h3>Circulating Supply</h3>
            <span>${store.detailData?.circulating_supply}</span>
          </div>
          <div className="show-details-row">
            <h3>Current Price</h3>
            <span>${store.detailData?.current_price}</span>
          </div>
          <div className="show-details-row">
            <h3>Price change 1 year</h3>
            <span>{store.detailData?.price_change_percentage_1y}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}