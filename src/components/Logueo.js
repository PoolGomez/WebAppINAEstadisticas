import React,{useState} from 'react';
import { Stack, Container, Form, Button} from "react-bootstrap";
import firebaseApp from "../credenciales";
import {
    getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,
    signInWithRedirect,GoogleAuthProvider
} from "firebase/auth";
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
export default function Logueo() {
    const[estaRegistrandose, setEstaRegistrandose] = useState(false);
    async function submitHandler(e){
        e.preventDefault();
        const correo= e.target.formBasicEmail.value;
        const pass= e.target.formBasicPassword.value;
        console.log(correo, pass);
        if(estaRegistrandose){
            //si se registra
            const usuario = await createUserWithEmailAndPassword(auth,correo,pass);
        }else{
            //si esta iniciando sesion
            signInWithEmailAndPassword(auth,correo,pass);
        }
        
       
        
    }
  return (
    <Container>
        <Stack gap={3}>
            <h1>{estaRegistrandose ? "Registrate" : "iniciar sesion"}</h1>
            <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            
            <Button variant="dark" type="submit">
                {estaRegistrandose ? "Registrate" : "iniciar sesion"}
            </Button>
            </Form>
            {/* <Button variant="primary" type="submit" onClick={()=>signInWithRedirect(auth, googleProvider)}>
                Acceder con Google
            </Button> */}
            <Button variant="primary" onClick={()=>setEstaRegistrandose(!estaRegistrandose)}>
                {estaRegistrandose ? "¿Ya tienes cuenta? Inicia sesion" : "¿No tienes cuenta? Registrate"}
            </Button>
        </Stack>
    </Container>
  )
}
