import React from 'react'
import { Button, Container, Form, InputGroup, Stack,Table } from 'react-bootstrap'
import firebaseApp from '../credenciales';
import {getFirestore,doc, deleteDoc} from "firebase/firestore"

import ButtonDelete from './ButtonDelete'
import EditarServicio from './EditarServicio';
const firestore = getFirestore(firebaseApp);

export default function ListarServicios({arrayServicios,correoUsuario, setArrayServicios}) {
    
    async function eliminarServicio(idServicioAEliminar){
        const nvoArrayServicios = arrayServicios.filter(
            (objetoServicio) =>objetoServicio.id !== idServicioAEliminar
        );
        await deleteDoc(doc(firestore, "servicios",idServicioAEliminar));
        setArrayServicios(nvoArrayServicios);
    }
  return (
    <Container>
        <InputGroup className="mb-3">
            {/* <InputGroup.Text id="basic-addon1">Buscar</InputGroup.Text> */}
            <Form.Control
                placeholder="Buscar..."
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
        </InputGroup>
        
        <Stack>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Boleta</th>
                        <th>Fecha</th>
                        <th>Congregacion</th>
                        <th>Asistencia</th>
                        <th>Ofrenda</th>
                        {/* <th>Observacion</th> */}
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                {arrayServicios.map((objetoServicio,index)=>{
                return(
                    <tr key={index}>
                        <td>{objetoServicio.boleta}</td>
                        <td>{objetoServicio.fecha}</td>
                        <td>{objetoServicio.congregacion}</td>
                        <td>{objetoServicio.asistencia}</td>
                        <td>{objetoServicio.ofrenda}</td>
                        {/* <td>{objetoServicio.observacion}</td> */}
                        <td>
                            {/* <Container> */}
                            <div style={{ display: 'flex', gap: '10px' }}>
                            <EditarServicio servicio={objetoServicio}/>
                            <ButtonDelete onDelete={()=>eliminarServicio(objetoServicio.id)} />
                            </div>
                            {/* </Container> */}
                        </td>
                        
                    </tr>
                    )
                })
                }
             </tbody>
            </Table>

        </Stack>
    </Container>
  )
}

