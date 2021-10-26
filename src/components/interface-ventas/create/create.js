import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { Link, useParams } from 'react-router-dom';
import { httpGet, httpPatch, httpPost } from '../../../utils/fetch';
import { getToken } from '../../../utils/getToken';
/*
const Create = () => (
    <Form className="create-form">
        <Form.Field>
            <label>First Name</label>
            <input placeholder='First Name' />
        </Form.Field>
        <Form.Field>
            <label>Last Name</label>
            <input placeholder='Last Name' />
        </Form.Field>
        <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
        </Form.Field>
        <Button type='submit'>Submit</Button>
    </Form>
)

export default Create;*/

export default function CreateVentas() {

    const [Nombre, setFirstName] = useState('');
    const [Cedula, setId] = useState('');
    const [Total, setTotal] = useState('');
    const [Fecha, setFecha] = useState('');

    const params = useParams();
    const { pathname } = window.location;
    const isForUpdate = !pathname.includes('registrar-venta');
    useEffect(() => {
        if ( !params.id && isForUpdate){
            window.location.href = '/registrar-venta';
            return;
        }
        const getVentaData = async () => {
            const ventaData = await httpGet(`${process.env.REACT_APP_BACKEND_URL}/ventas/${params.id}`);
            if (ventaData){
                const venta = ventaData[0];
                if (venta){
                    setFirstName(venta.nombrecliente);
                    setId(venta.cedulacliente);
                    setTotal(venta.total)
                    setFecha(venta.fecha);
                }
            }
        };
        getVentaData();
    },[]);

    const postData = async () => {
        const newVenta ={
            nombrecliente: Nombre,
            cedulacliente: Cedula,
            total: Total,
            fecha: Fecha,
        };
        if(isForUpdate){
                const UpdatedVenta = await httpPatch(`${process.env.REACT_APP_BACKEND_URL}/ventas/${params.id}`,{
                body: JSON.stringify(newVenta),
            });
            console.log(UpdatedVenta);
        }else{
            const createdVenta = await httpPost(`${process.env.REACT_APP_BACKEND_URL}/ventas`,{
            body: JSON.stringify(newVenta),
        });
        console.log(createdVenta);
        }
    }

    const token = getToken();
    return (
        <div>
        {token ? <>
            <h2 className="main-header">Ventas</h2>
            <h3>Registro Datos</h3>
            <Form className="create-form">
                <Form.Field>
                    <label>Nombre</label>
                    <input placeholder='Nombre' onChange={(e) => setFirstName(e.target.value)} value={Nombre}/>
                </Form.Field>
                <Form.Field>
                    <label>Cedula</label>
                    <input placeholder='Cedula' onChange={(e) => setId(e.target.value)} value={Cedula}/>
                </Form.Field>
                <Form.Field>
                    <label>Total Venta</label>
                    <input placeholder='Total' onChange={(e) => setTotal(e.target.value)} value={Total}/>
                </Form.Field>
                <Form.Field>
                    <label>Fecha</label>
                    <input placeholder='Fecha' onChange={(e) => setFecha(e.target.value)} value={Fecha}/>
                </Form.Field>
                <Link to='/update'>
                    <Button color={ isForUpdate ? "blue" : "green"} onClick={postData} type='submit'>
                        { isForUpdate ? 'Actualizar' : 'Registrar'}
                    </Button>
                </Link>
                <Link to='/ventas'>
                    <Button color="red">Cancelar</Button>
                </Link>
            </Form>
            </> : window.location.href = '/' }
        </div>
    )
}