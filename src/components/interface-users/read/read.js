import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react'
import { useEffect } from 'react';
import { httpDelete, httpGet } from '../../../utils/fetch';
import { getToken } from '../../../utils/getToken';

export default function ReadUser() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const users = await httpGet(`${process.env.REACT_APP_BACKEND_URL}/users`);
            setUsers(users);
        };
        getUsers();
    }, []);

    const token = getToken();
    return (
        <div>
        {token ? <>
        <h2 className="App"> Usuarios </h2>
        <Table inverted>
            <Table.Header className="App">
                <Table.Row className="table">
                    <Table.HeaderCell className="td">Id</Table.HeaderCell>
                    <Table.HeaderCell className="td1">Nombre Completo</Table.HeaderCell>
                    <Table.HeaderCell className="td">Email</Table.HeaderCell>
                    <Table.HeaderCell className="td">Rol</Table.HeaderCell>
                    <Table.HeaderCell className="td">Login Google</Table.HeaderCell>
                    <Table.HeaderCell className="td">Actualizar Datos</Table.HeaderCell>
                    <Table.HeaderCell className="td">Eliminar Perfil</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
        {(users || []).map((item, index) => {
            //return <Task key={index} id={item._id} task={item.name} due={item.cedula} />;
            //return <div key={index}>Datos desde Mongo -> Id: {item._id} Nombre: {item.name} Cedula: {item.cedula}</div>
            const deleteUser = async () => {
                const eliminar = await httpDelete(`${process.env.REACT_APP_BACKEND_URL}/users/${item._id}`);
                console.log(eliminar);
            };
            return <>
                <Table.Body className="App">
                    <Table.Row className="table">
                        <Table.Cell className="td">{item._id}</Table.Cell>
                        <Table.Cell className="td1">{item.name}</Table.Cell>
                        <Table.Cell className="td">{item.email}</Table.Cell>
                        <Table.Cell className="td">{item.role}</Table.Cell>
                        <Table.Cell className="td">{item.withGoogle ? 'si' : 'no'}</Table.Cell>
                        <Table.Cell className="td">
                            <a href={`/actualizar-info-usuario/${item._id}`}>
                                <Button color="blue">Actualizar</Button>
                            </a>
                        </Table.Cell>
                        <Table.Cell className="td">
                            <Link to='/update'>
                                <Button color="red" onClick={deleteUser}>Eliminar</Button>
                            </Link>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                </>
        })}
        </Table>
        <Link to='/registrar-usuario'>
            <Button color="green">Registrar Usuario</Button>
        </Link>
        </> : window.location.href = '/' }
    </div>
    )
}
