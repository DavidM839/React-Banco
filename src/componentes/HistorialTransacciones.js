import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";

const url = "http://127.0.0.1:8000/api/transacciones/";

class HistorialTransacciones extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        this.peticionGet();
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

    render() {
        const { data } = this.state;

        return (
            <div>
                <h4>Historial de transacciones</h4>
                <hr></hr>
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>ID Cliente</th>
                            <th>Numero de cuenta</th>
                            <th>Tipo de Transaccion</th>
                            <th>Monto</th>
                            <th>Fecha</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(transaccion => (
                            <tr key={transaccion.id}>
                                <td>{transaccion.id_cliente}</td>
                                <td>{transaccion.cuenta.cliente.numero_cuenta}</td>
                                <td>{transaccion.tipo}</td>
                                <td>{transaccion.monto}</td>
                                <td>{transaccion.fecha}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default HistorialTransacciones;
