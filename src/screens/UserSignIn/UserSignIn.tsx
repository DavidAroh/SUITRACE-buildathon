// import { Button } from "../../components/ui/button";
// import { useWallet } from "@suiet/wallet-kit";
// import { useGoogleLogin } from "@react-oauth/google";
// import { jwtDecode } from "jwt-decode";
// import { generateRandomness, jwtToAddress } from "@mysten/zklogin";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export const UserSignIn = (): JSX.Element => {
//   const { connected, connecting, select, disconnect, wallet } = useWallet();
//   const [zkLoginAddress, setZkLoginAddress] = useState<string | null>(null);
//   const [role, setRole] = useState<"user" | "admin">("user");
//   const navigate = useNavigate();

//   const [adminEmails, setAdminEmails] = useState<string[]>([]);
//   const [adminWallets, setAdminWallets] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       const res = await fetch("/api/admins");
//       const data = await res.json();
//       setAdminEmails(data.emails || []);
//       setAdminWallets(data.wallets || []);
//     };
//     fetchAdmins();
//   }, []);


//   const toggleRole = () => {
//     setRole((prev) => (prev === "user" ? "admin" : "user"));
//   };

//   const googleLogin = useGoogleLogin({
//     flow: "implicit",
//     onSuccess: async (response) => {
//       try {
//         const accessToken = response.access_token;

//         const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });

//         const userInfo = await res.json();

//         let zkLoginAddr: string | null = null;

//         try {
//           const idToken = response.id_token;

//           if (idToken) {
//             const decoded: any = jwtDecode(idToken);

//             const issuer = "https://accounts.google.com";
//             const audience = decoded.aud;
//             const subject = decoded.sub;

//             const nonce = generateRandomness();

//             zkLoginAddr = jwtToAddress({
//               issuer,
//               audience,
//               subject,
//               jwt: idToken,
//             });

//             setZkLoginAddress(zkLoginAddr);
//           }
//         } catch (err) {
//           console.warn("Failed to decode JWT or generate zkLogin address:", err);
//         }

//         // Optional: Validate if user is allowed as admin
//         // Allow anyone to sign in as admin temporarily
//         if (role === "admin" && !adminEmails.includes(userInfo.email)) {
//           console.warn("New admin signing in:", userInfo.email);
//           // Optionally: Add email to adminEmails dynamically
//           setAdminEmails((prev) => [...prev, userInfo.email]);
//         }


//         const userRole = role; // Use toggled role

//         localStorage.setItem(
//           "user",
//           JSON.stringify({
//             name: userInfo.name,
//             email: userInfo.email,
//             picture: userInfo.picture,
//             role: userRole,
//             address: zkLoginAddr,
//           })
//         );

//         navigate(`/${userRole}/dashboard`);
//       } catch (error) {
//         console.error("Google zkLogin Error:", error);
//       }
//     },

//     onError: (error) => console.error("Google Login Error:", error),
//   });

//   const handleWalletClick = async () => {
//     if (connected) {
//       await disconnect();
//       localStorage.removeItem("user");
//     } else {
//       await select("Slush");
//     }
//   };

//   useEffect(() => {
//     if (connected && wallet?.address) {
//       const stored = localStorage.getItem("user");

//       if (!stored) {
//         // Allow new wallet-based admin temporarily
//         if (role === "admin" && !adminWallets.includes(wallet.address)) {
//           console.warn("New admin wallet signing in:", wallet.address);
//           // Optionally: Add to adminWallets dynamically
//           setAdminWallets((prev) => [...prev, wallet.address]);
//         }


//         const userRole = role;

//         const userData = {
//           role: userRole,
//           address: wallet.address,
//           name: "Wallet User",
//           email: "",
//           picture: "",
//         };

//         localStorage.setItem("user", JSON.stringify(userData));
//         navigate(`/${userRole}/dashboard`);
//       } else {
//         const parsed = JSON.parse(stored);
//         const userRole = parsed.role || "user";
//         navigate(`/${userRole}/dashboard`);
//       }
//     }
//   }, [connected, wallet, role, navigate]);

//   return (
//     <main className="flex flex-col md:flex-row h-screen w-full bg-white">
//       {/* Left Image Section */}
//       <div className="w-full md:w-1/2 h-60 md:h-full">
//         <img
//           className="h-full w-full object-cover transition-all duration-300"
//           alt="Map location illustration"
//           src={role === "admin" ? "/image.jpg" : "/image.png"}
//         />
//       </div>

