import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ListingsPage from "./pages/ListingsPage";
import ListingDetailPage from "./pages/ListingDetailPage";
import ListingFormPage from "./pages/ListingFormPage";
import DashboardPage from "./pages/DashboardPage";
import { LoginPage, RegisterPage } from "./pages/AuthPages";
import ActivatePage from "./pages/ActivatePage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/listings/new" element={<ListingFormPage />} />
          <Route path="/listings/:id" element={<ListingDetailPage />} />
          <Route path="/listings/:id/edit" element={<ListingFormPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/activate/:uidb64/:token" element={<ActivatePage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}