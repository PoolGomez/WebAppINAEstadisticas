import React,{useState,useEffect} from "react";
import Home from "./components/Home";
import Logueo from "./components/Logueo";
import Servicios from "./components/Servicios";

import firebaseApp from "./credenciales";
import {getAuth, onAuthStateChanged} from "firebase/auth";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Estadisticas from "./components/Estadisticas";

const auth = getAuth(firebaseApp);

function App() {

  const [usuarioGlobal, setUsuarioGlobal] = useState(null);
  onAuthStateChanged(auth,(usuarioFirebase)=>{
    if(usuarioFirebase){
      //codigo en caso de haya sesion iniciada
      setUsuarioGlobal(usuarioFirebase);
    }else{
      //codigo en caso de que no haya sesiuon iniciada
      setUsuarioGlobal(null);
    }
  })

  return (
    <Router>
      <Routes>
        <Route 
          exact path="/" 
          element={usuarioGlobal ? <Home correoUsuario={usuarioGlobal.email} /> : <Logueo />} />
        <Route path="/login" element={<Logueo />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
      </Routes>
    </Router>

  // <>
  // <Home 
  // //correoUsuario={usuarioGlobal.email} 
  // />
  // </>
  // // <>
  // // {usuarioGlobal ? <Home correoUsuario={usuarioGlobal.email} /> : <Logueo />}
  // // </>
  );
}

export default App;