//       {/* Right Panel */}
//       <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-0">
//         <div className="flex flex-col items-center w-full max-w-[367px] gap-8">
//           <h1 className="font-bold text-xl md:text-2xl text-center font-sans">
//             Sign in to your {role === "admin" ? "Admin" : "User"} Account
//           </h1>

//           <div className="flex flex-col gap-4 w-full">
//             {/* Toggle Button */}
//             <div className="flex justify-end w-full">
//               <Button
//                 variant="secondary"
//                 className="rounded-full text-sm"
//                 onClick={toggleRole}
//               >
//                 Switch to {role === "admin" ? "User" : "Admin"}
//               </Button>
//             </div>

//             {/* Google Button */}
//             <Button
//               variant="outline"
//               className="flex items-center justify-center gap-4 py-4 px-6 h-auto rounded-[20px] border-black text-base md:text-xl"
//               onClick={() => googleLogin()}
//             >
//               <img
//                 className="w-6 h-6 md:w-[50px] md:h-[50px]"
//                 alt="Google"
//                 src="/icons8-google-96px-1.png"
//               />
//               <span className="font-light">Sign in with Google</span>
//             </Button>

//             {/* Wallet Button */}
//             <Button
//               className="flex items-center justify-center gap-4 py-4 px-6 h-auto rounded-[20px] bg-[#4d9fe0] text-base md:text-xl"
//               onClick={handleWalletClick}
//               disabled={connecting}
//             >
//               <img
//                 className="w-6 h-6 md:w-[50px] md:h-[50px]"
//                 alt="Wallet"
//                 src="/icons8-disconnected-64px-1-1.png"
//               />
//               <span className="font-light text-white">
//                 {connected
//                   ? "Disconnect Wallet"
//                   : connecting
//                     ? "Connecting..."
//                     : "Connect Sui Wallet"}
//               </span>
//             </Button>

//             {/* zkLogin Address */}
//             {zkLoginAddress && (
//               <div className="mt-2 text-center">
//                 <p className="text-sm text-gray-600">zkLogin Address:</p>
//                 <p className="text-sm font-mono break-all">{zkLoginAddress}</p>
//               </div>
//             )}

//             {/* Wallet Address */}
//             {connected && wallet && (
//               <div className="mt-2 text-center">
//                 <p className="text-sm text-gray-600">
//                   Connected Wallet Address:
//                 </p>
//                 <p className="text-sm font-mono break-all">{wallet.address}</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

