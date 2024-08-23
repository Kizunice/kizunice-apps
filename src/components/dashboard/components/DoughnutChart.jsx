'uxe client'
import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect,useState } from "react";
import axios from "axios";
import { Doughnut } from 'react-chartjs-2';
import TitleCard from '@/components/ui/TitleCards';
import Subtitle from '@/components/ui/Subtitle';

ChartJS.register(ArcElement, Tooltip, Legend,
    Tooltip,
    Filler,
    Legend);

export default function DoughnutChart(){
  const [notHired, setNotHired] = useState()
  const [hired, setHired] = useState()

  const getData = async () => {
    try {  
        const res = await axios.get('/api/profile');
        const profile = res.data
        setNotHired(profile.filter(x => x.isHired === false).length)
        setHired(profile.filter(x => x.isHired === true).length);
    } catch (err) {
      console.log("[collections_GET]", err);
    }
  };

  useEffect(() => {
      getData();
  }, []);

  const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
      },
    };
    
  const labels = ['Sudah Dapat Job', 'Belum Dapat Job'];
  
  const data = {
    labels,
    datasets: [
        {
            label: 'Jumlah Siswa',
            data: [hired, notHired],
            backgroundColor: [
              'rgb(138, 196, 68)',
              'rgb(0, 68, 33)'
            ],
            borderColor: 'rgba(84, 175, 189, 1)',
            borderWidth: 1,
          }
    ],
  };

  return(
      <TitleCard title={"Data Job Siswa"}>
        <Doughnut options={options} data={data} />
      </TitleCard>
  )
}
  
  