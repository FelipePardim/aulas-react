import { createContext, useCallback } from "react";

interface IUsuarioLogadoContextData {
    nomeDoUsuario: string;
    logout: () => void;
}

interface IUsuarioLogadoProvider {
    children: React.ReactNode
}

export const UsuarioLogadoContext = createContext<IUsuarioLogadoContextData>({} as IUsuarioLogadoContextData);

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProvider> = ({ children }) => {

    const handleLogout = useCallback(() => {
        console.log("Usuário fez logout");
    }, []);
    return (
        <UsuarioLogadoContext.Provider value={{ nomeDoUsuario: 'Usuário', logout: handleLogout }}>
            {children}
        </UsuarioLogadoContext.Provider>
    )
}