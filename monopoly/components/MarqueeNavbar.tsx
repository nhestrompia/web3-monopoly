"use client";

import { truncateAddress } from "@/app/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { Copy, LogOut, Menu, Wallet } from "lucide-react";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useAccount } from "wagmi";
import { ModeToggle } from "./ModeToggle";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";

const links = [
  "Home",
  "About",
  "Services",
  "Portfolio",
  "Contact",
  "Team",
  "Careers",
];

const NavLink = ({ link }: { link: string }) => (
  <a
    href={`#${link.toLowerCase()}`}
    className="text-black text-xl font-bold no-underline px-4 
               transition-colors duration-300 hover:text-yellow-500 focus:text-yellow-500 focus:outline-none"
  >
    {link}
  </a>
);

export default function MarqueeNavbar() {
  const [isMobile, setIsMobile] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();
  const { ready, authenticated, connectWallet, login } = usePrivy();
  console.log("🚀 ~ authenticated:", authenticated);
  const { wallets, ready: walletsReady } = useWallets();
  const { setActiveWallet } = useSetActiveWallet();
  const { isConnected, address } = useAccount();

  const copyAddress = () => {
    navigator.clipboard.writeText(address!);
    toast({
      title: "Succesful",
      description: "Address copied successfully",
      //   action: (
      //     <ToastAction altText="Check on etherscan">
      //       <a
      //         target="_blank"
      //         href={`https://sepolia.etherscan.io/address/${address}`}
      //       >
      //         Check on Etherscan
      //       </a>
      //     </ToastAction>
      //   ),
    });
    // You might want to add a toast notification here
  };

  const disconnect = () => {
    // Implement your disconnect logic here
    setIsDialogOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderWallet = (wallet: any) => (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="reverse" className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            {/* <AvatarImage src={avatarUrl} alt="User avatar" /> */}
            <AvatarFallback>
              <Wallet className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">
            {truncateAddress(wallet.address)}
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Wallet Information</DialogTitle>
          <DialogDescription>
            Your current wallet details are displayed below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Address
            </Label>
            <div id="address" className="col-span-3 truncate font-mono text-sm">
              {truncateAddress(address! ?? "")}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="balance" className="text-right">
              Balance
            </Label>
            <div id="balance" className="col-span-3 font-mono text-sm">
              {/* {balance} */}
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="default" onClick={copyAddress}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Address
          </Button>
          <Button variant="default" onClick={disconnect}>
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    //
  );

  const renderWalletButton = () => {
    if (ready && !authenticated) {
      return (
        <Button
          onClick={login}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      );
    }
    if (walletsReady && wallets.length > 0) {
      return wallets.map(renderWallet);
    }
    return null;
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const NavContent = () => (
    <div className="relative w-full  h-full overflow-hidden ">
      <div className="absolute top-0 left-0 w-full h-16 pointer-events-auto flex gap-4 justify-center items-center bg-yellow-300 border-b-4 border-black">
        <Marquee className="h-16 " autoFill gradient={false} speed={50}>
          {/* {links.map((link, index) => (
            <NavLink key={`top-${index}`} link={link} />
          ))} */}
          <div className="px-4">
            <ModeToggle />
          </div>
          <div className="px-4">{renderWalletButton()}</div>
        </Marquee>
      </div>
      <div className="absolute top-16 right-0 w-32 pointer-events-auto h-[calc(100%-32px)] bg-yellow-300 border-l-4 border-black">
        {/* <Marquee autoFill gradient={false} speed={30} direction="up">
          {links.map((link, index) => (
            <div
              key={`right-${index}`}
              className="my-4 transform -rotate-90 whitespace-nowrap"
            >
              <NavLink link={link} />
            </div>
          ))}
        </Marquee> */}
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-auto z-10 w-full h-16 flex gap-4 justify-center items-center bg-yellow-300 border-t-4 border-black">
        <Marquee
          autoFill
          className="h-16"
          gradient={false}
          speed={50}
          direction="right"
        >
          <div className="px-4">
            <ModeToggle />
          </div>
          <div className="px-4">{renderWalletButton()}</div>
        </Marquee>
      </div>
      <div className="absolute top-16 left-0 pointer-events-auto w-32 h-[calc(100%-32px)] bg-yellow-300 border-r-4 border-black">
        {/* <Marquee gradient={false} speed={30} direction="down">
          {links.map((link, index) => (
            <div
              key={`left-${index}`}
              className="my-4 transform -rotate-90 whitespace-nowrap"
            >
              <NavLink link={link} />
            </div>
          ))}
        </Marquee> */}
      </div>
    </div>
  );

  return (
    <nav className="fixed inset-0  overflow-hidden">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="link"
              size="icon"
              className="fixed top-4 left-4 z-50 pointer-events-auto bg-yellow-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[300px] sm:w-[400px] bg-yellow-300 border-r-4 border-black"
          >
            <div className="py-4">
              <NavContent />
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <div className="w-full h-full  pointer-events-auto">
          <NavContent />
        </div>
      )}
    </nav>
  );
}
