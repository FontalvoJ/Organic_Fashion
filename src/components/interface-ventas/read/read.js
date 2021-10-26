import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react'
import { useEffect } from 'react';
import { httpDelete, httpGet } from '../../../utils/fetch';
import { getToken } from '../../../utils/getToken';

export default function ReadVentas() {

    const [ventas, setVentas] = useState([]);

    useEffect(() => {
        const getVentas = async () => {
            const ventas = await httpGet(`${process.env.REACT_APP_BACKEND_URL}/ventas`);
            setVentas(ventas);
        };
        getVentas();
    }, []);

    const token = getToken();
    return (
        <div>
        {token ? <>
        <h2 className="App">Ventas</h2>
        <Table inverted>
            <Table.Header className="App">
                <Table.Row className="table">
                    <Table.HeaderCell className="td">Id</Table.HeaderCell>
                    <Table.HeaderCell className="td1">Nombre Completo</Table.HeaderCell>
                    <Table.HeaderCell className="td">Cedula</Table.HeaderCell>
                    <Table.HeaderCell className="td">Total Venta</Table.HeaderCell>
                    <Table.HeaderCell className="td">Fecha</Table.HeaderCell>
                    <Table.HeaderCell className="td">Actualizar Datos</Table.HeaderCell>
                    <Table.HeaderCell className="td">Eliminar Venta</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        {(ventas || []).map((item, index) => {
            //return <Task key={index} id={item._id} task={item.name} due={item.cedula} />;
            //return <div key={index}>Datos desde Mongo -> Id: {item._id} Nombre: {item.name} Cedula: {item.cedula}</div>
            const deleteVenta = async () => {
                const eliminar = await httpDelete(`${process.env.REACT_APP_BACKEND_URL}/ventas/${item._id}`);
                console.log(eliminar);
            };
            return <>
                <Table.Body className="App">
                    <Table.Row className="table">
                        <Table.Cell className="td">{item._id}</Table.Cell>
                        <Table.Cell className="td1">{item.nombrecliente}</Table.Cell>
                        <Table.Cell className="td">{item.cedulacliente}</Table.Cell>
                        <Table.Cell className="td">{item.total}</Table.Cell>
                        <Table.Cell className="td">{item.fecha}</Table.Cell>
                        <Table.Cell className="td">
                            <a href={`/actualizar-info-venta/${item._id}`}>
                                <Button color="blue">Actualizar</Button>
                            </a>
                        </Table.Cell>
                        <Table.Cell className="td">
                            <Link to='/update'>
                                <Button color="red" onClick={deleteVenta}>Eliminar</Button>
                            </Link>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                </>
        })}
        </Table>
        <Link to='/registrar-venta'>
            <Button color="green">Registrar Venta</Button>
        </Link>
        </> : window.location.href = '/' }
    </div>
    )
}