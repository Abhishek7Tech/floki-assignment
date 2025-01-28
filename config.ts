import { http, createConfig } from "wagmi";
import { mainnet, sepolia, bsc } from "wagmi/chains";
import {  metaMask, walletConnect } from "wagmi/connectors";

const projectId = "";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [ walletConnect({ projectId }), metaMask()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
  },
});
