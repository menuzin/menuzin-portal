"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SiteContent } from "@/lib/content-schema";

export default function DynamicFAQ({ content }: { content: SiteContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: content.brand.textColor }}>
            {content.faq.title}
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {content.faq.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-background transition-colors text-left"
                style={{ color: content.brand.textColor }}
              >
                <span className="font-semibold text-lg pr-4">{item.q}</span>
                {openIndex === index ? (
                  <ChevronUp className="flex-shrink-0" style={{ color: content.brand.primaryColor }} />
                ) : (
                  <ChevronDown className="flex-shrink-0" style={{ color: content.brand.primaryColor }} />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4" style={{ color: content.brand.mutedTextColor || '#64748B' }}>
                  {item.a}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}






