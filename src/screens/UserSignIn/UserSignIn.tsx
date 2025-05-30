import { Button } from "../../components/ui/button";
import { useWallet } from "@suiet/wallet-kit";
import { CredentialResponse, useGoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import {
  jwtToAddress,
  generateNonce,
  generateRandomness,
} from "@mysten/zklogin";
import { Ed25519Keypair } from "@mysten/sui.js/keypairs/ed25519";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserSignIn = (): JSX.Element => {
  const { connected, connecting, select, disconnect, wallet } = useWallet();
  const [zkLoginAddress, setZkLoginAddress] = useState<string | null>(null);
  const [role, setRole] = useState<"user" | "admin">("user");
  const [ephemeralKeyPair] = useState(() => new Ed25519Keypair());
  const [randomness] = useState(() => generateRandomness());
  const maxEpoch = 100000; // Replace with current epoch if needed
  const navigate = useNavigate();

  const adminEmails = ["admin@example.com", "superadmin@domain.com"];
  const adminWallets = ["0xAdminWalletAddress1", "0xAdminWalletAddress2"];

  const toggleRole = () => {
    setRole((prev) => (prev === "user" ? "admin" : "user"));
  };

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    scope: "openid email profile",
    onSuccess: async (response) => {
      try {
        const { credential: idToken } = response as CredentialResponse;

        if (!idToken) throw new Error("No ID token received");

        const decoded: any = jwtDecode(idToken);
        const issuer = "https://accounts.google.com";
        const audience = decoded.aud;
        const subject = decoded.sub;

        const nonce = generateNonce(
          ephemeralKeyPair.getPublicKey(),
          maxEpoch,
          randomness
        );
        const jwt = idToken;
        const zkLoginAddr = jwtToAddress({ issuer, audience, subject, jwt });
        setZkLoginAddress(zkLoginAddr);

        const { createZkLoginSignature, extractPublicInputs } = await import(
          "@mysten/zklogin"
        );
        const publicInputs = extractPublicInputs({
          jwt,
          maxEpoch,
          ephemeralPublicKey: ephemeralKeyPair.getPublicKey(),
          randomness,
          salt: "0",
        });

        const zkLoginSignature = await createZkLoginSignature({
          inputs: publicInputs,
          maxEpoch,
          ephemeralKeyPair,
          jwt,
        });

        const res = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: { Authorization: `Bearer ${response.access_token}` },
          }
        );

        const userInfo = await res.json();
        const isAdmin = adminEmails.includes(userInfo.email);
        const userRole = isAdmin ? "admin" : "user";
        setRole(userRole);

        localStorage.setItem(
          "user",
          JSON.stringify({
            name: userInfo.name,
            email: userInfo.email,
            picture: userInfo.picture,
            role: userRole,
            address: zkLoginAddr,
          })
        );

        navigate(`/${userRole}/dashboard`);
      } catch (err) {
        console.error("zkLogin Google Auth Error:", err);
      }
    },
  });

  const handleWalletClick = async () => {
    if (connected) {
      await disconnect();
      localStorage.removeItem("user");
    } else {
      await select("Slush"); // Replace with your wallet name if different
    }
  };

  useEffect(() => {
    if (connected && wallet?.address) {
      const stored = localStorage.getItem("user");
      if (!stored) {
        const userRole = adminWallets.includes(wallet.address)
          ? "admin"
          : "user";
        const userData = {
          role: userRole,
          address: wallet.address,
          name: "Wallet User",
          email: "",
          picture: "",
        };

        localStorage.setItem("user", JSON.stringify(userData));
        navigate(`/${userRole}/dashboard`);
      } else {
        const parsed = JSON.parse(stored);
        const userRole = parsed.role || "user";
        navigate(`/${userRole}/dashboard`);
      }
    }
  }, [connected, wallet, navigate]);

  return (
    <main className="flex flex-col md:flex-row h-screen w-full bg-white">
      {/* Left Image */}
      <div className="w-full md:w-1/2 h-60 md:h-full">
        <img
          className="h-full w-full object-cover"
          src={role === "admin" ? "/image.jpg" : "/image.png"}
          alt="Auth Banner"
        />
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-0">
        <div className="flex flex-col items-center w-full max-w-[367px] gap-8">
          <h1 className="font-bold text-xl md:text-2xl text-center">
            Sign in to your {role === "admin" ? "Admin" : "User"} Account
          </h1>

          <div className="flex flex-col gap-4 w-full">
            {/* Role Toggle */}
            <div className="flex justify-end">
              <Button
                variant="secondary"
                className="rounded-full text-sm"
                onClick={toggleRole}
              >
                Switch to {role === "admin" ? "User" : "Admin"}
              </Button>
            </div>

            {/* Google Login */}
            <Button
              variant="outline"
              className="flex items-center justify-center gap-4 py-4 px-6 h-auto rounded-[20px] border-black text-base md:text-xl"
              onClick={() => googleLogin()}
            >
              <img
                className="w-6 h-6 md:w-[50px] md:h-[50px]"
                src="/icons8-google-96px-1.png"
                alt="Google Icon"
              />
              <span className="font-light">Sign in with Google</span>
            </Button>

            {/* Wallet Connect */}
            <Button
              className="flex items-center justify-center gap-4 py-4 px-6 h-auto rounded-[20px] bg-[#4d9fe0] text-base md:text-xl"
              onClick={handleWalletClick}
              disabled={connecting}
            >
              <img
                className="w-6 h-6 md:w-[50px] md:h-[50px]"
                src="/icons8-disconnected-64px-1-1.png"
                alt="Wallet Icon"
              />
              <span className="font-light text-white">
                {connected
                  ? "Disconnect Wallet"
                  : connecting
                  ? "Connecting..."
                  : "Connect Sui Wallet"}
              </span>
            </Button>

            {/* zkLogin Address */}
            {zkLoginAddress && (
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-600">zkLogin Address:</p>
                <p className="text-sm font-mono break-all">{zkLoginAddress}</p>
              </div>
            )}

            {/* Wallet Address */}
            {connected && wallet && (
              <div className="mt-2 text-center">
                <p className="text-sm text-gray-600">
                  Connected Wallet Address:
                </p>
                <p className="text-sm font-mono break-all">{wallet.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
