import { useState } from "react"

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEntrar = () => {
        console.log(email, password);
        
    }

    return (
        <div>
            <form action="">
                <label htmlFor="">
                    <span>Email</span>
                    <input type="text" onChange={e => setEmail(e.target.value)}/>
                </label>

                <label htmlFor="">
                    <span>Senha</span>
                    <input type="password" onChange={e => setPassword(e.target.value)}/>
                </label>

                <button type="button" onClick={handleEntrar}>
                    Entrar
                </button>
            </form>
        </div>
    )
}