import React,{useState,useEffect} from 'react';
import firebaseApp from '../credenciales';
import { getAuth,signOut } from 'firebase/auth';
import {getFirestore, doc, getDoc,setDoc, collection, onSnapshot, query, where,orderBy} from "firebase/firestore";
import {Container,Button, Stack, InputGroup,Form} from "react-bootstrap";
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

import AgregarServicio from './AgregarServicio';
import ListarServicios from './ListarServicios';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

export default function Home({correoUsuario}) {
  const[arrayServicios,setArrayServicios] =useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  //datos generales acumulados por meses
  // const[arrayFechas, setArrayFechas] =useState([]);
  // const[arrayAsistencias, setArrayAsistencias] =useState([]);
  // const[arrayOfrendas, setArrayOfrendas]=useState([]);

  //asistencias por congregacion
  // const[arrayAsistenciasCtoGrande, setArrayAsistenciasCtoGrande] =useState([]);
  // const[arrayAsistenciasHuanta, setArrayAsistenciasHuanta] =useState([]);

  //ofrendas por congregacion
  // const[arrayOfrendasCtoGrande, setArrayOfrendasCtoGrande] =useState([]);
  // const[arrayOfrendasHuanta, setArrayOfrendasHuanta] =useState([]);
  
  async function buscarServicios(){
    //const querySnapshot = await getDocs(collection(firestore,"servicios"));
    const q =query(collection(firestore,"servicios"), where("fecha","!=",""),orderBy('fecha','desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot)=>{
      const datos=[];
      querySnapshot.forEach((doc)=>{

        datos.push(
          {
            id:doc.id, 
            boleta:doc.data().boleta,
            fecha: doc.data().fecha,
            fechaFormat: format(new Date(doc.data().fecha+"T00:00:00"),'dd/MM/yyyy'),
            congregacion:doc.data().congregacion,
            miembros:doc.data().miembros,
            invitados:doc.data().invitados,
            asistencia: doc.data().asistencia,
            ofrenda: doc.data().ofrenda,
            oficiante: doc.data().oficiante,
            escuelaDominical: doc.data().escuelaDominical,
            observacion: doc.data().observacion,
            mes:doc.data().mes,
          })
      })
      setArrayServicios(datos);
      // datosEstadisticosGenerales(datos);
      // datosAsistenciasxCongregacion(datos);
    })
  }
  // function datosEstadisticosGenerales(dataArray){
  //   const aFechas=[];
  //   const aAsistencias=[];
  //   const aOfrendas=[];
  //   const DatosPorMes={};
  //   dataArray.forEach((fila)=>{
  //       const mes = fila.mes;
  //       if (!DatosPorMes[mes]) {
  //         DatosPorMes[mes] = {
  //           mes: mes,
  //           ofrenda: 0,
  //           asistencia:0,
  //           oficiantes:0,
  //         };
  //       }
  //       DatosPorMes[mes].ofrenda += parseFloat(fila.ofrenda);
  //       DatosPorMes[mes].asistencia += parseInt(fila.asistencia);
  //       // DatosPorMes[mes].oficiantes += 1;
  //   })
  //   const datosFinales = Object.values(DatosPorMes);
  //   datosFinales.forEach((fila)=>{
  //     aFechas.push(fila.mes);
  //     aOfrendas.push(fila.ofrenda);
  //     aAsistencias.push(fila.asistencia);
  //     // aOficiantes.push(fila.oficiante);
  //   })
  //   setArrayFechas(aFechas);
  //   setArrayAsistencias(aAsistencias);
  //   setArrayOfrendas(aOfrendas);
  //   // setArrayOficiantes(aOficiantes);
  // }
  
  // function datosAsistenciasxCongregacion(dataArray){
  //   const aFechas=[];
  //   const aAsistenciasCantoGrande=[];
  //   const aAsistenciasHuanta=[];
  //   const aOfrendasCantoGrande=[];
  //   const aOfrendasHuanta=[];
  //   const DatosPorMes={};
  //   dataArray.forEach((fila)=>{
  //       const mes = fila.mes;
  //       if (!DatosPorMes[mes]) {
  //         DatosPorMes[mes] = {
  //           mes: mes,
  //           actogrande: 0,
  //           ahuanta:0,
  //           octogrande:0,
  //           ohuanta:0
  //         };
  //       }
        
  //       DatosPorMes[mes].actogrande +=  fila.congregacion ==="Canto Grande 9" ? parseInt(fila.asistencia) : 0;
  //       DatosPorMes[mes].ahuanta += fila.congregacion ==="Huanta" ? parseInt(fila.asistencia) : 0;
  //       DatosPorMes[mes].octogrande+= fila.congregacion ==="Canto Grande 9" ? parseFloat(fila.ofrenda):0;
  //       DatosPorMes[mes].ohuanta+= fila.congregacion ==="Huanta"? parseFloat(fila.ofrenda):0;
  //   })
  //   const datosFinales = Object.values(DatosPorMes);
  //   datosFinales.forEach((fila)=>{
  //     aFechas.push(fila.mes);
  //     aAsistenciasCantoGrande.push(fila.actogrande);
  //     aAsistenciasHuanta.push(fila.ahuanta);
  //     aOfrendasCantoGrande.push(fila.octogrande);
  //     aOfrendasHuanta.push(fila.ohuanta);
  //   })

  //   setArrayFechas(aFechas);
  //   setArrayAsistenciasCtoGrande(aAsistenciasCantoGrande);
  //   setArrayAsistenciasHuanta(aAsistenciasHuanta);
  //   setArrayOfrendasCtoGrande(aOfrendasCantoGrande);
  //   setArrayOfrendasHuanta(aOfrendasHuanta);
  // }
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = arrayServicios  && arrayServicios.filter((record) =>
    //filtra por un solo campo
    //record.congregacion.toLowerCase().includes(searchTerm.toLowerCase())

    //filtra por campos especificos
    record.congregacion.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.boleta.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.fechaFormat.toLowerCase().includes(searchTerm.toLowerCase())

    //filtrar por todos los campos
    // Object.values(record).some((value)=>
    //   value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    // )
      
  );

  useEffect(()=>{
    async function fetchServicios(){
      await buscarServicios();
    };
    fetchServicios();
  },[])

  


  return (
    <Container style={{padding:"15px"}}>
      <Stack>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h4 style={{ flex: 1 }}>Bienvenido, {correoUsuario}</h4>
        <Button variant="warning" style={{ alignSelf: 'flex-end' }} onClick={()=>signOut(auth)}>Cerrar Sesion</Button>
      </div>
      
      <hr/>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <AgregarServicio 
          arrayServicios={arrayServicios} 
          setArrayServicios={setArrayServicios}
          correoUsuario={correoUsuario}
        />
        <Link to="/estadisticas">
          <Button>Estadisticas</Button>
        </Link>
      </div>
      <hr/>
      {/* <input value={searchTerm} onChange={handleSearch} placeholder='buscar...' ></input> */}
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1"><i className="bi bi-search"></i></InputGroup.Text>
        <Form.Control
          placeholder="Buscar..."
          aria-label="Search"
          aria-describedby="basic-addon1"
          value={searchTerm}
          onChange={handleSearch}
        />
      </InputGroup>
      
      { arrayServicios ? 
      <ListarServicios
        arrayServicios={filteredData}
        // arrayServicios={arrayServicios} 
        setArrayServicios={setArrayServicios}
        correoUsuario={correoUsuario}
      /> :
        "No hay ningun registro"
      }
      
      
      
      </Stack>
    </Container>
  )
}
