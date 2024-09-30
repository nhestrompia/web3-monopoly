"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";

const links = [
  "Home",
  "About",
  "Services",
  "Portfolio",
  "Contact",
  "Blog",
  "Team",
  "Careers",
  "Products",
  "FAQ",
  "Support",
  "Pricing",
  "News",
  "Events",
  "Gallery",
  "Reviews",
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

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const NavContent = () => (
    <div className="relative w-full fixed h-full overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-16 flex justify-center items-center bg-yellow-300 border-b-4 border-black">
        <Marquee gradient={false} speed={50}>
          {links.map((link, index) => (
            <NavLink key={`top-${index}`} link={link} />
          ))}
        </Marquee>
      </div>
      <div className="absolute top-16 right-0 w-16 h-[calc(100%-32px)] bg-yellow-300 border-l-4 border-black">
        <Marquee gradient={false} speed={30} direction="up">
          {links.map((link, index) => (
            <div
              key={`right-${index}`}
              className="my-4 transform -rotate-90 whitespace-nowrap"
            >
              <NavLink link={link} />
            </div>
          ))}
        </Marquee>
      </div>
      <div className="absolute bottom-0 left-0 z-10 w-full h-16 flex justify-center items-center bg-yellow-300 border-t-4 border-black">
        <Marquee gradient={false} speed={50} direction="right">
          {links.map((link, index) => (
            <NavLink key={`bottom-${index}`} link={link} />
          ))}
        </Marquee>
      </div>
      <div className="absolute top-16 left-0 w-16 h-[calc(100%-32px)] bg-yellow-300 border-r-4 border-black">
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
    <nav className="fixed inset-0 pointer-events-none overflow-hidden">
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
        <div className="w-full h-full pointer-events-auto">
          <NavContent />
        </div>
      )}
    </nav>
  );
}
