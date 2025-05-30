// index.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "@suiet/wallet-kit";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { UserSignIn } from "./screens/UserSignIn/UserSignIn";
import { UserDashboard } from "./screens/UserDashboard/UserDashboard";
import { AdminDashboard } from "./screens/AdminDashboard/AdminDashboard";
import { Layout } from "./components/Layouts/Layout";
import { ProtectedRoute } from "./screens/ProtectedRoute";

const GOOGLE_CLIENT_ID =
  "453868623338-t58gb2dgau19up6i4sb6aav0e6npqau3.apps.googleusercontent.com";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <WalletProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserSignIn />} />

            <Route
              path="/user/dashboard"
              element={
                <ProtectedRoute role="user">
                  <Layout>
                    <UserDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <Layout>
                    <AdminDashboard />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </WalletProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
