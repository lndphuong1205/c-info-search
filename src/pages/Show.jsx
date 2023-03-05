import React from "react"
import { useParams } from "react-router-dom"
import showStore from "../stores/showStore"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
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
      <header>
        <img src={store.detailData?.image} />
        <h2>
          {store.detailData?.name} {store.detailData?.symbol}
        </h2>
      </header>
      <AreaChart
        width={500}
        height={400}
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
      <div>
        <h4>market_cap_rank</h4>
        <span>{store.detailData?.market_cap_rank}</span>
      </div>
      <div>
        <h4>data_high_24h</h4>
        <span>${store.detailData?.data_high_24h}</span>
      </div>
      <div>
        <h4>data_low_24h</h4>
        <span>${store.detailData?.data_low_24h}</span>
      </div>
      <div>
        <h4>circulating_supply</h4>
        <span>${store.detailData?.circulating_supply}</span>
      </div>
      <div>
        <h4>current_price</h4>
        <span>${store.detailData?.current_price}</span>
      </div>
      <div>
        <h4>price_change_1y</h4>
        <span>{store.detailData?.price_change_percentage_1y}%</span>
      </div>
    </div>
  )
}