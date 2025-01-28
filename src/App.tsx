import "./App.css";
import { WagmiProvider } from "wagmi";
import { config } from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WalletDrawer } from "./components/wallet-options";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <div className="h-screen flex flex-col justify-center items-center">
            <WalletDrawer />
          </div>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
