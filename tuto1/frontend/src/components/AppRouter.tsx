import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import Menu from "./Menu";
import MenuCatagory from "./MenuCatagory";
import Setting from "./Setting";
import Register from "./register";
import Login from "./Login";
import PraviteRoute from "./PraviteRoute";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PraviteRoute />}>
          <Route path="/" element={<App />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menuCatagory" element={<MenuCatagory />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
