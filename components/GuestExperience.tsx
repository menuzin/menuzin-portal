"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function GuestExperience() {
  const [foodError, setFoodError] = useState(false);
  const [menuError, setMenuError] = useState(false);

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Food Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-[4/5] max-w-md mx-auto lg:mx-0"
          >
            <div className="relative w-full h-full bg-background rounded-3xl overflow-hidden shadow-lg">
              {!foodError && (
                <Image
                  src="/images/guest-food.jpg"
                  alt="Delicious restaurant dish"
                  fill
                  className="object-cover"
                  onError={() => setFoodError(true)}
                />
              )}
              {foodError && (
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

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
                A Better Guest Experience
              </h2>
              <p className="text-lg text-text-muted leading-relaxed">
                Your guests browse beautiful menus on their phones. No waiting, no contact. Just great food and service.
              </p>
            </div>

            {/* Menu UI Preview */}
            <div className="relative w-full max-w-sm aspect-[9/16] bg-white rounded-3xl overflow-hidden shadow-xl border border-border">
              {!menuError && (
                <Image
                  src="/images/menu-ui.png"
                  alt="Digital menu interface"
                  fill
                  className="object-cover"
                  onError={() => setMenuError(true)}
                />
              )}
              {menuError && (
                <div className="absolute inset-0 bg-background flex items-center justify-center p-8">
                  <div className="text-center space-y-3">
                    <div className="w-16 h-16 mx-auto bg-primary/20 rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-text-muted font-medium">Menu UI</p>
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