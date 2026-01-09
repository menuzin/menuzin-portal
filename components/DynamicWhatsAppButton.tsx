"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { SiteContent } from "@/lib/content-schema";

export default function DynamicWhatsAppButton({ content }: { content: SiteContent }) {
  if (!content.whatsapp.enabled || !content.whatsapp.phone) {
    return null;
  }

  const handleClick = () => {
    const message = encodeURIComponent("Hello, I'm interested in Menuzin.");
    const whatsappUrl = `https://wa.me/${content.whatsapp.phone}?text=${message}`;
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
          className="group relative w-14 h-14 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2"
          style={{ backgroundColor: '#25D366' }}
          aria-label="Chat with Menuzin on WhatsApp"
        >
          <MessageCircle size={24} aria-hidden="true" />
          
          <span className="absolute right-full mr-3 px-3 py-2 bg-text-primary text-white text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with Menuzin
            <span className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-text-primary"></span>
          </span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}

