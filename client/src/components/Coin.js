import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import '../App.css';
import { AuthContext } from '../context/auth';
import Coin from './coinage';

function App() {
  const { user } = useContext(AuthContext);
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
      <p className='popular-coins'>Coin List - Courtesy of Coin Gecko API</p>
      <p className='popular-coinage'>Please refresh if list does not populate.</p>
        {/* <form>
          <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search for coin by name'
          />
        </form> */}
        <section class="webdesigntuts-workshop">
	<form action="" method="">		    
  <input
            className='coin-input'
            type='text'
            onChange={handleChange}
            placeholder='Search for coin by name'
          />		    	
	</form>
</section>
      </div>
      <br></br>
      <hr></hr>
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