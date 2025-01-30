import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import {
  useAccount,
  useDisconnect,
  useSignMessage,
  useSwitchChain,
} from "wagmi";
import { mainnet, sepolia, bsc } from "@wagmi/core/chains";
import { config } from "../../config";
import Eth from "@/assets/eth.svg";
import BNB from "@/assets/bnb.svg";
import Synergy from "@/assets/Synergy.svg";
import { Button } from "./ui/button";
import Logout from "@/assets/logout.svg";
import { getBalance } from "@wagmi/core";
import { useEffect, useState } from "react";
import { recoverMessageAddress } from "viem";
import { toast } from "sonner";
export function SignMessage() {
  const { chains, switchChain } = useSwitchChain();
  const account = useAccount();
  const { disconnect } = useDisconnect();
  const {
    data: signMessageData,
    error,
    signMessage,
    isSuccess,
    variables,
  } = useSignMessage();
  const [chainId, setChainId] = useState<number | undefined>(account.chainId);
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (error) {
        toast(`${error.message} ❌`);
        return;
      }

      if (variables?.message && signMessageData) {
        const recoveredAddress = await recoverMessageAddress({
          message: variables?.message,
          signature: signMessageData,
        });
        console.log("Address recovered", recoveredAddress);
      }
      if (isSuccess) {
        toast("Verified. ✅");
        return;
      }
    })();
  }, [account, signMessageData, variables?.message]);

  async function signMessageHandler(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    console.log("Connector", account.connector);
    signMessage({ message: "hello world!", connector: account.connector });
  }

  function disconnectWalletHandler() {
    disconnect();
    toast("Wallet disconnected.");
  }

  useEffect(() => {
    (async () => {
      if (!account.address || !chainId) {
        console.log("Address not found");
        return;
      }

      console.log("Chaineffect", chainId);
      const balances = await getBalance(config, {
        address: account.address,
        chainId: chainId as 1 | 56 | 11155111 | undefined,
      });
      console.log("Bal", balances);
      const accountBalance =
        balances.value.toString().slice(0, 3) + " " + balances.symbol;
      setBalance(accountBalance);
    })();
  }, [account.address, chainId]);

  const sliceAccountAddress =
    account.address?.slice(0, 4) +
    "..." +
    account.address?.slice(account.address.length - 4, account.address.length);

  async function chainHandler(chain: string) {
    if (chain === "Ethereum") {
      setChainId(mainnet.id);
      return;
    }
    if (chain === "BNB Smart Chain") {
      setChainId(bsc.id);
      return;
    }
    setChainId(sepolia.id);
  }
  return (
    <div className="flex gap-4">
      <Select onValueChange={chainHandler} defaultValue={account.chain?.name}>
        <SelectTrigger className="w-[180px] bg-[#F2F5F8] rounded-[10px]">
          <SelectValue></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {chains.map((chain, idx) => {
              return (
                <SelectItem
                  onClick={() => switchChain({ chainId: chain.id })}
                  value={chain.name}
                  key={idx}
                >
                  <div className="flex gap-2 font-medium text-sm items-center chain-div">
                    <img
                      src={chain.name !== "BNB Smart Chain" ? Eth : BNB}
                      alt={`${chain.name} logo`}
                    ></img>
                    <span>{chain.name}</span>
                  </div>
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div className="flex flex-col gap-2">
        <Select>
          <SelectTrigger className="p-4 bg-[#F2F5F8] rounded-[10px]">
            <span>{balance ? balance : "..."}</span>
            <img src={Synergy} alt="wallet logo"></img>
            <span>{sliceAccountAddress}</span>
          </SelectTrigger>
        </Select>

        <div className="bg-[#F2F5F8] rounded-[10px] flex flex-col gap-2 p-4">
          <Button
            onClick={(e) => signMessageHandler(e)}
            className="w-[210px] rounded-[10px]"
          >
            Sign Message
          </Button>
          <Button
            onClick={() => disconnectWalletHandler()}
            variant="outline"
            className="w-[210px] flex gap-1 rounded-[10px]"
          >
            <img src={Logout} alt="disconnect button icon"></img>{" "}
            <span>Disconnect</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
