import { http, createConfig } from "wagmi";
import { mainnet, sepolia, bsc } from "wagmi/chains";
import { metaMask, walletConnect } from "wagmi/connectors";
const projectId = import.meta.env.VITE_PROJECT_ID || "";

export const config = createConfig({
  chains: [mainnet, sepolia, bsc],
  connectors: [walletConnect({ projectId }), metaMask()],
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [sepolia.id]: http(),
  },
});
