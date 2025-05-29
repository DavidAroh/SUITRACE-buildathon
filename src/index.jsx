import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WalletProvider } from '@suiet/wallet-kit';
import { SlushProvider } from '@slush-wallet/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UserSignIn } from "./screens/UserSignIn";
import '@suiet/wallet-kit/style.css';

const GOOGLE_CLIENT_ID = "453868623338-t58gb2dgau19up6i4sb6aav0e6npqau3.apps.googleusercontent.com"; // Replace with your actual Google Client ID

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <WalletProvider>
        <SlushProvider>
          <UserSignIn />
        </SlushProvider>
      </WalletProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);