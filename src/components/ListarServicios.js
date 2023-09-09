import React, { useState } from 'react'
import { Button, Container, Form, InputGroup, Stack,Table,Badge,ListGroup, ListGroupItem } from 'react-bootstrap'
import firebaseApp from '../credenciales';
import {getFirestore,doc, deleteDoc} from "firebase/firestore"
import { format } from 'date-fns';

import ButtonDelete from './ButtonDelete'
import EditarServicio from './EditarServicio';
const firestore = getFirestore(firebaseApp);

export default function ListarServicios({arrayServicios,correoUsuario, setArrayServicios}) {

    // const [searchTerm, setSearchTerm] = useState('');
    // const [tableData, setTableData]= useState(arrayServicios);

    // const handleSearch=(event)=>{
    //     setSearchTerm(event.target.value);
    // };

    // const filteredData = tableData.filter((record)=>{
    //     record.name.toLowerCase().includes(searchTerm.toLowerCase())
    // });
    
    async function eliminarServicio(idServicioAEliminar){
        const nvoArrayServicios = arrayServicios.filter(
            (objetoServicio) =>objetoServicio.id !== idServicioAEliminar
        );
        await deleteDoc(doc(firestore, "servicios",idServicioAEliminar));
        setArrayServicios(nvoArrayServicios);
    }
  return (
    <>
    {/* <div style={{ display: 'flex'}}>
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>Boleta</th>
                    <th>Fecha</th>
                    <th>Congregacion</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
            {arrayServicios.map((objetoServicio,index)=>{
            return(
                <tr key={index}>
                    <td onClick={prueba}>{objetoServicio.boleta}</td>
                    <td>{objetoServicio.fechaFormat}</td>
                    <td>{objetoServicio.congregacion}</td>
                    <td>
                        <div style={{ display: 'flex', gap: '10px' }}>
                        <EditarServicio servicio={objetoServicio}/>
                        <ButtonDelete onDelete={()=>eliminarServicio(objetoServicio.id)} />
                        </div>
                    </td>
                </tr>
                )
            })
            }
            </tbody>
        </Table>
    </div> */}
    <ListGroup 
    style={{minWidth:'22rem'}} light
    >
    {arrayServicios.map((objetoServicio,index)=>{
        return(
            <ListGroupItem  key={index} 
            // className='d-flex justify-content-between align-items-center'
            >

                {/* <div className='d-flex align-items-center' onClick={prueba} style={{cursor: 'pointer'}}>
                    <img
                        src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                        alt=''
                        style={{ width: '45px', height: '45px' }}
                        className='rounded-circle'
                    />
                    <div className='ms-3'>
                        
                        <p className='fw-bold mb-1'>{objetoServicio.boleta} </p>
                        <p className='text-muted mb-0'><i className="bi bi-calendar3"> {objetoServicio.fechaFormat}</i></p>
                    </div>
                    <div className='ms-3'>
                    <p className='fw-bold mb-1'>{objetoServicio.congregacion}</p>
                        <p className='text-muted mb-0'><i className="bi bi-people"> {objetoServicio.asistencia}</i>  <i className="bi bi-currency-dollar"> {objetoServicio.ofrenda}</i></p>
                    </div>
                </div> */}


                <EditarServicio servicio={objetoServicio}/>
                {/* <ButtonDelete onDelete={()=>eliminarServicio(objetoServicio.id)} /> */}
            </ListGroupItem>
        )
    })}
        
    </ListGroup>
    
    {/* <ListGroup 
            // as="ol" numbered
            >
            {arrayServicios.map((objetoServicio,index)=>{
                return(
            <ListGroup.Item
            key={index}
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <div>
                    <div className="ms-2 me-auto">
                    <div className="fw-bold">{objetoServicio.congregacion} - {objetoServicio.fechaFormat}</div>
                    
                    Boleta Nro: {objetoServicio.boleta}
                    </div>
                    <Badge bg="primary" pill>
                    <i className="bi bi-people"> {objetoServicio.asistencia}</i>
                    
                    </Badge>
                    <Badge bg="secondary" pill>
                    S/. {objetoServicio.ofrenda}
                    </Badge>
                </div>
                <i className="bi bi-trash" style={{color:"red"}}></i>
                
            </ListGroup.Item>
                )
            })}
        </ListGroup> */}
    
    </>
  )
}

