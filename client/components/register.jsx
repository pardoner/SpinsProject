import { useState } from 'react';
import { registerUser } from '../fetching';
import { useNavigate } from 'react-router-dom';

export default function Register({ setToken }) {
    const [first_name, setFirstname] = useState('');
    const [last_name, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const nav = useNavigate();
    // const [error,setError] = useState(null)
    // const gotoAccount = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const register = await registerUser(first_name, last_name, username, password);
        setToken(register.token);
        console.log(register);
        setFirstname('');
        setLastname('');
        setUsername('');
        setPassword('');
        nav('/account');
    }

    // const [
    //     addRegistration,
    //     { isLoading: isAdding },
    //   ] = useAddRegistrationMutation();
    //   async function handleSubmit(e) {
    //     e.preventDefault()
    //     addRegistration({ firstname, lastname, email, password })
    //         .unwrap().then(fulfilled => {
    //             setToken(fulfilled.token)
    //             gotoAccount("/account")
    //         })
    //         .catch(rejected => {
    //             setError(rejected)
    //         })
            
    //   }

    return(
        <>
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>
                <input placeholder='firstname' value={first_name} onChange={(e) => setFirstname(e.target.value)} />
                <input placeholder='lastname' value={last_name} onChange={(e) => setLastname(e.target.value)} />
                <input placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                <input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
