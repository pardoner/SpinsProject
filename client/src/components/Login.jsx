import { useState } from 'react';
import {useAddLoginMutation} from "../api/spinsapi"
import { useNavigate } from 'react-router-dom';

export default function Login({ setToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();
    const [addLogin, {error: loginError, isLoading: loginIsLoading}] = useAddLoginMutation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(username, password);
        const logIn = await addLogin({username, password});
        setToken(logIn.token);
        console.log(logIn);
        setUsername('');
        setPassword('');
        nav('/account');
    }

    return(
        <>
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <input id="username" autoFocus required placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input id="password" required placeholder='password' type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="btn btn-secondary" type="submit">Submit</button>
                <p>Don't have an account? Register <a href="/register">here</a>.</p>
            </form>
        </>
    );
}
