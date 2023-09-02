import React from 'react'
import { Container, Stack,Table } from 'react-bootstrap'
import firebaseApp from '../credenciales';
import {getFirestore,doc, deleteDoc} from "firebase/firestore"

import ButtonDelete from './ButtonDelete'
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
        <Stack>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Fecha</th>
                        <th>Congregacion</th>
                        <th>Asistencia</th>
                        <th>Ofrenda</th>
                        <th>Observacion</th>
                        <th>Accion</th>
                    </tr>
                </thead>
                <tbody>
                {arrayServicios.map((objetoServicio)=>{
                return(
                    <tr>
                    <td>{objetoServicio.fecha}</td>
                    <td>{objetoServicio.congregacion}</td>
                    <td>{objetoServicio.asistencia}</td>
                    <td>{objetoServicio.ofrenda}</td>
                    <td>{objetoServicio.observacion}</td>
                    <td>
                        <ButtonDelete onDelete={()=>eliminarServicio(objetoServicio.id)} />
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

