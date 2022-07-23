import React, { useState, useContext } from 'react'
import './coin.css'
import CoinChartData from './CoinChartData';
import { IdContext } from './context/IdContext'

const Coin = ({ id, image, name, symbol, price, volume, priceChange, marketcap }) => {

    const [style, setStyle] = useState('chart-view-passive')
    // eslint-disable-next-line
    const [coinId, setCoinId] = useContext(IdContext)

    const showGraph = () => {
        style === 'chart-view-passive' ?
            setStyle('chart-view-active') :
            setStyle('chart-view-passive')
        setCoinId(id)
    }

    return (
        <div className='border-bottom'>
            <div className="coin-container">
                <div onClick={showGraph} className="coin-row">
                    <div className="coin">
                        <img src={image} alt="crypto" />
                        <h1>{name}</h1>
                        <p className="coin-symbol">{symbol}</p>
                    </div>
                    <div className="coin-data">
                        <p className="coin-price">₹ {price.toLocaleString('hi-IN')}</p>
                        <p className="coin-volume">₹ {volume.toLocaleString('hi-IN')}</p>
                        {priceChange < 0
                            ? (
                                <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
                            )
                            : (
                                <p className="coin-percent green">+{priceChange.toFixed(2)}%</p>
                            )
                        }
                        <p className="coin-marketcap"> <span className="mktcap"> Market Cap :</span> ₹ {marketcap.toLocaleString('hi-IN')}</p>
                    </div>
                </div>
            </div>
            {style === 'chart-view-active' ? <div className={style}> <CoinChartData /> </div> : <div></div>}
        </div>
    )
}

export default Coin
