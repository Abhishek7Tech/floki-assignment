import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "@/components/ui/select";
import { useAccount, useChains } from "wagmi";
import { config } from "../../config";
import Eth from "@/assets/eth.svg";
import BNB from "@/assets/bnb.svg";
import Synergy from "@/assets/Synergy.svg";
export function SignMessage() {
  const chains = useChains({
    config,
  });

  const account = useAccount();
  const sliceAccountAddress =
    account.address?.slice(0, 4) +
    "..." +
    account.address?.slice(account.address.length - 4, account.address.length);
  return (
    <div>
      <Select>
        <SelectTrigger className="w-[180px] bg-[#F2F5F8] rounded-[10px]">
          <SelectValue placeholder="Select a blockchain."></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {chains.map((chain) => {
              return (
                <SelectItem value={chain.name}>
                  <div className="flex gap-2 font-medium text-sm items-center">
                    <img
                      src={chain.name !== "BNB Smart Chain" ? Eth : BNB}
                      alt={`${chain.name} logo`}
                    ></img>
                    {chain.name}
                  </div>
                </SelectItem>
              );
            })}
            {/* <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
          </SelectGroup>
        </SelectContent>
      </Select>

      <div>
        <Select>
          <SelectTrigger className="w-[233px] bg-[#F2F5F8] rounded-[10px]">
            <span>0.25 ETH</span>
            <img src={Synergy} alt="wallet logo"></img>
            <span>{sliceAccountAddress}</span>
          </SelectTrigger>
        </Select>
      </div>
    </div>
  );
}
