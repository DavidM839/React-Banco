import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';

const url = "http://127.0.0.1:8000/api/transacciones/"; 

class Transaccion extends Component {
    state = {
        data: [],
        modalInsertar: false,
        modalEditar: false,
        modalEliminar: false,
        form: {
            id:'',
            id_cuenta: '',
            id_cliente:'',
            tipo: '',
            monto: '', 
            fecha: '', 
           
        },
        transaccionesSeleccionados: null,
    };

    componentDidMount() {
        this.peticionGet();
    }

    peticionGet = () => {
        axios.get(url).then(response => {
            this.setState({ data: response.data });
        }).catch(error => {
            console.log(error.message);
        });
    }

    peticionPost = async () => {
        delete this.state.form.id;
        await axios.post(url, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        });
    }

    peticionPut = () => {
        axios.put(url + this.state.form.id, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionGet();
        });
    }

    peticionDelete = () => {
        axios.delete(url + this.state.form.id).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionGet();
        });
    }

    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }

    seleccionarTransacciones = (transaccion) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
            id: transaccion.id,
            id_cuenta: transaccion.id_cuenta,
            id_cliente: transaccion.id_cliente,
            tipo: transaccion.tipo,
            monto: transaccion.monto, 
            fecha: transaccion.fecha, 
            }
        });
    }
    modalEditar = () => {
        this.setState({ modalEditar: !this.state.modalEditar });
    }

    seleccionarTransaccionParaEditar = (transaccion) => {
        this.setState({
            tipoModal: 'actualizar',
            transaccionesSeleccionados: transaccion,
        });
        this.modalEditar();
    }

    guardarEdicion = () => {
        axios.put(url + this.state.transaccionesSeleccionados.id, this.state.transaccionesSeleccionados)
            .then(response => {
                this.modalEditar();
                this.peticionGet();
            })
            .catch(error => {
                console.log(error.message);
            });

    }

    handleChange = async (e) => {
        e.persist();
        await this.setState({
            transaccionesSeleccionados: {
                ...this.state.transaccionesSeleccionados,
                [e.target.name]: e.target.value,
            },
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    
        if (e.target.name === 'id_cuenta') {
            axios.get(`http://127.0.0.1:8000/api/cuentas/${e.target.value}`)
                .then(response => {
                    const { id_cliente, cliente: { nombre, apellido } } = response.data;
                    this.setState(prevState => ({
                        form: {
                            ...prevState.form,
                            id_cliente,
                            nombre,
                            apellido
                        },
                        transaccionesSeleccionados: {
                            ...prevState.transaccionesSeleccionados,
                            id_cliente,
                            nombre,
                            apellido
                        }
                    }));
                })
                .catch(error => {
                    console.log(error.message);
                    // Manejar errores si la cuenta no es encontrada
                });
        }
    }
    

    render() {
        const { form, transaccionesSeleccionados } = this.state;
        const styles = {
            backgroundColor: 'gray',
            padding: '50px',
        };
        const opcionesTipoTransaccion = ['deposito', 'retiro'];
        return (
            <div style={styles}>
                <br />
                <h4>Registro de transacciones</h4>
                <hr></hr>
                <button className="btn btn-success"onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar();  }}>
                    Agregar transaccion
                </button>
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>ID Cuenta</th>
                            <th>ID Cliente</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Tipo de Transaccion</th>
                            <th>Monto</th> 
                            <th>Fecha</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(transaccion => { 
                            return (
                                <tr key={transaccion.id}>
                                    <td>{transaccion.id_cuenta}</td>
                                    <td>{transaccion.id_cliente}</td>
                                    <td>{transaccion.cuenta.cliente.nombre}</td>
                                    <td>{transaccion.cuenta.cliente.apellido}</td>
                                    <td>{transaccion.tipo}</td>
                                    <td>{transaccion.monto}</td>
                                    <td>{transaccion.fecha}</td> 
                                    <td>
                                    <Link to={`/historialTransacciones/`}>
                                    <button className="btn btn-info">Ver Historial</button>
                                </Link>
                                        <button className="btn btn-primary" onClick={() => this.seleccionarTransaccionParaEditar(transaccion)}> <FontAwesomeIcon icon={faEdit} /></button>
                                        {"   "}
                                        <button className="btn btn-danger" onClick={() => { this.seleccionarTransacciones(transaccion); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
                <Modal isOpen={this.state.modalEditar}>
                    <ModalHeader style={{ display: 'block' }}>
                        <span style={{ float: 'right' }} onClick={this.modalEditar}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly value={transaccionesSeleccionados ? transaccionesSeleccionados.id : ''} />
                            <br />
                            <label htmlFor="id_cuenta">ID Cuenta</label>
                            <input className="form-control" type="text" name="id_cuenta" onChange={this.handleChange} value={transaccionesSeleccionados ? transaccionesSeleccionados.id_cuenta : ''} />
                            <br />
                            <label htmlFor="id_cliente">ID Cliente</label>
                            <input className="form-control" type="text" name="id_cliente" onChange={this.handleChange} value={transaccionesSeleccionados ? transaccionesSeleccionados.id_cliente : ''} />
                            <br /> 
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="nombre" onChange={this.handleChange} value={transaccionesSeleccionados ? transaccionesSeleccionados.nombre : ''} />
                            <br />
                            <label htmlFor="apellido">Apellido</label>
                            <input className="form-control" type="text" name="apellido" onChange={this.handleChange} value={transaccionesSeleccionados ? transaccionesSeleccionados.apellido : ''} />
                            <br />    
                            <label htmlFor="tipo">Tipo</label>
                            <select className="form-control" name="tipo" onChange={this.handleChange} value={transaccionesSeleccionados ? transaccionesSeleccionados.tipo : ''}>
                                <option value="">Seleccionar</option>
                                {opcionesTipoTransaccion.map((tipo, index) => (
                                    <option key={index} value={tipo}>{tipo}</option>
                                ))}
                            </select>
                            <br />
                            <label htmlFor="monto">Monto</label>
                            <input className="form-control" type="text" name="monto" onChange={this.handleChange} value={transaccionesSeleccionados ? transaccionesSeleccionados.monto : ''} />
                            <br />
                            <label htmlFor="fecha">Fecha</label> 
                            <input className="form-control" type="text" name="fecha" onChange={this.handleChange} value={transaccionesSeleccionados ? transaccionesSeleccionados.fecha : ''} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={this.guardarEdicion}>Guardar Cambios</button>
                        <button className="btn btn-danger" onClick={this.modalEditar}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalInsertar}>
                    <ModalHeader style={{ display: 'block' }}>
                        <span style={{ float: 'right' }} onClick={() => this.modalInsertar()}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                        <label htmlFor="id">ID</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : this.state.data.length + 1} />
                            <br />
                            <label htmlFor="id_cuenta">ID Cuenta</label>
                            <input className="form-control" type="text" name="id_cuenta" onChange={this.handleChange}  value={form ? form.id_cuenta : ''} />
                            <br />
                            <label htmlFor="id_cliente">ID Cliente</label>
                            <input className="form-control" type="text" name="id_cliente" onChange={this.handleChange}  value={form ? form.id_cliente : ''} />
                            <br />
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="nombre" onChange={this.handleChange}  value={form ? form.nombre : ''} />
                            <br />
                            <label htmlFor="apellido">Apellido</label>
                            <input className="form-control" type="text" name="apellido" onChange={this.handleChange} value={form ? form.apellido : ''} />
                            <br />
                            <label htmlFor="tipo">Tipo</label>
            <select className="form-control" name="tipo" onChange={this.handleChange} value={form ? form.tipo : ''}>
                <option value="">Seleccionar</option>
                <option value="Depósito">Depósito</option>
                <option value="Retiro">Retiro</option>
            </select>
                            <br />
                            <label htmlFor="monto">Monto</label>
                            <input className="form-control" type="text" name="monto" onChange={this.handleChange} value={form ? form.monto : ''} />
                            <br />
                            <label htmlFor="fecha">Fecha</label> 
                            <input className="form-control" type="text" name="fecha" onChange={this.handleChange} value={form ? form.fecha : ''} /> 
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.tipoModal === 'insertar' ? (
                            <button className="btn btn-success" onClick={() => this.peticionPost()}>
                                Insertar
                            </button>
                        ) : (
                            <button className="btn btn-primary" onClick={() => this.peticionPut()}>
                                Actualizar
                            </button>
                        )}
                        <button className="btn btn-danger" onClick={() => this.modalInsertar()}>Cancelar</button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        ¿Estás seguro que deseas eliminar esta transaccion?
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger" onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secondary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Transaccion;