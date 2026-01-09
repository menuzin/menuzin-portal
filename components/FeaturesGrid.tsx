"use client";

import { motion } from "framer-motion";
import { Smartphone, Globe, Clock, Settings } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Works on Any Device",
    description: "Beautiful menus on phones, tablets, and computers.",
  },
  {
    icon: Globe,
    title: "QR Code Access",
    description: "Guests scan and view instantly. No app needed.",
  },
  {
    icon: Clock,
    title: "Real-Time Updates",
    description: "Change prices, add items, mark sold out instantly.",
  },
  {
    icon: Settings,
    title: "Easy Management",
    description: "Simple dashboard to manage your entire menu.",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-24 bg-background">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Features built for modern restaurants
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 md:p-10 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-muted leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}





