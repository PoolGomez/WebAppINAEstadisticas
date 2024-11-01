import React,{useState,useEffect} from 'react'
import firebaseApp from '../credenciales';
import { getAuth,signOut } from 'firebase/auth';
import {getFirestore, doc, getDoc,setDoc, collection, onSnapshot, query, where,orderBy} from "firebase/firestore";
import {Container,Button} from "react-bootstrap";

import LinesChartAsistenciasGeneral from './Chart/LinesChartAsistenciasGeneral';
import LinesChartOfrendasGeneral from './Chart/LinesChartOfrendasGeneral';
import BarsChartAsistenciasCongregacion from './Chart/BarsChartAsistenciasCongregacion';
import BarsChartOfrendasCongregacion from './Chart/BarsChartOfrendasCongregacion';
// import AgregarServicio from './AgregarServicio';
// import ListarServicios from './ListarServicios';

import { Link } from 'react-router-dom';



const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


export default function Estadisticas() {
  //const[arrayServicios,setArrayServicios] =useState(null);

  //datos generales acumulados por meses
  const[arrayFechas, setArrayFechas] =useState([]);
  const[arrayAsistencias, setArrayAsistencias] =useState([]);
  const[arrayOfrendas, setArrayOfrendas]=useState([]);

  //asistencias por congregacion
  const[arrayAsistenciasCtoGrande, setArrayAsistenciasCtoGrande] =useState([]);
  const[arrayAsistenciasHuanta, setArrayAsistenciasHuanta] =useState([]);

  //ofrendas por congregacion
  const[arrayOfrendasCtoGrande, setArrayOfrendasCtoGrande] =useState([]);
  const[arrayOfrendasHuanta, setArrayOfrendasHuanta] =useState([]);
  
  async function buscarServicios(){
    //const querySnapshot = await getDocs(collection(firestore,"servicios"));
    const q =query(collection(firestore,"servicios"), where("fecha","!=",""),orderBy('fecha'));

    const unsubscribe = onSnapshot(q, (querySnapshot)=>{
      const datos=[];
      querySnapshot.forEach((doc)=>{
        datos.push(
          {
            id:doc.id, 
            fecha: doc.data().fecha,
            congregacion:doc.data().congregacion,
            asistencia: doc.data().asistencia,
            ofrenda: doc.data().ofrenda,
            observacion: doc.data().observacion,
            mes:doc.data().mes,
          })
      })
      //setArrayServicios(datos);
      datosEstadisticosGenerales(datos);
      datosAsistenciasxCongregacion(datos);
    })
  }
  function datosEstadisticosGenerales(dataArray){
    const aFechas=[];
    const aAsistencias=[];
    const aOfrendas=[];
    const DatosPorMes={};
    dataArray.forEach((fila)=>{
        const mes = fila.mes;
        if (!DatosPorMes[mes]) {
          DatosPorMes[mes] = {
            mes: mes,
            ofrenda: 0,
            asistencia:0,
            oficiantes:0,
          };
        }
        DatosPorMes[mes].ofrenda += parseFloat(fila.ofrenda);
        DatosPorMes[mes].asistencia += parseInt(fila.asistencia);
        // DatosPorMes[mes].oficiantes += 1;
    })
    const datosFinales = Object.values(DatosPorMes);
    datosFinales.forEach((fila)=>{
      aFechas.push(fila.mes);
      aOfrendas.push(fila.ofrenda);
      aAsistencias.push(fila.asistencia);
      // aOficiantes.push(fila.oficiante);
    })
    setArrayFechas(aFechas);
    setArrayAsistencias(aAsistencias);
    setArrayOfrendas(aOfrendas);
    // setArrayOficiantes(aOficiantes);
  }
  
  function datosAsistenciasxCongregacion(dataArray){
    const aFechas=[];
    const aAsistenciasCantoGrande=[];
    const aAsistenciasHuanta=[];
    const aOfrendasCantoGrande=[];
    const aOfrendasHuanta=[];
    const DatosPorMes={};
    dataArray.forEach((fila)=>{
        const mes = fila.mes;
        if (!DatosPorMes[mes]) {
          DatosPorMes[mes] = {
            mes: mes,
            actogrande: 0,
            ahuanta:0,
            octogrande:0,
            ohuanta:0
          };
        }
        
        DatosPorMes[mes].actogrande +=  fila.congregacion ==="Canto Grande" ? parseInt(fila.asistencia) : 0;
        DatosPorMes[mes].ahuanta += fila.congregacion ==="Huanta" ? parseInt(fila.asistencia) : 0;
        DatosPorMes[mes].octogrande+= fila.congregacion ==="Canto Grande" ? parseFloat(fila.ofrenda):0;
        DatosPorMes[mes].ohuanta+= fila.congregacion ==="Huanta"? parseFloat(fila.ofrenda):0;
    })
    const datosFinales = Object.values(DatosPorMes);
    datosFinales.forEach((fila)=>{
      aFechas.push(fila.mes);
      aAsistenciasCantoGrande.push(fila.actogrande);
      aAsistenciasHuanta.push(fila.ahuanta);
      aOfrendasCantoGrande.push(fila.octogrande);
      aOfrendasHuanta.push(fila.ohuanta);
    })

    setArrayFechas(aFechas);
    setArrayAsistenciasCtoGrande(aAsistenciasCantoGrande);
    setArrayAsistenciasHuanta(aAsistenciasHuanta);
    setArrayOfrendasCtoGrande(aOfrendasCantoGrande);
    setArrayOfrendasHuanta(aOfrendasHuanta);
  }

  useEffect(()=>{
    async function fetchServicios(){
      const servicios = await buscarServicios();
    };
    fetchServicios();
  },[])

  


  return (
    <Container style={{padding:"15px"}}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* <h4 style={{ flex: 1 }}>Hola, {correoUsuario}</h4> */}
        {/* <Button variant="warning" style={{ alignSelf: 'flex-end' }} onClick={()=>signOut(auth)}>Cerrar Sesion</Button> */}
        
        <Link to="/">
          <Button>Administrar</Button>
        </Link>
      </div>
      
      <hr/>
      {/* <AgregarServicio 
        arrayServicios={arrayServicios} 
        setArrayServicios={setArrayServicios}
        correoUsuario={correoUsuario}
      />
      { arrayServicios ? 
      <ListarServicios
        arrayServicios={arrayServicios} 
        setArrayServicios={setArrayServicios}
        correoUsuario={correoUsuario}
      /> :
        null
      } */}
      
      {/* CODIGO PARA GRAFICAS */}
      <hr/>
      <div>
        <h1 className='bg-info text-center font-monospace fw-bold lh-base'>Asistencias</h1>
        <div>
          <p className='m-2'>Asistencia General</p>
          <div 
            className='bg-light mx-auto px-2 border border-2 border-primary' 
            style={{with:"auto",height:"350px"}}
          >
            <LinesChartAsistenciasGeneral
              arrayFechas={arrayFechas}
              arrayAsistencias={arrayAsistencias}
            />
          </div>
        </div>
        <hr className='mt-3 mb-2'/>
        <div>
          <p className='m-2'>Asistencia por Congregacion</p>
          <div 
            className='bg-light mx-auto px-2 border border-2 border-primary' 
            style={{with:"100%",height:"350px"}}
          >
            <BarsChartAsistenciasCongregacion
              arrayFechas={arrayFechas}
              arrayAsistenciasCtoGrande={arrayAsistenciasCtoGrande}
              arrayAsistenciasHuanta={arrayAsistenciasHuanta}
            />
          </div>
        </div>
        <hr className='mt-3 mb-2'/>
      </div>
      <div>
        <h1 className='bg-info text-center font-monospace fw-bold lh-base'>Ofrendas</h1>
        <div>
        <p className='m-2'>Ofrenda General</p>
        <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{with:"auto",height:"350px"}}>
            <LinesChartOfrendasGeneral
              arrayFechas={arrayFechas}
              arrayOfrendas={arrayOfrendas}
            />
          </div>
        </div>
        <hr className='mt-3 mb-2'/>
        <div>
          <p className='m-2'>Ofrendas por Congregacion</p>
          <div className='bg-light mx-auto px-2 border border-2 border-primary' style={{with:"100%",height:"350px"}}>
            <BarsChartOfrendasCongregacion
              arrayFechas={arrayFechas}
              arrayOfrendasCtoGrande={arrayOfrendasCtoGrande}
              arrayOfrendasHuanta={arrayOfrendasHuanta}
            />
          </div>
        </div>
      </div>
      
    </Container>
  )
}
