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
var beneficios = [0,55,34,54,57,48,45,48,48,75,95,12];
var maleficios = [45,48,48,75,95,12,20,55,20,54,57,48];
var meses =["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];

var midata={
    labels: meses,
    datasets:[
        {
            label:"Beneficios",
            data: beneficios,
            tension: 0.5,
            fill: true,
            //borderColor:'rgb(55,99,132)',
            backgroundColor:'blue',
            //pointRadius:5,
            //pointBorderColor: 'rgb(255,99,132',
            //pointBackgroundColor:'rgb(255,99,132)'
        },
        {
            label:"Maleficios",
            data: maleficios,
            tension: 0.5,
            fill: true,
            backgroundColor:'red',
        }
    ]
}
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

export default function BarsChart({arrayFechas,arrayAsistencias,arrayOfrendas}){

    function dataBar(){
        var fechas=[];
        var asistencias=[];
        var ofrendas=[];
        var midata={
            labels: fechas,
            datasets:[
                {
                    label:"Asistencias",
                    data: asistencias,
                    tension: 0.5,
                    fill: true,
                    backgroundColor:'blue',
                },
                {
                    label:"Ofrendas",
                    data: ofrendas,
                    tension: 0.5,
                    fill: true,
                    backgroundColor:'red',
                }
            ]
        }
        return midata;
    }

    // return <Bar data={midata} options={misoptions} />
    return <Bar data={
        {
            labels: arrayFechas,
            datasets:[
                {
                    label:"Asistencias",
                    data: arrayAsistencias,
                    tension: 0.5,
                    fill: true,
                    backgroundColor:'blue',
                },
                {
                    label:"Ofrendas",
                    data: arrayOfrendas,
                    tension: 0.5,
                    fill: true,
                    backgroundColor:'red',
                }
            ] 
        }
    
    
    } options={misoptions} />
}