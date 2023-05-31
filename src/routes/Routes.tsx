import type { ReactElement } from "react";
import { Route, BrowserRouter, Routes as RouterRoutes } from "react-router-dom";
import App from "../App";

const Routes = (): ReactElement => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route element={<App />} path="/" />
        <Route element={<App />} path="/cards" />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
