"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="home" className="py-12 md:py-16 lg:py-20 bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                Digital menus made simple
              </h1>
              <p className="text-lg md:text-xl text-text-muted leading-relaxed">
                Beautiful digital menus that your guests will love. Easy to manage, easy to use.
              </p>
            </div>
            <motion.button
              onClick={() => {
                const message = encodeURIComponent("Hello, I'm interested in Menufy.");
                const whatsappUrl = `https://wa.me/9647709160405?text=${message}`;
                window.open(whatsappUrl, "_blank");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Contact Us
            </motion.button>
          </motion.div>

          {/* Food Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative w-full aspect-square max-w-lg mx-auto lg:mx-0"
          >
            <div className="relative w-full h-full bg-white rounded-3xl overflow-hidden shadow-lg">
              {!imageError && (
                <Image
                  src="/images/hero-food.jpg"
                  alt="Beautiful restaurant food presentation"
                  fill
                  className="object-cover"
                  priority
                  onError={() => setImageError(true)}
                />
              )}
              {imageError && (
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <div className="w-20 h-20 mx-auto bg-accent/30 rounded-full flex items-center justify-center">
                      <svg
                        className="w-10 h-10 text-accent"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-text-muted font-medium">Food Image</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}