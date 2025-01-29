import { useAccount, useAccountEffect } from "wagmi";
import "./App.css";
import { WalletDrawer } from "./components/wallet-options";
import { SignMessage } from "./components/sign-message";
import { toast } from "sonner";

function App() {
  const { isConnected } = useAccount();
  useAccountEffect({
    onConnect() {
      toast("Connected! ");
    },
    onDisconnect() {
      toast("Disconnected!");
    },
  });
  return (
    <>
      <div className="h-screen flex flex-col justify-center items-center">
        {!isConnected && <WalletDrawer />}
        {isConnected && <SignMessage />}
      </div>
    </>
  );
}

export default App;
