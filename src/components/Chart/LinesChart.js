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
import { useEffect } from "react";

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
var asistencias = [10,55,20,54,57,48,45,48,48,75,95,12];
var ofrendas = [45,48,48,75,95,12,20,55,20,54,57,48];
var meses =["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

var midata={
    labels: meses,
    datasets:[
        {
            label:"Asistencia",
            data: asistencias,
            tension: 0.5,
            fill: true,
            borderColor:'rgb(55,99,132)',
            backgroundColor: 'rgb(51,153,255,0.5)', //'rgb(255,99,132,0.5)',
            pointRadius:5,
            //pointBorderColor: 'rgb(255,99,132)',
            //pointBorderColor: 'blue',
            pointBackgroundColor:'blue'
        },
        {
            label:"Ofrenda",
            data: ofrendas,
            tension: 0.5,
            fill: true,
            borderColor:'rgb(55,99,132)',
            backgroundColor: 'orange', //'rgb(51,153,255,0.5)',
            pointRadius:5,
            //pointBorderColor: 'rgb(255,99,132)',
            //pointBorderColor: 'blue',
            pointBackgroundColor:'blue'
        }

    ]
}
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

export default function LinesChart({arrayFechas,arrayAsistencias,arrayOfrendas}){
    // return <Line data={midata} options={misoptions} />
    // useEffect(()=>{
    //     setArrayFechas(arrayFechas);
    //     setArrayAsistencias(arrayAsistencias);
    //     setArrayOfrendas(arrayOfrendas);
    // },[arrayFechas, arrayAsistencias, arrayOfrendas]);
    return <Line 
                data={{
                        labels: arrayFechas,
                        datasets:[
                                    {
                                        label:"Asistencia",
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
                                    {
                                        label:"Ofrenda",
                                        data: arrayOfrendas,
                                        tension: 0.5,
                                        fill: true,
                                        borderColor:'rgb(55,99,132)',
                                        backgroundColor: 'orange', //'rgb(51,153,255,0.5)',
                                        pointRadius:5,
                                        //pointBorderColor: 'rgb(255,99,132)',
                                        //pointBorderColor: 'blue',
                                        pointBackgroundColor:'blue'
                                    }

                                ]
                        }} 
                options={misoptions} />
}