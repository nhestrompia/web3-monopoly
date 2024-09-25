"use client";

import { truncateAddress } from "@/app/utils";
import { Button } from "@/components/ui/button";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSetActiveWallet } from "@privy-io/wagmi";
import { Menu, Wallet, X } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useAccount } from "wagmi";
import { ModeToggle } from "./ModeToggle";

interface INavbar {}

const Navbar: React.FC<INavbar> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { ready, authenticated, connectWallet, login } = usePrivy();
  console.log("🚀 ~ authenticated:", authenticated);
  const { wallets, ready: walletsReady } = useWallets();
  const { setActiveWallet } = useSetActiveWallet();
  const { isConnected } = useAccount();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const renderWallet = (wallet: any) => (
    <div
      key={wallet.address}
      className="flex min-w-full flex-row flex-wrap items-center justify-between gap-2  p-4"
    >
      <div>{truncateAddress(wallet.address)}</div>
      <Button onClick={() => setActiveWallet(wallet)} />
    </div>
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
