import './App.css';
import Cliente from './componentes/Cliente';
import Cuenta from './componentes/Cuenta';
import Transaccion from './componentes/Transaccion';

function App() {
  return (
    <div className="App">
     
        <Cliente/>
       <Cuenta/>
       <Transaccion/>
    </div>
  );
}

export default App;
