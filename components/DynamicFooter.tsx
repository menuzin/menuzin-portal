"use client";

import { SiteContent } from "@/lib/content-schema";

export default function DynamicFooter({ content }: { content: SiteContent }) {
  return (
    <footer className="border-t border-border py-8" style={{ backgroundColor: content.brand.backgroundColor }}>
      <div className="container-custom">
        <div className="text-center" style={{ color: content.brand.mutedTextColor || '#64748B' }}>
          {content.footer.blurb && <p className="mb-4">{content.footer.blurb}</p>}
          {content.footer.links.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {content.footer.links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="hover:opacity-70 transition-opacity"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
          <p>{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}






