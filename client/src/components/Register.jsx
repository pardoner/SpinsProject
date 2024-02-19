import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAddRegistrationMutation}  from '../api/spinsapi';
import Cookies from 'js-cookie';

export default function Register({ setToken }) {
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();
    const [addRegistration, {error: registerError, isLoading: registrationLoading}] = useAddRegistrationMutation();


    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(`registering user ${first_name} ${last_name}`)
        const register = await addRegistration({first_name, last_name, email, username, password});
        setToken(register.data.token);
        Cookies.set("token", register.data.token)
        console.log(register);
        setFirstname('');
        setLastname('');
        setEmail('');
        setUsername('');
        setPassword('');
        nav('/account');
    }

    return(
        <div className="register-page">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input required placeholder='firstname' value={first_name} onChange={(e) => setFirstname(e.target.value)} />
                <input required placeholder='lastname' value={last_name} onChange={(e) => setLastname(e.target.value)} />
                <input required placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input required placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input required type="password" name="password"  placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn btn-secondary" type="submit">Submit</button>
            </form>
        </div>
    );
}
