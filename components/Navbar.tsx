"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Portal", href: "#portal" },
  { label: "Clients", href: "#clients" },
];

// WhatsApp phone number
const WHATSAPP_NUMBER = "9647709160405"; // +9647709160405 without + and spaces

const openWhatsApp = () => {
  const message = encodeURIComponent("Hello, I'm interested in Menufy.");
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(whatsappUrl, "_blank");
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#home"
            className="text-xl md:text-2xl font-bold text-text-primary tracking-tight"
            aria-label="Menufy Home"
          >
            Menufy
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-primary hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/admin/login"
              className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
            >
              Login
            </a>
          </div>

          {/* CTA Button - Desktop */}
          <button
            onClick={openWhatsApp}
            className="hidden md:block px-6 py-2.5 bg-primary text-white rounded-lg font-semibold hover:bg-primary-hover transition-colors"
          >
            Contact Us
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-primary"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X size={24} aria-hidden="true" />
            ) : (
              <Menu size={24} aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
            >
              <div className="py-4 space-y-4 border-t border-border">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block text-base font-medium text-text-primary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="/admin/login"
                  onClick={handleLinkClick}
                  className="block text-base font-medium text-text-muted hover:text-primary transition-colors"
                >
                  Login
                </a>
                <button
                  onClick={() => {
                    handleLinkClick();
                    openWhatsApp();
                  }}
                  className="block w-full px-6 py-2.5 bg-primary text-white rounded-lg font-semibold text-center hover:bg-primary-hover transition-colors"
                >
                  Contact Us
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}