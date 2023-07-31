import { BrowserRouter, Routes as Switch, Navigate, Route } from "react-router-dom";
import { Dashboard } from "../pages";
import { redirect } from "react-router-dom";

export const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route  path="/pagina-inicial" element={<Dashboard />}/>

                <Route
                    path="*"
                    element={<Navigate to="/pagina-inicial" replace />}
                />
            </Switch>
        </BrowserRouter>
    )
}