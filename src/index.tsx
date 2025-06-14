import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@suiet/wallet-kit";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { UserSignIn } from "./screens/UserSignIn/UserSignIn";
import { UserDashboard } from "./screens/UserDashboard/UserDashboard";
import { TrackingPage } from "./screens/UserDashboard/TrackingPage";
import { AdminDashboard } from "./screens/AdminDashboard/AdminDashboard";
import { AddProduct } from "./screens/AdminDashboard/AddProduct";
import { UpdateProductRecord } from "./screens/AdminDashboard/UpdateProductRecord";
import { Homepage } from "./screens/landing-page";
import { UserLayout } from "./components/Layouts/UserLayout";
import { AdminLayout } from "./components/Layouts/AdminLayout";
import { ProtectedRoute } from "./screens/ProtectedRoute";

const GOOGLE_CLIENT_ID =
  "453868623338-vee9rmbp45sc1gon5ld27h1rprq5ahlo.apps.googleusercontent.com";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <WalletProvider>
        <BrowserRouter>
          <Routes>
            {/* Public Route */}
            <Route path="/" element={<Homepage />} />
            <Route path="/sign-in" element={<UserSignIn />} />

            {/* Protected User Route with Navbar */}
            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute role="user">
                  <UserLayout>
                    <UserDashboard />
                  </UserLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/user/tracking"
              element={
                <ProtectedRoute role="user">
                  <UserLayout>
                    <TrackingPage />
                  </UserLayout>
                </ProtectedRoute>
              }
            />

            {/* Protected Admin Route with Sidebar */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout>
                    <AdminDashboard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/addproduct"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout>
                    <AddProduct />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/updateproduct"
              element={
                <ProtectedRoute role="admin">
                  <AdminLayout>
                    <UpdateProductRecord />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />

          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
