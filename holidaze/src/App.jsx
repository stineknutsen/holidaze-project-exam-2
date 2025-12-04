import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import VenuePage from "./pages/VenuePage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/venues/:id" element={<VenuePage />} />
        <Route path="*" element={<div>NoPage</div>} />
      </Route>
    </Routes>
  );
}
