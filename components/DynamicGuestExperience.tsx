"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { SiteContent } from "@/lib/content-schema";

export default function DynamicGuestExperience({ content }: { content: SiteContent }) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {content.guestExperience.imageUrl && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0"
            >
              <div className="relative w-full h-full bg-background rounded-3xl overflow-hidden shadow-lg">
                {!imageError && (
                  <Image
                    src={content.guestExperience.imageUrl}
                    alt={content.guestExperience.title}
                    fill
                    className="object-cover"
                    onError={() => setImageError(true)}
                  />
                )}
                {imageError && (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                    <p className="text-sm font-medium" style={{ color: content.brand.mutedTextColor || '#64748B' }}>Image</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: content.brand.textColor }}>
                {content.guestExperience.title}
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: content.brand.mutedTextColor || '#64748B' }}>
                {content.guestExperience.text}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}






