import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);

    const handleSubmit = (e) => {
        const configuration = {
            method: "post",
            url: "http://localhost:3000/auth/signup",
            data: {
                email,
                password,
            }
        };
        axios(configuration)
        .then(result => setRegister(true))
        .catch(error => console.log(error)) 
    }

    return (
        <>
        !register ?
            <>
            <h2>Register</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email"
                    name = "email"
                    value= {email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder='Enter email'/>
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name= "password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder='Password'/>
                </Form.Group>

                <Button 
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                >
                Submit
                </Button>
            </Form>
            </>
        :
            <>
                <p>Welcome! Please check your email to verify your account</p>
            </>

        </>
    )
}