import { Button } from "../../components/ui/button";
import { useWallet } from "@suiet/wallet-kit";
import { useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { generateRandomness, jwtToAddress } from "@mysten/zklogin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { suiContractService } from "../../lib/suiClient";

export const UserSignIn = (): JSX.Element => {
  const { connected, connecting, select, disconnect, wallet } = useWallet();
  const [zkLoginAddress, setZkLoginAddress] = useState<string | null>(null);
  const [role, setRole] = useState<"user" | "admin">("user");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [adminEmails, setAdminEmails] = useState<string[]>([]);
  const [adminWallets, setAdminWallets] = useState<string[]>([]);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await fetch("/api/admins");
        const data = await res.json();
        setAdminEmails(data.emails || []);
        setAdminWallets(data.wallets || []);
      } catch (error) {
        console.error("Error fetching admin lists:", error);
      }
    };
    fetchAdmins();

    // Initialize zkLogin state
    suiContractService.initializeZkLogin();
  }, []);

  const toggleRole = () => {
    setRole((prev) => (prev === "user" ? "admin" : "user"));
  };

  const googleLogin = useGoogleLogin({
    flow: "implicit",
    onSuccess: async (response) => {
      setLoading(true);
      try {
        const accessToken = response.access_token;

        const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const userInfo = await res.json();
        let zkLoginAddr: string | null = null;
        let jwt: string | null = null;

        try {
          const idToken = response.id_token;

          if (idToken) {
            jwt = idToken;
            const decoded: any = jwtDecode(idToken);

            const issuer = "https://accounts.google.com";
            const audience = decoded.aud;
            const subject = decoded.sub;

            // Generate user salt for zkLogin
            const userSalt = generateRandomness();

            zkLoginAddr = jwtToAddress({
              issuer,
              audience,
              subject,
              jwt: idToken,
            });

            setZkLoginAddress(zkLoginAddr);

            // Set zkLogin credentials in the service
            suiContractService.setZkLoginCredentials(
              zkLoginAddr,
              jwt,
              userSalt.toString()
            );
          }
        } catch (err) {
          console.warn("Failed to decode JWT or generate zkLogin address:", err);
        }

        // Admin validation
        if (role === "admin" && !adminEmails.includes(userInfo.email)) {
          console.warn("New admin signing in:", userInfo.email);
          setAdminEmails((prev) => [...prev, userInfo.email]);
        }

        const userRole = role;

        // Store user data including zkLogin info
        const userData = {
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture,
          role: userRole,
          address: zkLoginAddr,
          jwt: jwt,
          salt: suiContractService.zkLoginState?.salt,
        };

        localStorage.setItem("user", JSON.stringify(userData));

        navigate(`/${userRole}/dashboard`);
      } catch (error) {
        console.error("Google zkLogin Error:", error);
      } finally {
        setLoading(false);
      }
    },

    onError: (error) => {
      console.error("Google Login Error:", error);
      setLoading(false);
    },
  });

  const handleWalletClick = async () => {
    setLoading(true);
    try {
      if (connected) {
        await disconnect();
        localStorage.removeItem("user");
        suiContractService.logout();
      } else {
        await select("Slush");
      }
    } catch (error) {
      console.error("Wallet operation error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (connected && wallet?.address) {
      const stored = localStorage.getItem("user");

      if (!stored) {
        // Admin validation for wallet
        if (role === "admin" && !adminWallets.includes(wallet.address)) {
          console.warn("New admin wallet signing in:", wallet.address);
          setAdminWallets((prev) => [...prev, wallet.address]);
        }

        const userRole = role;

        const userData = {
          role: userRole,
          address: wallet.address,
          name: "Wallet User",
          email: "",
          picture: "",
        };

        localStorage.setItem("user", JSON.stringify(userData));
        
        // For wallet connections, we don't have zkLogin but can still use regular Sui transactions
        navigate(`/${userRole}/dashboard`);
      } else {
        const parsed = JSON.parse(stored);
        const userRole = parsed.role || "user";
        navigate(`/${userRole}/dashboard`);
      }
    }
  }, [connected, wallet, role, navigate]);

  return (
    <main className="flex flex-col md:flex-row h-screen w-full bg-white">
      {/* Left Image Section */}
      <div className="w-full md:w-1/2 h-60 md:h-full">
        <img
          className="h-full w-full object-cover transition-all duration-300"
          alt="Map location illustration"
          src={role === "admin" ? "/image.jpg" : "/image.png"}
        />
      </div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-0">
        <div className="flex flex-col items-center w-full max-w-[367px] gap-8">
          <h1 className="font-bold text-xl md:text-2xl text-center font-sans">
            Sign in to your {role === "admin" ? "Admin" : "User"} Account
          </h1>

          <div className="flex flex-col gap-4 w-full">
            {/* Toggle Button */}
            <div className="flex justify-end w-full">
              <Button
                variant="secondary"
                className="rounded-full text-sm"
                onClick={toggleRole}
                disabled={loading}
              >
                Switch to {role === "admin" ? "User" : "Admin"}
              </Button>
            </div>

            {/* Google Button */}
            <Button
              variant="outline"
              className="flex items-center justify-center gap-4 py-4 px-6 h-auto rounded-[20px] border-black text-base md:text-xl"
              onClick={() => googleLogin()}
              disabled={loading}
            >
              <img
                className="w-6 h-6 md:w-[50px] md:h-[50px]"
                alt="Google"
                src="/icons8-google-96px-1.png"
              />
              <span className="font-light">
                {loading ? "Signing in..." : "Sign in with Google"}
              </span>
            </Button>

            {/* Wallet Button */}
            <Button
              className="flex items-center justify-center gap-4 py-4 px-6 h-auto rounded-[20px] bg-[#4d9fe0] text-base md:text-xl"
              onClick={handleWalletClick}
              disabled={connecting || loading}
            >
              <img
                className="w-6 h-6 md:w-[50px] md:h-[50px]"
                alt="Wallet"
                src="/icons8-disconnected-64px-1-1.png"
              />
              <span className="font-light text-white">
                {connected
                  ? "Disconnect Wallet"
                  : connecting || loading
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

            {/* Authentication Status */}
            {suiContractService.isAuthenticated() && (
              <div className="mt-2 text-center">
                <p className="text-sm text-green-600">
                  ✅ Authenticated with Sui Network
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};