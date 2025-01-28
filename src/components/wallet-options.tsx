import * as React from "react";
import { Connector, useConnect } from "wagmi";
import MetaMask from "../assets/MetaMask.svg";
import WalletConnect from "@/assets/WalletConnect.svg";
import Close from "@/assets/close-line.svg";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function WalletDrawer() {
  const { connectors, connect } = useConnect();
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Connect Wallet</Button>
      </DrawerTrigger>

      <DrawerContent className="h-screen flex flex-col justify-center">
        <div className="mx-auto bg-[#131313] w-[469px] height-[332px] rounded-3xl max-w-sm">
          <DrawerHeader className="flex justify-between items-center">
            <DrawerTitle className="text-white font-medium text-sm">
              Connect Wallet
            </DrawerTitle>
            <DrawerClose asChild>
              <button>
                <img src={Close || ""} alt="close button" />
              </button>
            </DrawerClose>
            {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
          </DrawerHeader>
          <div className="p-4">
            <div className="flex flex-col items-start justify-center gap-2 pb-2">
              {connectors.map((connector) => {
                if (
                  connector.name === "Backpack" ||
                  connector.name === "SubWallet"
                ) {
                  return;
                }
                return (
                  <button
                    className="flex gap-[14px] p-4 items-center font-medium text-sm text-white h-14 w-full mx-1 rounded-xl bg-[#1B1B1B]"
                    key={connector.uid}
                    onClick={() => connect({ connector })}
                  >
                    {connector.name !== "WalletConnect" && (
                      <img
                        height={40}
                        width={40}
                        src={connector.icon || MetaMask}
                        alt={`${connector.name} icon`}
                      />
                    )}
                    {connector.name === "WalletConnect" && (
                      <img
                        height={40}
                        width={40}
                        src={connector.icon || WalletConnect}
                        alt={`${connector.name} icon`}
                      />
                    )}
                    {connector.name}
                  </button>
                );
              })}

              {/* <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(-10)}
                disabled={goal <= 200}
              >
                <Minus />
                <span className="sr-only">Decrease</span>
              </Button>
              <div className="flex-1 text-center">
                <div className="text-7xl font-bold tracking-tighter">
                  {goal}
                </div>
                <div className="text-[0.70rem] uppercase text-muted-foreground">
                  Calories/day
                </div>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0 rounded-full"
                onClick={() => onClick(10)}
                disabled={goal >= 400}
              >
                <Plus />
                <span className="sr-only">Increase</span>
              </Button> */}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
