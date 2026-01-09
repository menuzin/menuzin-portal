"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";

// IMPORTANT: Set to true to enable WhatsApp button
// When false, the button is completely hidden
const WHATSAPP_ENABLED = false;

// WhatsApp phone number (country code + number, no spaces or special characters)
const WHATSAPP_PHONE_NUMBER = "9647709160405"; // +9647709160405

export default function WhatsAppButton() {
  // Don't render anything if disabled
  if (!WHATSAPP_ENABLED) {
    return null;
  }

  const handleClick = () => {
    // Open WhatsApp with pre-filled message
    const message = encodeURIComponent("Hello, I'm interested in Menufy.");
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="group relative w-14 h-14 bg-[#365314] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-[#365314] focus:ring-offset-2"
          aria-label="Chat with Menufy on WhatsApp"
        >
          <MessageCircle size={24} aria-hidden="true" />
          
          {/* Tooltip */}
          <span className="absolute right-full mr-3 px-3 py-2 bg-text-primary text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with Menufy
            <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-text-primary"></span>
          </span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

// Export the flag for documentation purposes
export { WHATSAPP_ENABLED };
