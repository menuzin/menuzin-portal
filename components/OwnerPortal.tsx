"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function OwnerPortal() {
  const [dashboardError, setDashboardError] = useState(false);

  return (
    <section id="portal" className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6 lg:order-2"
          >
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
                Manage Everything in One Place
              </h2>
              <p className="text-lg text-text-muted leading-relaxed">
                Update prices, add specials, mark items sold out. Your menu changes instantly across all devices.
              </p>
            </div>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-accent"
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
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Easy Updates</h3>
                  <p className="text-text-muted">Change your menu in seconds, not hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-accent"
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
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Analytics</h3>
                  <p className="text-text-muted">See what your guests are viewing and ordering.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-4 h-4 text-accent"
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
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">No Tech Skills Needed</h3>
                  <p className="text-text-muted">Simple interface anyone can use.</p>
                </div>
              </div>
            </div>

            <motion.button
              onClick={() => {
                const message = encodeURIComponent("Hello, I'm interested in Menufy.");
                const whatsappUrl = `https://wa.me/9647709160405?text=${message}`;
                window.open(whatsappUrl, "_blank");
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block mt-6 px-8 py-4 bg-primary text-white rounded-xl font-semibold text-lg hover:bg-primary-hover transition-colors"
            >
              Contact Us
            </motion.button>
          </motion.div>

          {/* Dashboard Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:order-1"
          >
            <div className="relative w-full aspect-video bg-white rounded-3xl overflow-hidden shadow-xl border border-border">
              {!dashboardError && (
                <Image
                  src="/images/dashboard.png"
                  alt="Menufy dashboard interface"
                  fill
                  className="object-cover"
                  onError={() => setDashboardError(true)}
                />
              )}
              {dashboardError && (
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
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm text-text-muted font-medium">Dashboard Preview</p>
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
