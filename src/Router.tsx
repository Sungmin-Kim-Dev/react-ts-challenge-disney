import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Detail from "./pages/Detail";

const Router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="character/:id" element={<Detail />} />
    </Route>
  )
);

export default Router;
