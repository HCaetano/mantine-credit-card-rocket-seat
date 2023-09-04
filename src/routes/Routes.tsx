import type { ReactElement } from "react";
import { Route, BrowserRouter, Routes as RouterRoutes } from "react-router-dom";
import App from "../App";
import { CreditCardDetails, CreditCardList, Error } from "../pages";

const Routes = (): ReactElement => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route element={<App />} path="/" />
        <Route element={<CreditCardList />} path="/cards" />
        <Route element={<CreditCardDetails />} path="/card/:id" />
        <Route path="*" element={<Error />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
