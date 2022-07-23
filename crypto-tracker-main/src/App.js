import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios'
import Coin from './Coin.js';



function App() {

  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState("")


  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false")
      .then(res => {
        setCoins(res.data)
      })
      .catch(error => console.log(error))
  }, [])
  // console.log(coins)

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoin = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Search the Crypto</h1>
        <form action="">
          <input type="text" placeholder="Search" className="coin-input" onChange={handleChange} />
        </form>
      </div>
      {filteredCoin.map(coin => {
        return (
          <Coin
            key={coin.id}
            id={coin.id}
            name={coin.name}
            image={coin.image}
            symbol={coin.symbol}
            volume={coin.total_volume}
            price={coin.current_price}
            priceChange={coin.price_change_percentage_24h}
            marketcap={coin.market_cap}
          />
        )
      })}
    </div>
  );
}

export default App;

// https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false