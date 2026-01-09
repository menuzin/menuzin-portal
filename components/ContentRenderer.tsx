"use client";

import { SiteContent } from "@/lib/content-schema";
import DynamicNavbar from "@/components/DynamicNavbar";
import DynamicHero from "@/components/DynamicHero";
import DynamicHowItWorks from "@/components/DynamicHowItWorks";
import DynamicFeaturesGrid from "@/components/DynamicFeaturesGrid";
import DynamicClients from "@/components/DynamicClients";
import DynamicFAQ from "@/components/DynamicFAQ";
import DynamicFooter from "@/components/DynamicFooter";
import DynamicWhatsAppButton from "@/components/DynamicWhatsAppButton";

export default function ContentRenderer({ content }: { content: SiteContent }) {
  return (
    <main>
      <DynamicNavbar content={content} />
      <DynamicHero content={content} />
      <DynamicHowItWorks content={content} />
      <DynamicFeaturesGrid content={content} />
      <DynamicClients content={content} />
      <DynamicFAQ content={content} />
      <DynamicFooter content={content} />
      <DynamicWhatsAppButton content={content} />
    </main>
  );
}

