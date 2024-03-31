import {
    Chart as ChartJS,
    Filler,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Doughnut } from 'react-chartjs-2';
  import TitleCard from '@/components/ui/Cards/TitleCards';
  import Subtitle from '@/components/ui/Typography/Subtitle';

  ChartJS.register(ArcElement, Tooltip, Legend,
      Tooltip,
      Filler,
      Legend);
  
  function DoughnutChart(){
  
      const options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        };
        
        const labels = ['Training', 'Worked'];
        
        const data = {
          labels,
          datasets: [
              {
                  label: '# of Orders',
                  data: [245, 500],
                  backgroundColor: [
                    'rgba(36, 59, 80, 0.8)',
                    'rgba(84, 175, 189, 0.8)',
                  ],
                  borderColor: [
                    'rgba(36, 59, 80, 1)',
                    'rgba(84, 175, 189, 1)',
                  ],
                  borderWidth: 1,
                }
          ],
        };
  
      return(
          <TitleCard title={"Student Status"}>
                  <Doughnut options={options} data={data} />
          </TitleCard>
      )
  }
  
  
  export default DoughnutChart