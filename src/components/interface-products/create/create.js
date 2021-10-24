import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { Link, useParams } from 'react-router-dom';
import { httpGet, httpPatch, httpPost } from '../../../utils/fetch';

export default function CreateProduct() {

    const [descripcion, setDescripcion] = useState('');
    const [marca, setMarca] = useState('');
    const [valor, setValor] = useState('');
    const [estado, setEstado] = useState('');

    const params = useParams();
    const { pathname } = window.location;
    const isForUpdate = !pathname.includes('registrar-product');
    useEffect(() => {
        if ( !params.id && isForUpdate){
            window.location.href = '/registrar-product';
            return;
        }
        const getProductData = async () => {
            const productData = await httpGet(`${process.env.REACT_APP_BACKEND_URL}/products/${params.id}`);
            if (productData){
                const product = productData[0];
                if (product){
                    setDescripcion(product.descripcion);
                    setMarca(product.marca);
                    setValor(product.valor)
                    setEstado(product.estado);
                }
            }
        };
        
    getProductData();
    },[]);

    const postData = async () => {
        const newproduct ={
        descripcion: descripcion,
        marca: marca,
        valor: valor,
        estado: estado,
        };
        if(isForUpdate){
                const Updatedproduct = await httpPatch(`${process.env.REACT_APP_BACKEND_URL}/products/${params.id}`,{
                body: JSON.stringify(newproduct),
            });
            console.log(Updatedproduct);
        }else{
            const createdproduct = await httpPost(`${process.env.REACT_APP_BACKEND_URL}/products`,{
            body: JSON.stringify(newproduct),
        });
        console.log(createdproduct);
        }
    }
    return (
        <div>
            <h2 className="main-header"> Productos </h2>
            <h3> Registrar producto </h3>
            <Form className="create-form">
                <Form.Field>
                    <label>Descripcion</label>
                    <input placeholder='Descripcion' onChange={(e) => setDescripcion(e.target.value)} value={descripcion}/>
                </Form.Field>
                <Form.Field>
                    <label>Marca</label>
                    <input placeholder='Marca' onChange={(e) => setMarca(e.target.value)} value={marca}/>
                </Form.Field>
                <Form.Field>
                    <label>Valor</label>
                    <input placeholder='Valor' onChange={(e) => setValor(e.target.value)} value={valor}/>
                </Form.Field>
                <Form.Field>
                    <label>Estado</label>
                    <input placeholder='Estado' onChange={(e) => setEstado(e.target.value)} value={estado}/>
                </Form.Field>
                <Link to='/update'>
                    <Button color={ isForUpdate ? "blue" : "green"} onClick={postData} type='submit'>
                        { isForUpdate ? 'Actualizar' : 'Registrar'}
                    </Button>
                </Link>
                <Link to='/productos'>
                    <Button color="red">Cancelar</Button>
                </Link>
            </Form>
        </div>
    )
}