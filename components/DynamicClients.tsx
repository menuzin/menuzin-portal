"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SiteContent } from "@/lib/content-schema";

export default function DynamicClients({ content }: { content: SiteContent }) {
  return (
    <section id="clients" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4" style={{ color: content.brand.textColor }}>
            {content.clients.title}
          </h2>
        </motion.div>

        {content.clients.logos.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6 md:gap-8 max-w-2xl mx-auto"
          >
            {content.clients.logos.map((logo, index) => {
              const logoContent = logo.url ? (
                <Image 
                  src={logo.url} 
                  alt={logo.name || `Client logo ${index + 1}`} 
                  width={200} 
                  height={200} 
                  className="object-contain w-full h-full" 
                />
              ) : (
                <span className="text-text-muted text-sm font-medium text-center">{logo.name || `Client ${index + 1}`}</span>
              );

              const logoElement = (
                <div className="aspect-square bg-background rounded-xl flex items-center justify-center border border-border p-4 hover:border-primary transition-colors cursor-pointer">
                  {logoContent}
                </div>
              );

              if (logo.link) {
                return (
                  <a
                    key={index}
                    href={logo.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {logoElement}
                  </a>
                );
              }

              return (
                <div key={index}>
                  {logoElement}
                </div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}






