import { useRef, useState } from "react"
import { InputLogin } from "./components/InputLogin";
import { ButtonLogin } from "./components/ButtonLogin";

export const Login = () => {
    const inputPasswordRef = useRef<HTMLInputElement>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEntrar = () => {
        console.log(email, password);
    }

    return (
        <div>
            <form action="">
                 <InputLogin 
                    label="Email"
                    value={email}
                    onChange={newValue => setEmail(newValue)}
                    onPressEnter={() => inputPasswordRef.current?.focus()}
                 />

                <InputLogin
                    type="password"
                    label="Senha"
                    value={password}
                    ref={inputPasswordRef}
                    onChange={newValue => setPassword(newValue)}
                 />

                {/* <button type="button" onClick={handleEntrar}>
                    Entrar
                </button> */}

                <ButtonLogin type="button" onClick={handleEntrar}>
                    Entrar
                </ButtonLogin>
                <ButtonLogin type="button" onClick={handleEntrar}>
                    Cadastrar
                </ButtonLogin>
            </form>
        </div>
    )
}