import { useState } from 'react';
import { registerUser } from '../fetching';
import { useNavigate } from 'react-router-dom';

export default function Register({ setToken }) {
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const register = await registerUser(first_name, last_name, email, username, password);
        setToken(register.token);
        console.log(register);
        setFirstname('');
        setLastname('');
        setEmail('');
        setUsername('');
        setPassword('');
        nav('/account');
    }

    return(
        <>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input required placeholder='firstname' value={first_name} onChange={(e) => setFirstname(e.target.value)} />
                <input required placeholder='lastname' value={last_name} onChange={(e) => setLastname(e.target.value)} />
                <input required placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input required placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input required type="password" name="password"  placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
