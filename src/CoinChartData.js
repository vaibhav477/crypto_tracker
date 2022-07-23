import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react'
import CoinChart from './CoinChart';
import { IdContext } from './context/IdContext'

const CoinChartData = () => {
    const [coinData, setCoinData] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line
    const [coinId, setCoinId] = useContext(IdContext)
    const id = coinId
    console.log(id)

    const formatData = (data) => {
        return data.map((el) => {
            return {
                t: el[0],
                y: el[1].toFixed(2),
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const [day, week, year] = await Promise.all([
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=1`),
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=7`),
                axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart/?vs_currency=inr&days=365`),
            ]);


            setCoinData({
                day: formatData(day.data.prices),
                week: formatData(week.data.prices),
                year: formatData(year.data.prices),
            })
            setIsLoading(false);
        }

        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])
    if (isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <CoinChart data={coinData} />
    )
}

export default CoinChartData