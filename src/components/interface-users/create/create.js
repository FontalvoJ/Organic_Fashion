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

export default function CreateUser() {

    const [Nombre, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [Role, setRole] = useState('');
    const [WithGoogle, setWgoogle] = useState('');

    const params = useParams();
    const { pathname } = window.location;
    const isForUpdate = !pathname.includes('registrar-usuario');
    useEffect(() => {
        if ( !params.id && isForUpdate){
            window.location.href = '/registrar-usuario';
            return;
        }
        const getUserData = async () => {
            const userData = await httpGet(`${process.env.REACT_APP_BACKEND_URL}/users/${params.id}`);
            if (userData){
                const user = userData[0];
                if (user){
                    setName(user.name);
                    setEmail(user.email);
                    setPassword(user.password);
                    setRole(user.role);
                    setWgoogle(user.withGoogle);
                }
            }
        };
        getUserData();
    },[]);

    const postData = async () => {
        const newUser ={
        name: Nombre,
        email: Email,
        password: Password,
        role: Role,
        };
        if(isForUpdate){
                const UpdatedUser = await httpPatch(`${process.env.REACT_APP_BACKEND_URL}/users/${params.id}`,{
                body: JSON.stringify(newUser),
            });
            console.log(UpdatedUser);
        }else{
            const createdUser = await httpPost(`${process.env.REACT_APP_BACKEND_URL}/users`,{
            body: JSON.stringify(newUser),
        });
        console.log(createdUser);
        }
    }

    const token = getToken();
    return (
        <div>
        {token ? <>
            <h2 className="main-header">Usuarios</h2>
            <h3>Registro Datos</h3>
            <Form className="create-form">
                <Form.Field>
                    <label>Nombre</label>
                    <input placeholder='Nombre' onChange={(e) => setName(e.target.value)} value={Nombre}/>
                </Form.Field>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={Email}/>
                </Form.Field>
                { isForUpdate ? null :
                <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' onChange={(e) => setPassword(e.target.value)} value={Password}/>
                </Form.Field>}
                <Form.Field>
                    <label>Rol ADMIN o VENDEDOR</label>
                    <input placeholder='Rol' onChange={(e) => setRole(e.target.value)} value={Role}/>
                </Form.Field>
                <Link to='/update'>
                    <Button color={ isForUpdate ? "blue" : "green"} onClick={postData} type='submit'>
                        { isForUpdate ? 'Actualizar' : 'Registrar'}
                    </Button>
                </Link>
                <Link to='/usuarios'>
                    <Button color="red">Cancelar</Button>
                </Link>
            </Form>
            </> : window.location.href = '/' }
        </div>
    )
}