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
import TitleCard from '@/components/ui/Cards/TitleCards';

  
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
  
    
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
    const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'MAU',
        data: labels.map(() => { return Math.random() * 10 + 10 }),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor:'rgba(84, 175, 189, 1)',
        
      },
    ],
  };
    
  
      return(
        <TitleCard title={"Monthly Attendance"}>
            <Line data={data} options={options}/>
        </TitleCard>
      )
  }
  
  
  export default LineChart