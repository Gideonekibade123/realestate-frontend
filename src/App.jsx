// // import { BrowserRouter, Routes, Route } from "react-router-dom";
// // import { AuthProvider } from "./context/AuthContext";
// // import Navbar from "./components/Navbar";
// // import HomePage from "./pages/HomePage";
// // import ListingsPage from "./pages/ListingsPage";
// // import ListingDetailPage from "./pages/ListingDetailPage";
// // import ListingFormPage from "./pages/ListingFormPage";
// // import DashboardPage from "./pages/DashboardPage";
// // import { LoginPage, RegisterPage } from "./pages/AuthPages";
// // import ActivatePage from "./pages/ActivatePage";

// // export default function App() {
// //   return (
// //     <AuthProvider>
// //       <BrowserRouter>
// //         <Navbar />
// //         <Routes>
// //           <Route path="/" element={<HomePage />} />
// //           <Route path="/listings" element={<ListingsPage />} />
// //           <Route path="/listings/new" element={<ListingFormPage />} />
// //           <Route path="/listings/:id" element={<ListingDetailPage />} />
// //           <Route path="/listings/:id/edit" element={<ListingFormPage />} />
// //           <Route path="/dashboard" element={<DashboardPage />} />
// //           <Route path="/login" element={<LoginPage />} />
// //           <Route path="/register" element={<RegisterPage />} />
// //           <Route path="/activate/:uidb64/:token" element={<ActivatePage />} />
// //         </Routes>
// //       </BrowserRouter>
// //     </AuthProvider>
// //   );
// // }



















// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";
// import Navbar from "./components/Navbar";
// import HomePage from "./pages/HomePage";
// import ListingsPage from "./pages/ListingsPage";
// import ListingDetailPage from "./pages/ListingDetailPage";
// import ListingFormPage from "./pages/ListingFormPage";
// import DashboardPage from "./pages/DashboardPage";
// import { LoginPage, RegisterPage } from "./pages/AuthPages";
// import ActivatePage from "./pages/ActivatePage";
// import ChangePasswordPage from "./pages/ChangePasswordPage"; // ✅ add import
// import { useEffect } from "react";  // ✅ add this
// import BASE_URL from "./api";       // ✅ add this

// export default function App() {
//   // ✅ Wake up Render server when app loads
//   useEffect(() => {
//     fetch(`${BASE_URL}/api/listings/`).catch(() => {});
//   }, []);

//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Navbar />
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/listings" element={<ListingsPage />} />
//           <Route path="/listings/new" element={<ListingFormPage />} />
//           <Route path="/listings/:id" element={<ListingDetailPage />} />
//           <Route path="/listings/:id/edit" element={<ListingFormPage />} />
//           <Route path="/dashboard" element={<DashboardPage />} />
//           <Route path="/login" element={<LoginPage />} />
//           <Route path="/register" element={<RegisterPage />} />
//           <Route path="/activate/:uidb64/:token" element={<ActivatePage />} />
//           <Route path="/change-password" element={<ChangePasswordPage />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   );
// }




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
import ChangePasswordPage from "./pages/ChangePasswordPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";  // ✅ added
import ResetPasswordPage from "./pages/ResetPasswordPage";    // ✅ added
import { useEffect } from "react";
import BASE_URL from "./api";

export default function App() {
  useEffect(() => {
    fetch(`${BASE_URL}/api/listings/`).catch(() => {});
  }, []);

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
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />                    {/* ✅ added */}
          <Route path="/reset-password/:uidb64/:token" element={<ResetPasswordPage />} />       {/* ✅ added */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}