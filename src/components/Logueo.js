import React,{useState,useCallback } from 'react';
import { Stack, Container, Form, Button} from "react-bootstrap";
import firebaseApp from "../credenciales";
import {
    getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,
    signInWithRedirect,GoogleAuthProvider
} from "firebase/auth";
import { Link,useHistory } from 'react-router-dom'; 
import Servicios from './Servicios';

const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
export default function Logueo() {

    const[estaRegistrandose, setEstaRegistrandose] = useState(false);

    async function submitHandler(e){
        e.preventDefault();
        const correo= e.target.formBasicEmail.value;
        const pass= e.target.formBasicPassword.value;
        try {
            // console.log(correo, pass);
            if(estaRegistrandose){
                //si se registra
                const usuario = await createUserWithEmailAndPassword(auth,correo,pass);
            }else{
                //si esta iniciando sesion
                try {
                    signInWithEmailAndPassword(auth,correo,pass).catch((error)=>{
                        console.log(error.code);
                        console.log(error.message);
                        alert("Usuario y/o contraseña invalidas");
                    });  
                } catch (error) {
                    console.log('error en login: '+error);
                }
                
            }
        } catch (error) {
            console.log('error en: '+error);
        }
        
        
        
        
    }
  return (
    <Container>
        <Stack gap={3}>
            {/* <h1>{estaRegistrandose ? "Registrate" : "iniciar sesion"}</h1> */}
            <h1>Iniciar sesion</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Correo Electronico:</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Constraseña:</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Button variant="dark" type="submit">
                {/* {estaRegistrandose ? "Registrate" : "iniciar sesion"} */}
                iniciar sesion
            </Button>
            
            
            </Form>
            {/* <Button variant="primary" type="submit" onClick={()=>signInWithRedirect(auth, googleProvider)}>
                Acceder con Google
            </Button> */}
            {/* <Link to="/">
                <Button variant="danger" type="button">
                    Volver
                </Button>
            </Link> */}
            {/* <Button variant="primary" onClick={()=>setEstaRegistrandose(!estaRegistrandose)}>
                {estaRegistrandose ? "¿Ya tienes cuenta? Inicia sesion" : "¿No tienes cuenta? Registrate"}
            </Button> */}
            <Link to="/estadisticas">
                <Button>Volver a Estadisticas</Button>
            </Link>
        </Stack>
    </Container>
  )
}
