import React, { useState } from 'react'
import {Container, Form,Col,Row,Button,Modal} from "react-bootstrap"
import firebaseApp from '../credenciales';
import {getFirestore,updateDoc,doc,addDoc ,collection,getDocs} from "firebase/firestore"
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage"
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export default function AgregarServicio({arrayServicios,correoUsuario, setArrayServicios}) {
  
    const [show, setShow] = useState(false);
    const handleClose =()=> setShow(false);
    const handleShow =()=> setShow(true);

    async function addServicio(e){
      e.preventDefault();
      
      const boleta = e.target.formNroBoleta.value;
      const fecha = e.target.formFecha.value;
      const congregacion = e.target.formCongregacion.value;
      const miembros = e.target.formMiembros.value;
      const invitados = e.target.formInvitados.value;
      const ofrenda = e.target.formOfrenda.value;
      const oficiante = e.target.formOficiante.value;
      const escueladom = e.target.formEscuelaDominical.value;
      const observacion = e.target.formObservacion.value;

      const fechaDate = new Date(fecha+"T00:00:00");
      console.log("fechaDate: ",fechaDate);
      const mes = fechaDate.toLocaleDateString('es-ES', { month: 'long' });
      console.log("nombremes: ",mes);
      const docRef = await addDoc(collection(firestore,"servicios"),{
        boleta: boleta,
        fecha: fecha,
        mes: mes,
        congregacion:congregacion,
        miembros: parseInt(miembros),
        invitados: parseInt(invitados),
        asistencia: parseInt(parseInt(miembros) + parseInt(invitados)),
        ofrenda: parseFloat(ofrenda),
        oficiante: oficiante,
        escuelaDominical: parseInt(escueladom),
        observacion: observacion
      });
      
      const querySnapshot = await getDocs(collection(firestore,"servicios"));
      const arrayServicios=[];
      querySnapshot.forEach((doc)=>{
        arrayServicios.push(doc.data());
      })
      setArrayServicios(arrayServicios);

      e.target.formNroBoleta.value="";
      e.target.formFecha.value="";
      e.target.formCongregacion.value="Ninguno"
      e.target.formMiembros.value="";
      e.target.formInvitados.value="";
      e.target.formOfrenda.value="";
      e.target.formOficiante.value="Ninguno";
      e.target.formEscuelaDominical.value="";
      e.target.formObservacion.value="";

      handleClose();

    }
    
  return (
   <Container>
    <Button variant='primary' onClick={handleShow}>Agregar Servicio</Button>
    <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Agregar Servicio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={addServicio}>
              <Form.Label>Nro Boleta</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="ingrese numero de boleta"
                  id="formNroBoleta"
                  required
                  autoFocus
                />
              <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  id="formFecha"
                  required
                />
              <Form.Label>Congregacion</Form.Label>
              <Form.Select aria-label="Default select example" id="formCongregacion" required>
                <option value="">Seleccione</option>
                <option value="Canto Grande 9">Canto Grande 9</option>
                <option value="Huanta">Huanta</option>
              </Form.Select>
              <Form.Label>Miembros(Adultos + Niños)</Form.Label>
              <Form.Control
                type="number"
                placeholder="ingrese numero de miembros"
                id="formMiembros"
                required
                
              />
              <Form.Label>Invitados(No Sellados)</Form.Label>
              <Form.Control
                type="number"
                placeholder="ingrese numero de invitados"
                id="formInvitados"
              />
              <Form.Label>Ofrenda</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="ingrese ofrenda"
                id="formOfrenda"
                required
              />
              <Form.Label>Oficiante</Form.Label>
              <Form.Select aria-label="Default select example" id="formOficiante" required>
                <option value="">Seleccione</option>
                <option value="Dc. Gonzales Olvider">Dc. Gonzales Olvider</option>
                <option value="Ev. Enrique Jhonny">Ev. Enrique Jhonny</option>
                <option value="Evd. De la Cruz Jesus">Evd. De la Cruz Jesus</option>
                <option value="Pr. Apayco Edilberto">Pr. Apayco Edilberto</option>
                <option value="Pr. Freyre Felix">Pr. Freyre Felix</option>
                <option value="Pr. Gomez Miguel">Pr. Gomez Miguel</option>
                <option value="Pr. Gomez Pool">Pr. Gomez Pool</option>
                <option value="Pr. Gonzales Delfin">Pr. Gonzales Delfin</option>
                <option value="Pr. Gonzales William">Pr. Gonzales William</option>
                <option value="Pr. Pastor Valentin">Pr. Pastor Valentin</option>
              </Form.Select>
              <Form.Label>Asistencia Escuela Dominical</Form.Label>
              <Form.Control
                type="number"
                placeholder="Ingrese cantidad de niños"
                id="formEscuelaDominical"
                required
              />
              <Form.Label>Observacion</Form.Label>
              <Form.Control as="textarea" rows={3} id="formObservacion" />
            {/* <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button> */}
          <hr/>
          <Button type='submit'>Guardar</Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
    </Modal>

    <hr />
   </Container>
  )
}
