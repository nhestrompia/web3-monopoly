"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Copy, LogOut, Wallet } from "lucide-react";
import { useState } from "react";

interface WalletInfoProps {
  address: string;
  balance: string;
  avatarUrl?: string;
}

export default function WalletInfo({
  address,
  balance,
  avatarUrl,
}: WalletInfoProps) {
  const [isOpen, setIsOpen] = useState(false);

  const shortenAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(address);
    // You might want to add a toast notification here
  };

  const disconnect = () => {
    // Implement your disconnect logic here
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="reverse" className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={avatarUrl} alt="User avatar" />
            <AvatarFallback>
              <Wallet className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{shortenAddress(address)}</span>
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
              {balance}
            </div>
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <Button variant="reverse" onClick={copyAddress}>
            <Copy className="mr-2 h-4 w-4" />
            Copy Address
          </Button>
          <Button variant="noShadow" onClick={disconnect}>
            <LogOut className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
