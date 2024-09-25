"use client";

import { truncateAddress } from "@/app/utils";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { Copy, LogOut, Menu, Wallet, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
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

interface INavbar {}

const Navbar: React.FC<INavbar> = () => {
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
              {address}
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
          <Button variant="reverse" onClick={copyAddress}>
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

  // Navigation links component to avoid repetition
  const NavLinks = () => (
    <>
      <Link
        href="/"
        className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Home
      </Link>
      <Link
        href="/about"
        className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        About
      </Link>
      <Link
        href="/services"
        className="text-gray-700 hover:bg-gray-100 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        Services
      </Link>
    </>
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <img
              className="h-8 w-auto"
              src="/placeholder.svg?height=32&width=32"
              alt="Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              <NavLinks />
              <div className="w-10">
                <ModeToggle />
              </div>
              {renderWalletButton()}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="default"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLinks />
            {renderWalletButton()}
            <ModeToggle />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
