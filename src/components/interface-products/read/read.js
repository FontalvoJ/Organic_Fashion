import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'semantic-ui-react'
import { useEffect } from 'react';
import { httpDelete, httpGet } from '../../../utils/fetch';
import { getToken } from '../../../utils/getToken';

export default function ReadProduct() {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filter, setFilter] = useState('');

    useMemo(() => {
        if (!filter) setFilteredProducts(products);

        setFilteredProducts(
            products.filter((product) => {
                return product.descripcion.toLowerCase().includes(filter.toLowerCase());
            })
        )
    }, [filter, products])

    useEffect(() => {

        const getproducts = async () => {
            const products = await httpGet(`${process.env.REACT_APP_BACKEND_URL}/Products`);
            setProducts(products);
            setFilteredProducts(products);
        };
        getproducts();
    }, []);




    const token = getToken();
    return (
        <div>
        {token ? <>
            <div className= "barraBusqueda">
                <input type="text"  class="textField" placeholder='Busca el producto' value={filter} onChange={(e) => {
                    setFilter(e.target.value)
                }} />
            </div>
            <br />
            <h2 className="App">Productos</h2>
            <Table inverted>
                <Table.Header className="App">
                    <Table.Row className="table">
                        <Table.HeaderCell className="td">Id</Table.HeaderCell>
                        <Table.HeaderCell className="td1">Descripcion</Table.HeaderCell>
                        <Table.HeaderCell className="td">Marca</Table.HeaderCell>
                        <Table.HeaderCell className="td">Valor</Table.HeaderCell>
                        <Table.HeaderCell className="td">Estado</Table.HeaderCell>

                        <Table.HeaderCell className="td">Actualizar</Table.HeaderCell>
                        <Table.HeaderCell className="td">Eliminar</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {(filteredProducts || []).map((item, index) => {
                    //return <Task key={index} id={item._id} task={item.name} due={item.cedula} />;
                    //return <div key={index}>Datos desde Mongo -> Id: {item._id} Nombre: {item.name} Cedula: {item.cedula}</div>
                    const deleteProduct = async () => {
                        const eliminar = await httpDelete(`${process.env.REACT_APP_BACKEND_URL}/Products/${item._id}`);
                        console.log(eliminar);
                    };
                    return <>
                        <Table.Body className="App">
                            <Table.Row className="table">
                                <Table.Cell className="td">{item._id}</Table.Cell>
                                <Table.Cell className="td1">{item.descripcion}</Table.Cell>
                                <Table.Cell className="td">{item.marca}</Table.Cell>
                                <Table.Cell className="td">{item.valor}</Table.Cell>
                                <Table.Cell className="td">{item.estado}</Table.Cell>
                                <Table.Cell className="td">
                                    <a href={`/actualizar-info-product/${item._id}`}>
                                        <Button color="blue">Actualizar</Button>
                                    </a>
                                </Table.Cell>
                                <Table.Cell className="td">
                                    <Link to='/update'>
                                        <Button color="red" onClick={deleteProduct}>Eliminar</Button>
                                    </Link>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </>
                })}
            </Table>
            <Link to='/registrar-producto'>
                <Button color="green">Registrar Producto</Button>
            </Link>
        </> : window.location.href = '/' }
        </div>
    )
}