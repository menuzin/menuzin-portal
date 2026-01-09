"use client";

import Image from "next/image";
import { SiteContent } from "@/lib/content-schema";

export default function DynamicNavbar({ content }: { content: SiteContent }) {

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left spacer - keeps logo centered */}
          <div className="flex-1"></div>
          
          {/* Centered Logo */}
          <div className="flex-1 flex justify-center">
            {content.brand.logoUrl ? (
              <a
                href="#home"
                className="flex items-center justify-center"
                aria-label={`${content.brand.name} Home`}
              >
                <div 
                  className="relative flex items-center justify-center"
                  style={{ 
                    height: `${content.brand.logoHeight || 48}px`,
                    maxWidth: '200px'
                  }}
                >
                  <Image
                    src={content.brand.logoUrl}
                    alt={content.brand.name}
                    width={200}
                    height={content.brand.logoHeight || 48}
                    className="object-contain w-auto h-full"
                    sizes="(max-width: 768px) 160px, 200px"
                    priority
                    style={{ 
                      height: `${content.brand.logoHeight || 48}px`, 
                      width: 'auto',
                      maxHeight: `${content.brand.logoHeight || 48}px`
                    }}
                  />
                </div>
              </a>
            ) : (
              <div className="w-32 h-12 bg-background border border-border rounded-lg flex items-center justify-center">
                <span className="text-xs text-text-muted">Upload logo</span>
              </div>
            )}
          </div>
          
          {/* Right side - Login only */}
          <div className="flex items-center flex-1 justify-end">
            {content.navbar.showLoginLink && (
              <a
                href="/admin/login"
                className="text-sm font-medium text-text-muted hover:text-primary transition-colors"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

