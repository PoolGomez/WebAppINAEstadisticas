import React,{useState} from 'react'
import { Button, Container, Form, Modal } from 'react-bootstrap'
import { getFirestore,doc, setDoc, deleteDoc } from 'firebase/firestore';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Importa las clases CSS de Bootstrap Icons
import firebaseApp from '../credenciales';
import ButtonDelete from './ButtonDelete';
const firestore = getFirestore(firebaseApp);


export default function EditarServicio({servicio,onDelete}) {
    const [show, setShow] = useState(false);
    const handleClose =()=> setShow(false);
    const handleShow =()=> setShow(true);

    // Estado para gestionar los datos editables
    const [datosEditables, setDatosEditables]=useState({
        //id:doc.id, 
        // boleta:             servicio.boleta,
        // fecha:              servicio.fecha,
        // congregacion:       servicio.congregacion,
        // miembros:           servicio.miembros,
        // invitados:          servicio.invitados,
        // asistencia:         servicio.asistencia,
        // ofrenda:            servicio.ofrenda,
        // oficiante:          servicio.oficiante,
        // escuelaDominical:   servicio.escuelaDominical,
        // observacion:        servicio.observacion,
        // mes:                servicio.mes,
    })
    // Manejar cambios en los campos editables
    const handleInputChange=(e)=>{
        const {name,value} =e.target;
        setDatosEditables({
            ...datosEditables,
            [name]:value,
        });
    };
    // Manejar la actualización de los datos (puedes usar esta función para enviar los datos actualizados al servidor)
    const handleActualizar = () => {
        // Aquí puedes enviar los datos actualizados al servidor o realizar otras acciones necesarias
        console.log("Datos actualizados:", datosEditables);
    };
    async function editServicio(e){
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
        const mes = fechaDate.toLocaleDateString('es-ES', { month: 'long' });

        const documentoRef = doc(firestore,'servicios',datosEditables.id);

        await setDoc(documentoRef,{
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
        })
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
    function clickEditar(){
      // console.log(servicio.fecha);
        setDatosEditables({
            id:                 servicio.id, 
            boleta:             servicio.boleta,
            fecha:              servicio.fecha,
            congregacion:       servicio.congregacion,
            miembros:           servicio.miembros,
            invitados:          servicio.invitados,
            asistencia:         servicio.asistencia,
            ofrenda:            servicio.ofrenda,
            oficiante:          servicio.oficiante,
            escuelaDominical:   servicio.escuelaDominical,
            observacion:        servicio.observacion,
            mes:                servicio.mes,
        })
        handleShow();
    }
    async function eliminarServicio(idServicioAEliminar){
      // const nvoArrayServicios = arrayServicios.filter(
      //     (objetoServicio) =>objetoServicio.id !== idServicioAEliminar
      // );
      await deleteDoc(doc(firestore, "servicios",idServicioAEliminar));
      // setArrayServicios(nvoArrayServicios);
  }

  return (
    <>
    {/* <Container> */}
        {/* <Button variant='warning' onClick={clickEdiar}><i className="bi bi-pencil"></i>Editar</Button> */}
        {/* <Button variant='warning' onClick={clickEditar}><i className="bi bi-pencil-square"></i></Button> */}
        {/* <i className="bi bi-pencil-square" onClick={clickEditar} style={{color: 'orange'}}></i> */}
        <div className='d-flex justify-content-between' >
            {/* <img
                src='https://mdbootstrap.com/img/new/avatars/8.jpg'
                alt=''
                style={{ width: '45px', height: '45px' }}
                className='rounded-circle'
            /> */}
            <div className='d-flex justify-content-between align-items-start'  style={{cursor: 'pointer'}} onClick={clickEditar}>
                <div className='ms-3'>
                  <p className='fw-bold mb-1'>{servicio.boleta} </p>
                  <p className='text-muted mb-0'><i className="bi bi-calendar3"> {servicio.fechaFormat}</i></p>
                </div>
            {/* </div>
            <div className='d-flex justify-content-between align-items-center'> */}
                <div className='ms-5'>
                  <p className='fw-bold mb-1'>{servicio.congregacion}</p>
                  <p className='text-muted mb-0'><i className="bi bi-people"> {servicio.asistencia}</i>  <i className="bi bi-currency-dollar"> {servicio.ofrenda}</i></p>
                </div>
            </div>
            <div className='d-flex justify-content-between align-items-end'>
              
              <div className='ms-3'>

                <ButtonDelete onDelete={()=>eliminarServicio(servicio.id)}/>
              </div>
            </div>
        </div>




        <Modal show={show} onHide={handleClose} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>EditarServicio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={editServicio}>
              <Form.Label>Nro Boleta</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="ingrese numero de boleta"
                  id="formNroBoleta"
                  name="boleta"
                  value={datosEditables.boleta}
                  onChange={handleInputChange}
                  disabled
                  autoFocus
                />
              <Form.Label>Fecha</Form.Label>
                <Form.Control
                  type="date"
                  id="formFecha"
                  name="fecha"
                  value={datosEditables.fecha}
                  onChange={handleInputChange}
                  required
                />
              <Form.Label>Congregacion</Form.Label>
              <Form.Select aria-label="Default select example" id="formCongregacion" name="congregacion" value={datosEditables.congregacion} onChange={handleInputChange} required >
                <option value="">Seleccione</option>
                <option value="Canto Grande">Canto Grande</option>
                <option value="Huanta">Huanta</option>
              </Form.Select>
              <Form.Label>Miembros(Adultos + Niños)</Form.Label>
              <Form.Control
                type="number"
                placeholder="ingrese numero de miembros"
                id="formMiembros"
                name="miembros"
                value={datosEditables.miembros}
                onChange={handleInputChange}
                required
                
              />
              <Form.Label>Invitados(No Sellados)</Form.Label>
              <Form.Control
                type="number"
                placeholder="ingrese numero de invitados"
                id="formInvitados"
                name="invitados"
                value={datosEditables.invitados}
                onChange={handleInputChange}
              />
              <Form.Label>Ofrenda</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="ingrese ofrenda"
                id="formOfrenda"
                name="ofrenda"
                value={datosEditables.ofrenda}
                onChange={handleInputChange}
                required
              />
              <Form.Label>Oficiante</Form.Label>
              <Form.Select aria-label="Default select example" id="formOficiante" name="oficiante" value={datosEditables.oficiante} onChange={handleInputChange} required>
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
                name="escuelaDominical"
                value={datosEditables.escuelaDominical}
                onChange={handleInputChange}
                required
              />
              <Form.Label>Observacion</Form.Label>
              <Form.Control as="textarea" rows={3} id="formObservacion" name="observacion" value={datosEditables.observacion} onChange={handleInputChange}/>
            {/* <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button> */}
          <hr/>
          <Button type='submit'>Guardar</Button>
          </Form>
            </Modal.Body>
        </Modal>
    {/* </Container> */}
    </>
  )
}
