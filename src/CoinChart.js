import React, { useRef, useEffect, useState } from 'react'
import 'chartjs-adapter-moment';
import Chart from 'chart.js/auto'
import './coinChart.css'

const CoinChart = ({ data }) => {
    const chartRef = useRef()
    const { day, week, year } = data

    const [timeFormat, setTimeFormat] = useState("24h");
    console.log(timeFormat)
    const determineTimeFormat = () => {
        switch (timeFormat) {
            case "24h":
                return day;
            case "7d":
                return week;
            case "1y":
                return year;
            default:
                return day;
        }
    };
    console.log(determineTimeFormat())
    useEffect(() => {
        if (chartRef && chartRef.current) {
            const chartInstance = new Chart(chartRef.current, {
                type: 'line',
                data: {
                    datasets: [
                        {
                            label: 'Price',
                            data: determineTimeFormat(),
                            showLine: true,
                            backgroundColor: "rgba(53, 255, 105,0.7)",
                            borderColor: "rgba(53, 255, 105,0.7)",
                            pointRadius: 0,
                        }
                    ]
                },
                options: {
                    lineHeightAnnotation: {
                        always: true,
                        hover: false,
                        lineWeight: 2,
                    },
                    parsing: {
                        xAxisKey: 't',
                    },

                    animation: {
                        duration: 2000,
                    },
                    maintainAspectRatio: false,
                    responsive: true,
                    scales: {
                        x: {
                            type: "time",
                            distribution: "linear",
                        },
                    },
                }
            })
            console.log(chartInstance)

            return () => { chartInstance.destroy() }
        }
        // eslint-disable-next-line
    }, [timeFormat])
    return (
        <>
            <canvas ref={chartRef} id="myChart" width={800} height={400}></canvas>
            <div className='time-button'>
                <button onClick={() => setTimeFormat("24h")}>
                    24 Hrs
                </button>
                <button onClick={() => setTimeFormat("7d")}>
                    7 Days
                </button>
                <button onClick={() => setTimeFormat("1y")}>
                    1 Year
                </button>
            </div>
        </>
    )
}

export default CoinChart