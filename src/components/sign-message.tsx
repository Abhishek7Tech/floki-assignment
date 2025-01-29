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
import { config } from "../../config";
import Eth from "@/assets/eth.svg";
import BNB from "@/assets/bnb.svg";
import Synergy from "@/assets/Synergy.svg";
import { Button } from "./ui/button";
import Logout from "@/assets/logout.svg";
import { getBalance, GetBalanceReturnType } from "@wagmi/core";
import { useEffect, useState } from "react";
import { recoverMessageAddress } from "viem";
import { toast } from "sonner";
export function SignMessage() {
  const { chains, switchChain } = useSwitchChain();
  const [balance, setBalance] = useState<GetBalanceReturnType | null>(null);
  const [selectChain, setSelectChain] = useState<boolean>(false);
  const { disconnect } = useDisconnect();

  const {
    data: signMessageData,
    error,
    signMessage,
    isSuccess,
    variables,
  } = useSignMessage();
  
  const account = useAccount();
  useEffect(() => {
    (async () => {
      if (!selectChain) {
        return;
      }

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

  async function signMessageHandler() {
    if (!selectChain) {
      toast("Select a blockchain.", {});
      return;
    }
    signMessage({ message: "hello world!" });
  }

  function disconnectWalletHandler() {
    disconnect();
  }
  async function getAccountBalance(address: `0x${string}` | undefined) {
    if (!address) {
      toast("Wallet address not found.");
      return;
    }
    const balance = await getBalance(config, {
      address: address,
    });
    setBalance(balance);
    return balance;
  }

  const sliceAccountAddress =
    account.address?.slice(0, 4) +
    "..." +
    account.address?.slice(account.address.length - 4, account.address.length);

  const chainHandler = (chainId: { chainId: number }) => {
    if (!account.address) {
      toast("Configuring wallet...");
      return;
    }
    setSelectChain(true);
    switchChain(chainId);
    getAccountBalance(account.address);
  };
  return (
    <div className="flex gap-4">
      <Select>
        <SelectTrigger className="w-[180px] bg-[#F2F5F8] rounded-[10px]">
          <SelectValue placeholder="Select a blockchain."></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {chains.map((chain, idx) => {
              return (
                <SelectItem
                  onClick={() => chainHandler({ chainId: chain.id })}
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
            <span>
              {balance
                ? balance.value.toString().slice(0, 3) + " " + balance.symbol
                : "0.00 BAL"}
            </span>
            <img src={Synergy} alt="wallet logo"></img>
            <span>{sliceAccountAddress}</span>
          </SelectTrigger>
        </Select>

        <div className="bg-[#F2F5F8] rounded-[10px] flex flex-col gap-2 p-4">
          <Button
            onClick={() => signMessageHandler()}
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
