"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SiteContent } from "@/lib/content-schema";

export default function DynamicOwnerPortal({ content }: { content: SiteContent }) {
  const [imageError, setImageError] = useState(false);

  const handleContact = () => {
    if (content.whatsapp.enabled && content.whatsapp.phone) {
      const message = encodeURIComponent("Hello, I'm interested in Menuzin.");
      const whatsappUrl = `https://wa.me/${content.whatsapp.phone}?text=${message}`;
      window.open(whatsappUrl, "_blank");
    } else {
      const contactSection = document.getElementById('contact');
      contactSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="portal" className="py-16 md:py-20 lg:py-24" style={{ backgroundColor: content.brand.backgroundColor }}>
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:order-2"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: content.brand.textColor }}>
                {content.ownerPortal.title}
              </h2>
            </div>

            <div className="space-y-4 pt-4">
              {content.ownerPortal.bullets.map((bullet, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1" style={{ backgroundColor: `${content.brand.primaryColor}33` }}>
                    <svg
                      className="w-4 h-4"
                      style={{ color: content.brand.primaryColor }}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="leading-relaxed" style={{ color: content.brand.mutedTextColor || '#64748B' }}>
                    {bullet}
                  </p>
                </div>
              ))}
            </div>

            <motion.button
              onClick={handleContact}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block mt-6 px-8 py-4 text-white rounded-xl font-semibold text-lg hover:opacity-90 transition-all"
              style={{ backgroundColor: content.brand.primaryColor }}
            >
              {content.hero.ctaLabel}
            </motion.button>
          </motion.div>

          {content.ownerPortal.imageUrl && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:order-1"
            >
              <div className="relative w-full aspect-video bg-white rounded-3xl overflow-hidden shadow-xl border border-border">
                {!imageError && (
                  <Image
                    src={content.ownerPortal.imageUrl}
                    alt={content.ownerPortal.title}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                )}
                {imageError && (
                  <div className="absolute inset-0 bg-background flex items-center justify-center">
                    <p className="text-sm font-medium" style={{ color: content.brand.mutedTextColor || '#64748B' }}>Image</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

