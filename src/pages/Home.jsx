import React from "react"
import { Link } from "react-router-dom"
import Header from "../components/Header"
import homeStore from "../stores/homeStore"


export default function Home() {
  const store = homeStore()
  React.useEffect(() => {
    store.fetchCoins()
  }, [])

  return (
    <div>
      <Header />
      <input type="text" value={store.query} onChange={store.setQuery} />
      {store.coinsArray.map(coin => {
        return (
          <div key={coin.id}>
            <Link to={`/${coin.id}`}>
              {coin.name}
            </Link>
          </div>
        )
      })}
    </div>
  )
}