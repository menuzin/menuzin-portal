"use client";

import { motion } from "framer-motion";
import { SiteContent } from "@/lib/content-schema";

export default function DynamicHero({ content }: { content: SiteContent }) {

  const handleCTA = () => {
    // Use phone number from ctaHref to open WhatsApp
    if (content.hero.ctaHref) {
      const phoneNumber = content.hero.ctaHref.replace(/[^0-9]/g, ''); // Remove any non-numeric characters
      const message = encodeURIComponent("Hello, I'm interested in Menuzin.");
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, "_blank");
    }
  };

  return (
    <section id="home" className="py-12 md:py-16 lg:py-20" style={{ backgroundColor: content.brand.backgroundColor }}>
      <div className="container-custom">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 w-full"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-center" style={{ color: content.brand.textColor }}>
                {content.hero.headline}
              </h1>
              <p className="text-lg md:text-xl leading-relaxed opacity-75 text-center" style={{ color: content.brand.mutedTextColor || '#64748B' }}>
                {content.hero.subheadline}
              </p>
            </div>
            <div className="flex justify-center">
              <motion.button
                onClick={handleCTA}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block px-8 py-4 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2"
                style={{ backgroundColor: content.brand.primaryColor }}
              >
                {content.hero.ctaLabel}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

