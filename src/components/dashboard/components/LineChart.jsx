'use client'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
import { Line } from 'react-chartjs-2';
import TitleCard from '@/components/ui/TitleCards';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
  
  function LineChart(){
  
    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };
  
    
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des'];
  
    const data = {
    labels,
    datasets: [
      {
        fill: false,
        label: 'Diterima Job',
        data: labels.map(() => { return Math.random() * 10 + 10 }),
        borderColor: 'rgb(0, 68, 33)',
        
      },
      
    ],
  };
    
  
    return(
      <TitleCard title={"Penerimaan Job (per bulan)"}>
          <Line data={data} options={options}/>
      </TitleCard>
    )
  }
  
  
  export default LineChart