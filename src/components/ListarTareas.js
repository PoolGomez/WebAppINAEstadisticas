import React from 'react'
import { Col, Container, Row, Stack,Button } from 'react-bootstrap'
import firebaseApp from '../credenciales';
import {getFirestore,updateDoc,doc} from "firebase/firestore"
const firestore = getFirestore(firebaseApp);

export default function ListarTareas({arrayTareas,correoUsuario, setArrayTareas}) {
    async function eliminarTarea(idTareaAEliminar){
        //crear nuevo arrray de tareas
        const nvoArrayTareas = arrayTareas.filter(
            (objetoTarea) =>objetoTarea.id !== idTareaAEliminar
        );
        //actualizar base de datos
        const docuRef=doc(firestore,`usuarios/${correoUsuario}`);
        updateDoc(docuRef, {tareas:[...nvoArrayTareas]});
        //actualizar state
        setArrayTareas(nvoArrayTareas);
    }

  return (
    <Container>
        <Stack>
            {arrayTareas.map((objetoTarea)=>{
                return(
                    <>
                    <Row>
                        <Col>{objetoTarea.descripcion}</Col>
                        <Col>
                            <a href={objetoTarea.url}>
                                <Button variant="secondary" >Ver archivo</Button>
                            </a>
                        </Col>
                        <Col>
                            <Button 
                                variant="danger"
                                onClick={()=>eliminarTarea(objetoTarea.id)}
                            >
                                Eliminar tarea
                            </Button>
                        </Col>
                    </Row>
                    <hr/>
                    </>
                );
            })}
        </Stack>
    </Container>
  )
}
