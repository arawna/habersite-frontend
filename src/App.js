import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navi from "./Components/Navi";
import AddNews from "./Pages/AddNews";
import AdminCategories from "./Pages/AdminCategories";
import AdminUsers from "./Pages/AdminUsers";
import CategoryNews from "./Pages/CategoryNews";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import OneNew from "./Pages/OneNew";
import Register from "./Pages/Register";

function App() {
  return (
    <>
      <Navi />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/kulkanicilar" element={<AdminUsers />} />
        <Route path="/kategoriyonetim" element={<AdminCategories />} />
        <Route path="/haberekle" element={<AddNews />} />
        <Route path="/category/:id" element={<CategoryNews />} />
        <Route path="/new/:id" element={<OneNew />} />
      </Routes>
    </>
  );
}

export default App;
