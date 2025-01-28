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
        <div className="mx-auto w-[469px] height-[332px] rounded-lg max-w-sm bg-blue-200">
          <DrawerHeader className="flex justify-between items-center">
            <DrawerTitle>Connect Wallet</DrawerTitle>
            <DrawerClose asChild>
              <button >
                <img src={Close || ""} alt="close button" />
              </button>
            </DrawerClose>
            {/* <DrawerDescription>Set your daily activity goal.</DrawerDescription> */}
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex flex-col items-start justify-center">
              {connectors.map((connector) => (
                <button
                  className="flex gap-[14px] bg-[#1B1B1B] p-4 items-center font-medium text-sm text-white w-full mx-1"
                  key={connector.uid}
                  onClick={() => connect({ connector })}
                >
                  {connector.name !== "WalletConnect" && connector.name !== "Backpack" && connector.name !== "SubWallet" && (
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
                  {connector.name !== "Backpack" && connector.name !== "SubWallet" && connector.name}
                </button>
              ))}

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
