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

export default function LinesChartOfrendasGeneral({arrayFechas,arrayOfrendas}) {
    return <Line 
    data={{
            labels: arrayFechas,
            datasets:[
                        {
                            label:"Ofrendas",
                            data: arrayOfrendas,
                            tension: 0.5,
                            fill: true,
                            borderColor:'rgb(55,99,132)',
                            backgroundColor: 'rgb(51,153,255,0.5)',
                            pointRadius:5,
                            pointBackgroundColor:'blue'
                        },

                    ]
            }} 
    options={misoptions} />
}
