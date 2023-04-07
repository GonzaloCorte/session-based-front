import axios from 'axios';
import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(false);

    const handlerSubmit = (e) => {
        const configuration = {
            method:'post',
            url: 'http://localhost:3000/auth/login',
            data: {
                email,
                password,
            }
        }
        axios(configuration)
        .then(result => {
            console.log(result.data)
            cookies.set('session', result.data.connect.sid)
            window.location.href = "/auth";
            setLogin(true)
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <h2>Log in</h2>
            <Form>
                <Form.Group controlId="fromSigninEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder='myemail@email.com'
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        name='email'
                        value={email}
                        onChange={setPassword}
                        placeholder='1234...'
                        />
                </Form.Group>
            </Form>
            <Button variant='primary' type='submit'>Enter</Button>
        </>
    )
}