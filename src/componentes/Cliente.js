import React, { Component } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url = "http://127.0.0.1:8000/api/clientes/"; 

class Cliente extends Component {
    state = {
        data: [],
        modalInsertar: false,
        modalEditar: false,
        modalEliminar: false,
        form: {
            id:'',
            Nombre: '',
            Apellido: '',
            numero_cuenta: '', 
            contrasena: '', 
        },
        clientesSeleccionados: null,
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

    seleccionarClientes = (cliente) => {
        this.setState({
            tipoModal: 'actualizar',
            form: {
                id: cliente.id,
                Nombre: cliente.Nombre,
                Apellido: cliente.Apellido,
                numero_cuenta: cliente.numero_cuenta, 
                contrasena: cliente.contrasena, 
            }
        });
    }
    modalEditar = () => {
        this.setState({ modalEditar: !this.state.modalEditar });
    }

    seleccionarClienteParaEditar = (cliente) => {
        this.setState({
            tipoModal: 'actualizar',
            clientesSeleccionados: cliente,
        });
        this.modalEditar();
    }

    guardarEdicion = () => {
        axios.put(url + this.state.clientesSeleccionados.id, this.state.clientesSeleccionados)
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
            clientesSeleccionados: {
                ...this.state.clientesSeleccionados,
                [e.target.name]: e.target.value,
            },
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
        console.log(this.state.clientesSeleccionados);
    }

    render() {
        const { form, clientesSeleccionados } = this.state;
        const styles = {
            backgroundColor: 'gray',
            padding: '50px',
        };

        return (
            <div style={styles}>
                <br />
                <h4>Registro de Clientes</h4>
                <hr></hr>
                <button className="btn btn-success"onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar();  }}>
                    Agregar cliente
                </button>
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Numero de cuenta</th>
                            
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map(cliente => { 
                            return (
                                <tr key={cliente.id}>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.apellido}</td>
                                    <td>{cliente.numero_cuenta}</td>
                                    
                                    <td>
                                        <button className="btn btn-primary" onClick={() => this.seleccionarClienteParaEditar(cliente)}> <FontAwesomeIcon icon={faEdit} /></button>
                                        {"   "}
                                        <button className="btn btn-danger" onClick={() => { this.seleccionarClientes(cliente); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
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
                            <input className="form-control" type="text" name="id" id="id" readOnly value={clientesSeleccionados ? clientesSeleccionados.id : ''} />
                            <br />
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="nombre" onChange={this.handleChange} value={clientesSeleccionados ? clientesSeleccionados.nombre : ''} />
                            <br />
                            <label htmlFor="apellido">Apellido</label>
                            <input className="form-control" type="text" name="apellido" onChange={this.handleChange} value={clientesSeleccionados ? clientesSeleccionados.apellido : ''} />
                            <br />
                            <label htmlFor="numero_cuenta">Numero de cuenta</label>
                            <input className="form-control" type="text" name="numero_cuenta" onChange={this.handleChange} value={clientesSeleccionados ? clientesSeleccionados.numero_cuenta : ''} />
                            <br />
                            <label htmlFor="contrasena">Contraseña</label> 
                            <input className="form-control" type="text" name="contrasena" onChange={this.handleChange} value={clientesSeleccionados ? clientesSeleccionados.contrasena : ''} />
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
                            <label htmlFor="nombre">Nombre</label>
                            <input className="form-control" type="text" name="nombre" onChange={this.handleChange}  value={form ? form.nombre : ''} />
                            <br />
                            <label htmlFor="apellido">Apellido</label>
                            <input className="form-control" type="text" name="apellido" onChange={this.handleChange} value={form ? form.apellido : ''} />
                            <br />
                            <label htmlFor="numero_cuenta">Numero de cuenta</label>
                            <input className="form-control" type="text" name="numero_cuenta" onChange={this.handleChange} value={form ? form.numero_cuenta : ''} />
                            <br />
                            <label htmlFor="contrasena">Contraseña</label> 
                            <input className="form-control" type="text" name="contrasena" onChange={this.handleChange} value={form ? form.contrasena : ''} /> 
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
                        ¿Estás seguro que deseas eliminar el cliente?
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

export default Cliente;
