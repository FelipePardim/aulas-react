import { useContext, useRef } from "react"
import { Link } from "react-router-dom"
import { UsuarioLogadoContext } from "../../shared/contexts";

export const Dashboard = () => {
    const counterRef = useRef({counter: 0});

    const { nomeDoUsuario } = useContext(UsuarioLogadoContext);

    return (
        <div>
            <p>Dashboard</p>
            <p>{nomeDoUsuario}</p>

            <p>Contador: {counterRef.current.counter}</p>
            <button onClick={() => counterRef.current.counter++}>Somar</button>
            <Link to={"/entrar"}>Entrar</Link>
        </div>
    )
}