import './App.css';
import Cliente from './componentes/Cliente';
import Cuenta from './componentes/Cuenta';
import Transaccion from './componentes/Transaccion';
import GraficoDepositos from './componentes/GraficoDepositos';
import GraficoRetiros from './componentes/GraficoRetiros';

function App() {
  return (
    <div className="App">
     
        <Cliente/>
       <Cuenta/>
       <Transaccion/>
       <GraficoDepositos/>
       <GraficoRetiros/>
    </div>
  );
}

export default App;
