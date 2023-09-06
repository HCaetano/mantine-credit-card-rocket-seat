import type { ReactElement } from "react";
import { Route, BrowserRouter, Routes as RouterRoutes } from "react-router-dom";
import { CreditCardDetails, CreditCardList, Error } from "../pages";
import Home from "../pages/Home/Home";

const Routes = (): ReactElement => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route element={<Home />} path="/" />
        <Route element={<CreditCardList />} path="/cards" />
        <Route element={<CreditCardDetails />} path="/card/:id" />
        <Route path="*" element={<Error />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
