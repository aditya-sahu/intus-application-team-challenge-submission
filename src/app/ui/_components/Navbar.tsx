"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="https://intuscare.com/">
              <img src="/logo_IntusCare.svg" alt="Intus Care Logo" className="h-10" />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-500">Home</Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-500">About</Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-500">Contact</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <Link href="/" className="block text-gray-700 hover:text-blue-500">Home</Link>
            <Link href="/about" className="block text-gray-700 hover:text-blue-500">About</Link>
            <Link href="/contact" className="block text-gray-700 hover:text-blue-500">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
