import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import Coin from './coinage';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false&price_change_percentage=1h%2C%2024hr%2C%207d'
      )
      .then(res => {
        setCoins(res.data);
        console.log(res.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        
        <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search for coin by name'
          />
        </form>
        <h1 className='popular-coins'>Coin List - Hourly Update</h1>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin
            key={coin.id}
            name={coin.name}
            price={coin.current_price}
            symbol={coin.symbol}
            marketcap={coin.market_cap}
            volume={coin.total_volume}
            image={coin.image}
            priceChange={coin.price_change_percentage_1h_in_currency??"Info Not Available"}
          />
        );
      })}
    </div>
  );
}

export default App;