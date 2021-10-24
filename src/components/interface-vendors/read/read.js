import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react'
import { useEffect } from 'react';
import { httpDelete, httpGet } from '../../../utils/fetch';
export default function Read() {

    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        const getVendors = async () => {
            const vendors = await httpGet(`${process.env.REACT_APP_BACKEND_URL}/vendors`);
            setVendors(vendors);
        };
        getVendors();
    }, []);

    return (
        <div>
        <h2 className="App">Vendedores</h2>
        <Table inverted>
            <Table.Header className="App">
                <Table.Row className="table">
                    <Table.HeaderCell className="td">Id</Table.HeaderCell>
                    <Table.HeaderCell className="td1">Nombre Completo</Table.HeaderCell>
                    <Table.HeaderCell className="td">Cedula</Table.HeaderCell>
                    <Table.HeaderCell className="td">Celular</Table.HeaderCell>
                    <Table.HeaderCell className="td">Edad</Table.HeaderCell>
                    <Table.HeaderCell className="td">E-mail</Table.HeaderCell>
                    <Table.HeaderCell className="td">Actualizar Datos</Table.HeaderCell>
                    <Table.HeaderCell className="td">Eliminar Perfil</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        {(vendors || []).map((item, index) => {
            //return <Task key={index} id={item._id} task={item.name} due={item.cedula} />;
            //return <div key={index}>Datos desde Mongo -> Id: {item._id} Nombre: {item.name} Cedula: {item.cedula}</div>
            const deleteVendor = async () => {
                const eliminar = await httpDelete(`${process.env.REACT_APP_BACKEND_URL}/vendors/${item._id}`);
                console.log(eliminar);
            };
            return <>
                <Table.Body className="App">
                    <Table.Row className="table">
                        <Table.Cell className="td">{item._id}</Table.Cell>
                        <Table.Cell className="td1">{item.name}</Table.Cell>
                        <Table.Cell className="td">{item.cedula}</Table.Cell>
                        <Table.Cell className="td">{item.celular}</Table.Cell>
                        <Table.Cell className="td">{item.edad}</Table.Cell>
                        <Table.Cell className="td">{item.email}</Table.Cell>
                        <Table.Cell className="td">
                            <a href={`/actualizar-info-vendedor/${item._id}`}>
                                <Button color="blue">Actualizar</Button>
                            </a>
                        </Table.Cell>
                        <Table.Cell className="td">
                            <Link to='/update'>
                                <Button color="red" onClick={deleteVendor}>Eliminar</Button>
                            </Link>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                </>
        })}
        </Table>
        <Link to='/registrar-vendedor'>
            <Button color="green">Registrar Vendedor</Button>
        </Link>
    </div>
    )
}