import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { config } from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";

import App from "./App.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster className="bg-black text-white font-medium"/>
      </QueryClientProvider>
    </WagmiProvider>
  </StrictMode>
);
