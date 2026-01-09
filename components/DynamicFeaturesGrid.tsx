"use client";

import { motion } from "framer-motion";
import { Smartphone, Globe, Clock, Settings } from "lucide-react";
import { SiteContent } from "@/lib/content-schema";

const iconMap: Record<string, any> = {
  Smartphone,
  Globe,
  Clock,
  Settings,
};

export default function DynamicFeaturesGrid({ content }: { content: SiteContent }) {
  return (
    <section id="features" className="py-16 md:py-20 lg:py-24" style={{ backgroundColor: content.brand.backgroundColor }}>
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: content.brand.textColor }}>
            {content.features.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {content.features.items.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Settings;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 md:p-10 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ backgroundColor: `${content.brand.primaryColor}1A` }}>
                  <Icon className="w-8 h-8" style={{ color: content.brand.primaryColor }} aria-hidden="true" />
                </div>
                <h3 className="text-2xl font-bold mb-3" style={{ color: content.brand.textColor }}>
                  {feature.title}
                </h3>
                <p className="leading-relaxed" style={{ color: content.brand.mutedTextColor || '#64748B' }}>
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}






