import { Button } from "../../components/ui/button";
import { useWallet } from '@suiet/wallet-kit';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import {
  generateRandomness,
  jwtToAddress,
  // createZkLoginSignature, // Uncomment if you use this later
} from '@mysten/zklogin';
import { useState } from 'react';

export const UserSignIn = (): JSX.Element => {
  const { connected, connecting, select, disconnect, wallet } = useWallet();
  const [zkLoginAddress, setZkLoginAddress] = useState<string | null>(null);

  const handleWalletClick = async () => {
    if (connected) {
      await disconnect();
    } else {
      await select('Slush');
    }
  };

  const googleLogin = useGoogleLogin({
    flow: 'implicit',
    onSuccess: async (response) => {
      try {
        const accessToken = response.access_token;

        const res = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const userInfo = await res.json();

        const idToken = response.id_token || '';

        const decoded: any = jwtDecode(idToken);
        const issuer = `https://accounts.google.com`;
        const audience = decoded.aud;
        const subject = decoded.sub;

        const ephemeralPrivateKey = generateRandomness(); // for zkLogin proof generation
        const address = jwtToAddress({
          issuer,
          audience,
          subject,
          jwt: idToken,
        });

        setZkLoginAddress(address)
        console.log("ZkLogin Address:", address);

        // TODO: Generate zkLogin signature/proof here if needed.
      } catch (error) {
        console.error("Google zkLogin Error:", error);
      }
    },
    onError: error => console.error('Google Login Error:', error),
  });

  return (
    <main className="flex h-screen w-medium bg-white">
      {/* Left Image Section */}
      <div className="relative w-1/2 h-full">
        <img
          className="h-full w-full object-cover"
          alt="Map location illustration"
          src="/image.png"
        />
      </div>

      {/* Right Sign-In Panel */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="flex flex-col items-center w-[367px] gap-11">
          <h1 className="font-bold text-2xl text-center font-seriff">
            Sign in to your Account
          </h1>

          <div className="flex flex-col gap-5 w-full">
            {/* Google zkLogin Button */}
            <Button
              variant="outline"
              className="flex items-center justify-center gap-5 py-5 px-10 h-auto rounded-[20px] border-black"
              onClick={() => googleLogin()}
            >
              <img
                className="w-[50px] h-[50px] object-cover"
                alt="Google"
                src="/icons8-google-96px-1.png"
              />
              <span className="font-light text-2xl">Sign in with Google</span>
            </Button>

            {/* Sui Wallet Button */}
            <Button 
              className="flex items-center justify-center gap-5 py-5 px-10 h-auto rounded-[20px] bg-[#4d9fe0]"
              onClick={handleWalletClick}
              disabled={connecting}
            >
              <img
                className="w-[50px] h-[50px] object-cover"
                alt="Disconnected"
                src="/icons8-disconnected-64px-1-1.png"
              />
              <span className="font-light text-2xl text-white">
                {connected ? 'Disconnect Wallet' : connecting ? 'Connecting...' : 'Connect Sui Wallet'}
              </span>
            </Button>

            {/* Display zkLogin Address */}
            {zkLoginAddress && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">zkLogin Address:</p>
                <p className="text-sm font-mono break-all">{zkLoginAddress}</p>
              </div>
            )}

            {/* Display Connected Wallet Address */}
            {connected && wallet && (
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Connected Wallet Address:</p>
                <p className="text-sm font-mono break-all">{wallet.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
