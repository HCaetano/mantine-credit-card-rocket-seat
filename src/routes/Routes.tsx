import type { ReactElement } from "react";
import { Route, BrowserRouter, Routes as RouterRoutes } from "react-router-dom";
import App from "../App";

const Error = () => {
  return <div>erro</div>;
};

const Routes = (): ReactElement => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route element={<App />} path="/" />
        <Route element={<Error />} path="/error" />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
