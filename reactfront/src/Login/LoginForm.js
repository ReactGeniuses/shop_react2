import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import './LoginForm.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logIn } from '../Store/AuthSlice';
import axios from "axios";

const ACCOUNT_URI = "http://localhost:8000/account/";

const LoginForm = () => {
    const defaultState = {
        email: '',
        password: '',
    };

    const [formData, setFormData] = useState(defaultState);
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onInputChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setFormData({ ...formData, [key]: value });
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        const errors = [];

        if (!formData.email) {
            errors.push('The email is required');
        }
        if (!formData.password) {
            errors.push('The password is required');
        }
        if (formData.email && formData.password) {
            try {
                const res = await axios.get(`${ACCOUNT_URI}${formData.email}`);
                const account = res.data;

                if (account) {
                    if (account.AccountPassword !== formData.password) {
                        errors.push('Invalid credentials');
                    } else {
                        // Log in the user and set the role
                        dispatch(logIn({ role: account.AccountRole, correo: account.Email}));
                        // Check account role and navigate accordingly
                        if (account.AccountRole === 1) {
                            navigate('/admin'); // Navigate to admin dashboard
                        } else if (account.AccountRole === 2) {
                            navigate('/vendedor/order'); // Navigate to user dashboard
                        } else {
                            navigate('/'); 
                        }
                    }
                } else {
                    errors.push('Invalid credentials');
                }
            } catch (error) {
                console.error('Error fetching the account:', error);
                errors.push('Invalid credentials');
            }
        }

        setErrors(errors);
    };
    const handleSkip = () => {
        navigate('/');
    };
    const handleSingUp = () => {
        navigate('/Signup');
    };

    return (
        <Form className='Login-form' onSubmit={onSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={formData.email} onChange={onInputChange}
                    name="email"
                    placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3"
                controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={formData.password} onChange={onInputChange}
                    name="password" placeholder="Password" />
            </Form.Group>
            {errors.length > 0 && errors.map((error, index) => <Alert key={index} variant="danger">{error}</Alert>)}
            <Button variant="primary" type="submit">
                Submit
            </Button>
            <Button variant="secondary" onClick={handleSkip}>
                Omitir 
            </Button>
            <Button variant="secondary" onClick={handleSingUp}>
                Crear cuenta 
            </Button>
            
        </Form>
    );
}

export default LoginForm;
