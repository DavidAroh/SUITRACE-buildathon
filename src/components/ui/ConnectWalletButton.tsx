// ConnectWalletButton.tsx
import { ConnectButton } from "@mysten/dapp-kit";
import { Button } from "./button";

export const ConnectWalletButton = () => {
  return (
    <Button asChild variant="default" size="default">
      <ConnectButton />
    </Button>
  );
};
