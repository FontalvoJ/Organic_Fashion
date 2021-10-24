import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { Link, useParams } from 'react-router-dom';
import { httpGet, httpPatch, httpPost } from '../../../utils/fetch';

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

export default function Create() {

    const [Nombre, setFirstName] = useState('');
    const [Cedula, setId] = useState('');
    const [Celular, setCellphone] = useState('');
    const [Edad, setAge] = useState('');
    const [Email, setEmail] = useState('');

    const params = useParams();
    const { pathname } = window.location;
    const isForUpdate = !pathname.includes('registrar-vendedor');
    useEffect(() => {
        if ( !params.id && isForUpdate){
            window.location.href = '/registrar-vendedor';
            return;
        }
        const getVendorData = async () => {
            const vendorData = await httpGet(`${process.env.REACT_APP_BACKEND_URL}/vendors/${params.id}`);
            if (vendorData){
                const vendor = vendorData[0];
                if (vendor){
                    setFirstName(vendor.name);
                    setId(vendor.cedula);
                    setCellphone(vendor.celular)
                    setAge(vendor.edad);
                    setEmail(vendor.email);
                }
            }
        };
        getVendorData();
    },[]);

    const postData = async () => {
        const newVendor ={
        name: Nombre,
        cedula: Cedula,
        celular: Celular,
        edad: Edad,
        email: Email,
        };
        if(isForUpdate){
                const UpdatedVendor = await httpPatch(`${process.env.REACT_APP_BACKEND_URL}/vendors/${params.id}`,{
                body: JSON.stringify(newVendor),
            });
            console.log(UpdatedVendor);
        }else{
            const createdVendor = await httpPost(`${process.env.REACT_APP_BACKEND_URL}/vendors`,{
            body: JSON.stringify(newVendor),
        });
        console.log(createdVendor);
        }
    }
    return (
        <div>
            <h2 className="main-header">Vendedores</h2>
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
                    <label>Celular</label>
                    <input placeholder='Celular' onChange={(e) => setCellphone(e.target.value)} value={Celular}/>
                </Form.Field>
                <Form.Field>
                    <label>Edad</label>
                    <input placeholder='Edad' onChange={(e) => setAge(e.target.value)} value={Edad}/>
                </Form.Field>
                <Form.Field>
                    <label>E-mail</label>
                    <input placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} value={Email}/>
                </Form.Field>
                <Link to='/update'>
                    <Button color={ isForUpdate ? "blue" : "green"} onClick={postData} type='submit'>
                        { isForUpdate ? 'Actualizar' : 'Registrar'}
                    </Button>
                </Link>
                <Link to='/vendedores'>
                    <Button color="red">Cancelar</Button>
                </Link>
            </Form>
        </div>
    )
}