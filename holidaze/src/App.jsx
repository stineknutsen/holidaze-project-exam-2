import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>HomePage</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<div>ProfilePage</div>} />
        <Route path="/venues:id" element={<div>VenuePage</div>} />
        <Route path="*" element={<div>NoPage</div>} />
      </Route>
    </Routes>
  );
}
