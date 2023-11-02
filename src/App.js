import './App.css';
import Cliente from './componentes/Cliente';
import Cuenta from './componentes/Cuenta';
import Transaccion from './componentes/Transaccion';
import GraficoConsunmo from './componentes/GraficoConsunmo';

function App() {
  return (
    <div className="App">
     
        <Cliente/>
       <Cuenta/>
       <Transaccion/>
       <GraficoConsunmo/>
    </div>
  );
}

export default App;
