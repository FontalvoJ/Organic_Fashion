import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react'
import { Link, useParams } from 'react-router-dom';
import { httpPost } from '../../utils/fetch';
import GoogleSignIn from '../GoogleSignIn/GoogleSignIn';
import { getToken } from '../../utils/getToken';

export default function LoginUser() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rol, setRol] = useState('');
    const [withGoogle, setWithGoogle] = useState('');
    const [user, setUsers] = useState([]);
    const token = getToken();
    const [errorInicio, setError] = useState([]);

    const params = useParams();

    const getUser = async () => {
        const userLogin ={
        email: email,
        password: password,
        };
        /*if(isForUpdate){
                const Updatedproduct = await httpPatch(`${process.env.REACT_APP_BACKEND_URL}/products/${params.id}`,{
                body: JSON.stringify(newproduct),
            });
            console.log(Updatedproduct);
        }else{*/
            const iniciosesion = await httpPost(`${process.env.REACT_APP_BACKEND_URL}/users/auth`,{
            body: JSON.stringify(userLogin),
        });
        if(iniciosesion.token){
            localStorage.setItem('token', iniciosesion.token);
            //localStorage.setItem('email', iniciosesion.email);
            window.location.reload();
        }
        console.log(iniciosesion);
        setError(iniciosesion.error);
        
    }
    return (
        <div>
            {token ? <> <h2 className="main-header"> Bienvenido! </h2> </> : <>
            <h2 className="main-header"> Login </h2>
            <br></br>
            <Form className="create-form">
                <GoogleSignIn />
                <br></br>
                <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email}/>
                </Form.Field>
                <Form.Field>
                    <label>Contraseña</label>
                    <input placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)} value={password}/>
                </Form.Field>
                
                {errorInicio === 'El usuario no est´á registrado' ? <> <h3 style={{ color:"#FF0000"}} > Email Incorrecto! </h3> </> :
                errorInicio === 'Usuario no autorizado' ? <> <h3 style={{ color:"#FF0000"}}> Contraseña Incorrecta! </h3> </> : null}
                    <Button color="blue" onClick={getUser} type='submit'>
                        Ingresar
                    </Button>
            </Form>
            </> }
        </div>
    )
}