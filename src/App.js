import React from 'react';
import './App.css';
import Cliente from './componentes/Cliente';
import Cuenta from './componentes/Cuenta';
import Transaccion from './componentes/Transaccion';
import GraficoDepositos from './componentes/GraficoDepositos';
import GraficoRetiros from './componentes/GraficoRetiros';
import HistorialTransacciones from './componentes/HistorialTransacciones';
import HomePage from './componentes/HomePage';

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
      <Route path="/HistorialTransacciones" element={<HistorialTransacciones />} />
      <Route path="/HomePage" element={<HomePage/>} />
    </Routes>
  </Router>
);
}

export default App;
