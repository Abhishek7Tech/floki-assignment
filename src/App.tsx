import { useAccount } from "wagmi";
import "./App.css";
import { WalletDrawer } from "./components/wallet-options";
import { SignMessage } from "./components/sign-message";

function App() {
  const { isConnected } = useAccount();
  console.log("IS connected", isConnected);
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
