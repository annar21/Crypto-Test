import React from 'react'
import { Pie } from 'react-chartjs-2'  
import { useCrypto } from '../hooks/crypto'

function PortfolioChart() {
  const {assets} = useCrypto()
  const data = {
    labels: assets.map((asset) => asset.name),
    datasets: [
      {
        label: '$',
        data: assets.map((a) => a.totalAmount.toFixed(2)),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  }

  return (
    <div style={ 
      {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '1rem',
        height: '400px'
      } 
    }>
      <Pie data={data} options={options} />
    </div>
  )
}

export default PortfolioChart