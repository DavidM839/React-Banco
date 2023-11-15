import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const url = "http://127.0.0.1:8000/api/transacciones/";
const clientesUrl = "http://127.0.0.1:8000/api/clientes/";

class HistorialTransacciones extends Component {
    state = {
        data: [],
        clientes: [],
        clienteSeleccionado: null
    };

    componentDidMount() {
        this.peticionGet();
        this.peticionClientes();
    }

    peticionGet = () => {
        axios.get(url)
            .then(response => {
                this.setState({ data: response.data });
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    peticionClientes = () => {
        axios.get(clientesUrl)
            .then(response => {
                this.setState({ clientes: response.data });
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    handleClienteChange = (event) => {
        const clienteId = event.target.value;
        this.setState({ clienteSeleccionado: clienteId });
      
        // Actualiza la URL con el ID del cliente seleccionado
        const url = `http://127.0.0.1:8000/api/transacciones/cliente/${clienteId}`;
      
        // Realiza una petición a la API para obtener las transacciones del cliente seleccionado
        axios.get(url)
          .then(response => {
            this.setState({ data: response.data });
          })
          .catch(error => {
            console.log(error.message);
          });
      }
      
    render() {
        const { data, clientes, clienteSeleccionado } = this.state;
    
        return (
            <div>
            <h4>Seleccionar Cliente:</h4>
            <select onChange={this.handleClienteChange} value={clienteSeleccionado || ''}>
              <option value="">Seleccionar Cliente</option>
              {clientes.map(cliente => (
                <option key={cliente.id} value={cliente.id}>
                  {cliente.nombre} {cliente.apellido}
                </option>
              ))}
            </select>
      
            {/* Inserta el código aquí */}
            {clienteSeleccionado && clientes.length > 0 && (
              <div>
                <h4>
                  Historial de transacciones para:{" "}
                  {clientes.find(cliente => cliente.id === clienteSeleccionado)?.nombre}{" "}
                  {clientes.find(cliente => cliente.id === clienteSeleccionado)?.apellido}
                </h4>
                        <table className="table mt-3">
                            <thead>
                                <tr>
                                    <th>Tipo de Transaccion</th>
                                    <th>Monto</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map(transaccion => (
                                    <tr key={transaccion.id}>
                                        <td>{transaccion.tipo}</td>
                                        <td>{transaccion.monto}</td>
                                        <td>{transaccion.fecha}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        );
    }
}    

export default HistorialTransacciones;
