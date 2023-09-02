import React from 'react'
import {Line} from "react-chartjs-2"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from "chart.js"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

var misoptions={
    responsive:true,
    //animation:true,
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


export default function LinesChartAsistenciasGeneral({arrayFechas,arrayAsistencias}) {
    
    return <Line 
    data={{
            labels: arrayFechas,
            datasets:[
                        {
                            label:"Asistencias",
                            data: arrayAsistencias,
                            tension: 0.5,
                            fill: true,
                            borderColor:'rgb(55,99,132)',
                            backgroundColor: 'rgb(51,153,255,0.5)', //'rgb(255,99,132,0.5)',
                            pointRadius:5,
                            //pointBorderColor: 'rgb(255,99,132)',
                            //pointBorderColor: 'blue',
                            pointBackgroundColor:'blue'
                        },
                        // {
                        //     label:"Huanta",
                        //     data: arrayAsistenciasHuanta,
                        //     tension: 0.5,
                        //     fill: true,
                        //     borderColor:'rgb(55,99,132)',
                        //     backgroundColor: 'orange', //'rgb(51,153,255,0.5)',
                        //     pointRadius:5,
                        //     //pointBorderColor: 'rgb(255,99,132)',
                        //     //pointBorderColor: 'blue',
                        //     pointBackgroundColor:'blue'
                        // }

                    ]
            }} 
    options={misoptions} />
}
