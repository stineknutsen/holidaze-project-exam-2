import "./App.css";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<div>HomePage</div>} />
        <Route path="/login" element={<div>HomePage</div>} />
        <Route path="/register" element={<div>RegisterPage</div>} />
        <Route path="/profile" element={<div>LoginPage</div>} />
        <Route path="/venues:id" element={<div>VenuePage</div>} />
        <Route path="*" element={<div>NoPage</div>} />
      </Route>
    </Routes>
  );
}
