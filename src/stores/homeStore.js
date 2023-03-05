import axios from "axios";
import { debounce } from "lodash";
import { create } from "zustand";



const homeStore = create((set) => ({

  coinsArray: [],
  trendingcoinsArray: [],
  query: '',

  setQuery: (e) => {
    set({ query: e.target.value })
    homeStore.getState().searchCoins()
  },

  searchCoins: debounce(async () => {
    const { query, trendingcoinsArray } = homeStore.getState()
    if (query.length > 2) {
      const res = await axios.get(`https://api.coingecko.com/api/v3/search?query=${query}`)
      console.log(res);
      const coins = res.data.coins.map(coin => {
        return {
          name: coin.name,
          id: coin.id,
          image: coin.large
        }
      })
      set({ coinsArray: coins })
    }
    else {
      set({ coinsArray: trendingcoinsArray })
    }
  }, 500),

  fetchCoins: async () => {
    const [res, btcRes] = await Promise.all([
      axios.get('https://api.coingecko.com/api/v3/search/trending'),
      axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`)
    ])
    const btcPrice = btcRes.data.bitcoin.usd
    const coins = res.data.coins.map(coin => {
      return {
        name: coin.item.name,
        price_btc: coin.item.price_btc.toFixed(10),
        price_usd: (coin.item.price_btc * btcPrice).toFixed(10),
        id: coin.item.id,
        image: coin.item.large
      }
    })
    console.log(coins);
    set({ coinsArray: coins, trendingcoinsArray: coins })
  }


}))

export default homeStore