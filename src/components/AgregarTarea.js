import React, { useState } from 'react'
import {Container, Form,Col,Row,Button,Modal} from "react-bootstrap"
import firebaseApp from '../credenciales';
import {getFirestore,updateDoc,doc } from "firebase/firestore"
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export default function AgregarTarea({arrayTareas,correoUsuario, setArrayTareas}) {
    
    let urlDescarga;
    async function añadirTarea(e){
        e.preventDefault();
        const descripcion = e.target.formDescripcion.value;
        //crear nuevo array de tareas
        const nvoArrayTareas =[
            ...arrayTareas,
            {
                id: +new Date(),
                descripcion: descripcion,
                url: urlDescarga}]
        //actualizar la base de datos

        const docuRef = doc(firestore, `usuarios/${correoUsuario}`);
        await updateDoc(docuRef,{tareas: [...nvoArrayTareas]});
        //actualizar estado
        setArrayTareas(nvoArrayTareas);
        //limpiar form
        e.target.formDescripcion.value="";
    }
    async function fileHandler(e){
        //detectar archivo
        const archivoLocal= e.target.files[0];
        //cargarlo a firebase storage
        const archivoRef = ref(storage, `documentos/${archivoLocal.name}`)
        await uploadBytes(archivoRef,archivoLocal);
        //obtener url de descarga
        urlDescarga = await getDownloadURL(archivoRef);

    }
  return (
   <Container>
    
    <Form onSubmit={añadirTarea}>
        <Row className='mb-5'>
            <Col>
                <Form.Control 
                    type='text' 
                    placeholder='Describe tu tarea' 
                    id="formDescripcion"
                />
            </Col>
            <Col>
                <Form.Control 
                    type='file' 
                    placeholder='Añade archivo' 
                    onChange={fileHandler}
                />
                </Col>
            <Col>
            <Button type="submit">Agregar Tarea</Button>
            </Col>
        </Row>

    </Form>
    <hr />
   </Container>
  )
}
