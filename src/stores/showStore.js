import axios from "axios";
import { create } from "zustand";


const showStore = create((set) => ({

  graphData: [],
  detailData: null,

  fetchData: async (id) => {
    const [graphRes, dataDetailRes] = await Promise.all([
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`),
      axios.get(`https://api.coingecko.com/api/v3/coins/${id}?localization=false&market_data=true`),
    ])
    const graphData = graphRes.data.prices.map((price) => {
      const [timestamp, p] = price
      const date = new Date(timestamp).toLocaleDateString('em-us')
      return {
        Date: date,
        Price: p,
      }
    })


    set({
      graphData: graphData,
      detailData: {
        image: dataDetailRes.data.image.large,
        name: dataDetailRes.data.name,
        symbol: dataDetailRes.data.symbol,
        market_cap_rank: dataDetailRes.data.market_cap_rank,
        data_high_24h: dataDetailRes.data.market_data.high_24h.usd,
        data_low_24h: dataDetailRes.data.market_data.low_24h.usd,
        circulating_supply: dataDetailRes.data.market_data.circulating_supply,
        current_price: dataDetailRes.data.market_data.current_price.usd,
        price_change_percentage_1y: dataDetailRes.data.market_data.price_change_percentage_1y.toFixed(2)
      }
    })
  }
}))

export default showStore