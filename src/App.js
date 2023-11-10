import React from 'react';
import './App.css';
import Cliente from './componentes/Cliente';
import Cuenta from './componentes/Cuenta';
import Transaccion from './componentes/Transaccion';
import GraficoDepositos from './componentes/GraficoDepositos';
import GraficoRetiros from './componentes/GraficoRetiros';
import Navbar from './componentes/Navbar';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

function App() {  
  return (
    <Router>
    <Navbar />
    <Routes>
      <Route path="/Cliente" element={<Cliente />} />
      <Route path="/Cuenta" element={<Cuenta />} />
      <Route path="/Transaccion" element={<Transaccion />} />
      <Route path="/GraficoDepositos" element={<GraficoDepositos />} />
      <Route path="/GraficoRetiros" element={<GraficoRetiros />} />
    </Routes>
  </Router>
);
}

export default App;
