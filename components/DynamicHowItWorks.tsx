"use client";

import { motion } from "framer-motion";
import { Upload, Edit, Share } from "lucide-react";
import { SiteContent } from "@/lib/content-schema";

const iconMap: Record<string, any> = {
  Upload,
  Edit,
  Share,
};

export default function DynamicHowItWorks({ content }: { content: SiteContent }) {
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
            {content.howItWorks.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {content.howItWorks.steps.map((step, index) => {
            const Icon = iconMap[step.icon] || Upload;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-background rounded-3xl p-8 md:p-10 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${content.brand.primaryColor}1A` }}>
                    <Icon className="w-8 h-8" style={{ color: content.brand.primaryColor }} aria-hidden="true" />
                  </div>
                  <span className="text-4xl font-bold opacity-10" style={{ color: content.brand.textColor }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-text-primary mb-3" style={{ color: content.brand.textColor }}>
                  {step.title}
                </h3>
                <p className="text-text-muted leading-relaxed" style={{ color: content.brand.mutedTextColor || '#64748B' }}>
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}






