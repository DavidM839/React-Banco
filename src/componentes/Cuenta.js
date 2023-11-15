import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://127.0.0.1:8000/api/cuentas/"; 

class Cuenta extends Component {
    state = {
        data: [],
        modalInsertar: false,
        modalEditar: false,
        modalEliminar: false,
        form: {
            id:'',
            id_cliente: '',
            saldo: '',
        },
        cuentasSeleccionados: null,
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

    seleccionarCuentas = (cuenta) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: cuenta.id,
                id_cliente: cuenta.id_cliente,
                saldo: cuenta.saldo,
            }
        });
    }
    modalEditar = () => {
        this.setState({ modalEditar: !this.state.modalEditar });
    }

    seleccionarCuentaParaEditar = (cuenta) => {
        this.setState({
            tipoModal: 'actualizar',
            cuentasSeleccionados: cuenta,
        });
        this.modalEditar();
    }

    guardarEdicion = () => {
        axios.put(url + this.state.cuentasSeleccionados.id, this.state.cuentasSeleccionados)
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
            cuentasSeleccionados: {
                ...this.state.cuentasSeleccionados,
                [e.target.name]: e.target.value,
            },
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });

        if (e.target.name === 'id_cliente') {
            axios.get(`http://127.0.0.1:8000/api/clientes/${e.target.value}`)
                .then(response => {
                    const { nombre, apellido } = response.data;
                    this.setState(prevState => ({
                        form: {
                            ...prevState.form,
                            nombre,
                            apellido
                        },
                        cuentasSeleccionados: {
                            ...prevState.cuentasSeleccionados,
                            nombre,
                            apellido
                        }
                    }));
                })
                .catch(error => {
                    console.log(error.message);
                    // Manejar errores si el cliente no es encontrado
                });
        }
    }
    render() {
        const { form, cuentasSeleccionados } = this.state;
        const styles = {
            backgroundColor: 'gray',
            padding: '50px',
        };

        return (
            <div style={styles}>
                <br />
                <h4>Registro de cuentas</h4>
                <hr></hr>
                <button className="btn btn-success"onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar();  }}>
                    Agregar cuenta
                </button>
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>ID Cliente</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Saldo Actual</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(cuenta => { 
                            return (
                                <tr key={cuenta.id}>
                                    <td>{cuenta.id_cliente}</td>
                                    <td>{cuenta.cliente.nombre}</td>
                                    <td>{cuenta.cliente.apellido}</td>
                                    <td>{cuenta.saldo}</td>
                                    <td>
                                        <button className="btn btn-primary" onClick={() => this.seleccionarCuentaParaEditar(cuenta)}> <FontAwesomeIcon icon={faEdit} /></button>
                                        {"   "}
                                        <button className="btn btn-danger" onClick={() => { this.seleccionarCuentas(cuenta); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
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
                            <input className="form-control" type="text" name="id" id="id" readOnly value={cuentasSeleccionados ? cuentasSeleccionados.id : ''} />
                            <br />
                            <label htmlFor="id_cliente">ID Cliente</label>
                            <input className="form-control" type="text" name="id_cliente" onChange={this.handleChange} value={cuentasSeleccionados ? cuentasSeleccionados.id_cliente : ''} />
                            <br /> 
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="nombre" onChange={this.handleChange} value={cuentasSeleccionados ? cuentasSeleccionados.nombre : ''} />
                            <br />
                            <label htmlFor="apellido">Apellido</label>
                            <input className="form-control" type="text" name="apellido" onChange={this.handleChange} value={cuentasSeleccionados ? cuentasSeleccionados.apellido : ''} />
                            <br />                       
                            <label htmlFor="saldo">Saldo</label> 
                            <input className="form-control" type="text" name="saldo" onChange={this.handleChange} value={cuentasSeleccionados ? cuentasSeleccionados.saldo : ''} />
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
                            <label htmlFor="id_cliente">ID Cliente</label>
                            <input className="form-control" type="text" name="id_cliente" onChange={this.handleChange}  value={form ? form.id_cliente : ''} />
                            <br />
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="nombre" onChange={this.handleChange}  value={form ? form.nombre : ''} />
                            <br />
                            <label htmlFor="apellido">Apellido</label>
                            <input className="form-control" type="text" name="apellido" onChange={this.handleChange} value={form ? form.apellido : ''} />
                            <br />
                            <label htmlFor="saldo">Saldo</label> 
                            <input className="form-control" type="text" name="saldo" onChange={this.handleChange} value={form ? form.saldo : ''} /> 
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
                        ¿Estás seguro que deseas eliminar esta cuenta?
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

export default Cuenta;

