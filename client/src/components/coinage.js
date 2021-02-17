import React from 'react';
import './coin.css';

const Coin = ({
  name,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange
}) => {
  return (
    <div className='coin-container'>
        <div className='coin'>
          <img src={image} alt='crypto' />
          <h1>{name}</h1>
        </div>
            <div className="coin-tag">
                <p className='coin-symbol'>{symbol}</p>
                <p className='coin-price'>${price}<span className="usd">USD</span></p>
            </div>
                <div className='coin-data'>
                    <p className='coin-volume'>V: ${volume.toLocaleString()}</p>

                    {priceChange < 0 ? (
                    <p className='coin-percent red'>{priceChange.toFixed(2)}%</p>
                    ) : (
                    <p className='coin-percent green'>{Number(priceChange).toFixed(2)}%</p>
                    )}

                    <p className='coin-marketcap'>
                    MC: ${marketcap.toLocaleString()}
                    </p>
                </div>
        <hr/>
    </div>
    
  );
};

export default Coin;