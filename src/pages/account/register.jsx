import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = (e) => {
        console.log("handling register submit");
        const configuration = {
            method: "post",
            url: "http://localhost:3000/auth/signup",
            data: {
                username: email,
                password,
            }
        };
        axios(configuration)
        .then(result => {
            if (result) {
                console.log(result);
                setRegister(true)
                // router.push('/registration-success');
            }
        })
        .catch(error => { console.log("error: ", error)
            // error.

            router.push('/account/error')
        })
    }

    return (
        <>
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
            <p>Do you have an account?</p>
            <Link href="/account/login" className="btn btn-link">Log in</Link>
            </>
        
            <>
            { register 
              ? <p>Welcome! Please check your email to verify your account</p>
              : null
            }
            </>

        </>
    )
}