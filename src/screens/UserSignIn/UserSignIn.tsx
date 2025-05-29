import { Button } from "../../components/ui/button";
import { useWallet } from '@suiet/wallet-kit';
import { useGoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { generateRandomness, jwtToAddress } from '@mysten/zklogin';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserSignIn = (): JSX.Element => {
  const { connected, connecting, select, disconnect, wallet } = useWallet();
  const [zkLoginAddress, setZkLoginAddress] = useState<string | null>(null);
  const [role, setRole] = useState<'user' | 'admin'>('user');
  const navigate = useNavigate();

  const adminEmails = ['admin@example.com', 'superadmin@domain.com'];

  const toggleRole = () => {
    setRole(role === 'user' ? 'admin' : 'user');
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

        const address = jwtToAddress({
          issuer,
          audience,
          subject,
          jwt: idToken,
        });

        const isAdmin = adminEmails.includes(userInfo.email);
        const userRole = isAdmin ? 'admin' : 'user';
        setRole(userRole);
        setZkLoginAddress(address);

        localStorage.setItem('user', JSON.stringify({
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          role: userRole,
          address,
        }));

        navigate(`/${userRole}/dashboard`);
      } catch (error) {
        console.error("Google zkLogin Error:", error);
      }
    },
    onError: error => console.error('Google Login Error:', error),
  });

  const handleWalletClick = async () => {
    if (connected) {
      await disconnect();
      localStorage.removeItem('user');
    } else {
      await select('Slush');
    }
  };

  useEffect(() => {
    if (connected && wallet?.address) {
      const stored = localStorage.getItem('user');
      if (!stored) {
        localStorage.setItem('user', JSON.stringify({
          role,
          address: wallet.address,
        }));
        navigate(`/${role}/dashboard`);
      } else {
        const user = JSON.parse(stored);
        navigate(`/${user.role}/dashboard`);
      }
    }
  }, [connected, wallet, navigate]);

  return (
    <main className="flex flex-col md:flex-row h-screen w-full bg-white">
      {/* Left Image Section */}
      <div className="w-full md:w-1/2 h-60 md:h-full">
        <img
          className="h-full w-full object-cover transition-all duration-300"
          alt="Map location illustration"
          src={role === 'admin' ? '/image.jpg' : '/image.png'}
        />
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-0">
        <div className="flex flex-col items-center w-full max-w-[367px] gap-8">
          <h1 className="font-bold text-xl md:text-2xl text-center font-serif">
            Sign in to your {role === 'admin' ? 'Admin' : 'User'} Account
          </h1>

          <div className="flex flex-col gap-4 w-full">
            {/* Toggle Button */}
            <div className="flex justify-end w-full">
              <Button
                variant="secondary"
                className="rounded-full text-sm"
                onClick={toggleRole}
              >
                Switch to {role === 'admin' ? 'User' : 'Admin'}
              </Button>
            </div>

            {/* Google Button */}
            <Button
              variant="outline"
              className="flex items-center justify-center gap-4 py-4 px-6 h-auto rounded-[20px] border-black text-base md:text-xl"
              onClick={() => googleLogin()}
            >
              <img
                className="w-6 h-6 md:w-[50px] md:h-[50px]"
                alt="Google"
                src="/icons8-google-96px-1.png"
              />
              <span className="font-light">Sign in with Google</span>
            </Button>

            {/* Wallet Button */}
            <Button
              className="flex items-center justify-center gap-4 py-4 px-6 h-auto rounded-[20px] bg-[#4d9fe0] text-base md:text-xl"
              onClick={handleWalletClick}
              disabled={connecting}
            >
              <img
                className="w-6 h-6 md:w-[50px] md:h-[50px]"
                alt="Wallet"
                src="/icons8-disconnected-64px-1-1.png"
              />
              <span className="font-light text-white">
                {connected ? 'Disconnect Wallet' : connecting ? 'Connecting...' : 'Connect Sui Wallet'}
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
