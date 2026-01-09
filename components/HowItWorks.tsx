"use client";

import { motion } from "framer-motion";
import { Upload, Edit, Share } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Menu",
    description: "Add your dishes, prices, and photos quickly.",
  },
  {
    number: "02",
    icon: Edit,
    title: "Customize Design",
    description: "Match your brand with colors and styling.",
  },
  {
    number: "03",
    icon: Share,
    title: "Share with Guests",
    description: "Guests scan QR code or visit your link.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            How it Works
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Get started in three simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background rounded-3xl p-8 md:p-10 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Icon className="w-8 h-8 text-primary" aria-hidden="true" />
                  </div>
                  <span className="text-4xl font-bold text-text-primary/10">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-muted leading-relaxed">{step.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}