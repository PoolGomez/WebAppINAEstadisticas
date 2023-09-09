import React from 'react'
import {Bar} from "react-chartjs-2"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

var misoptions={
    responsive:true,
    // animation:false,
    maintainAspectRatio: false,
    scales:{
        y:{
            min:0
        },
        x:{
            ticks:{color:'black'}
        }
    },
    plugins:{
        legend:{
            display:true,
        }
    }
}

export default function BarsChartAsistenciasCongregacion({arrayFechas,arrayAsistenciasCtoGrande,arrayAsistenciasHuanta}) {


    return <Bar data={
        {
            labels: arrayFechas,
            datasets:[
                {
                    label:"Canto Grande",
                    data: arrayAsistenciasCtoGrande,
                    tension: 0.5,
                    fill: true,
                    backgroundColor:'blue',
                },
                {
                    label:"Huanta",
                    data: arrayAsistenciasHuanta,
                    tension: 0.5,
                    fill: true,
                    backgroundColor:'red',
                }
            ] 
        }
    
    
    } options={misoptions} />
}
