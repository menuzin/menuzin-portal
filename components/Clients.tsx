"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Menufy transformed how we manage our menu. Our guests love the experience, and it's so easy to update.",
    author: "Sarah Chen",
    role: "Owner, Bistro Milano",
  },
];

export default function Clients() {
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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            Trusted by Restaurants
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Join restaurants using Menufy to serve their guests better
          </p>
        </motion.div>

        {/* Client Logos Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-16"
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-32 h-16 md:w-40 md:h-20 bg-background rounded-xl flex items-center justify-center border border-border"
            >
              <span className="text-text-muted text-sm font-medium">Client Logo</span>
            </div>
          ))}
        </motion.div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-3xl mx-auto bg-background rounded-3xl p-8 md:p-12"
        >
          <Quote className="w-12 h-12 text-primary/30 mb-6" />
          <blockquote className="text-xl md:text-2xl font-medium text-text-primary mb-6 leading-relaxed">
            {testimonials[0].quote}
          </blockquote>
          <div>
            <div className="font-semibold text-text-primary">{testimonials[0].author}</div>
            <div className="text-text-muted">{testimonials[0].role}</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}





