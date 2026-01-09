import { z } from 'zod';

// Content schema definitions

export const NavbarLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const BrandSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  backgroundColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  textColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/),
  // Logo URL can be relative path (e.g., /menuzin-logo.png) or full URL
  logoUrl: z.string().optional(),
  // Logo height in pixels (width will be auto to maintain aspect ratio)
  logoHeight: z.number().min(20).max(200).optional(),
});

export const NavbarSchema = z.object({
  links: z.array(NavbarLinkSchema).min(1),
  showLoginLink: z.boolean(),
});

export const HeroSchema = z.object({
  headline: z.string().min(1),
  subheadline: z.string().min(1),
  ctaLabel: z.string().min(1),
  ctaHref: z.string().min(1),
  heroImageUrl: z.string().url().optional(),
});

export const HowItWorksStepSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1), // Icon name/identifier
});

export const HowItWorksSchema = z.object({
  title: z.string().min(1),
  steps: z.array(HowItWorksStepSchema).length(3),
});

export const FeatureItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
});

export const FeaturesSchema = z.object({
  title: z.string().min(1),
  items: z.array(FeatureItemSchema).min(1),
});

export const GuestExperienceSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  imageUrl: z.string().url().optional(),
});

export const OwnerPortalSchema = z.object({
  title: z.string().min(1),
  bullets: z.array(z.string().min(1)).min(1),
  imageUrl: z.string().url().optional(),
});

// Helper schema for optional URL that accepts empty strings, relative paths, and full URLs
const optionalUrlSchema = z.preprocess(
  (val) => {
    // Normalize empty strings, null, and undefined to undefined
    if (val === '' || val === null || val === undefined || (typeof val === 'string' && val.trim() === '')) {
      return undefined;
    }
    return val;
  },
  z.union([
    // Accept full URLs (http://, https://)
    z.string().url(),
    // Accept relative paths (starting with / and containing at least one more character)
    z.string().refine(
      (val) => val.startsWith('/') && val.length > 1,
      { message: "Relative path must start with / and contain a path" }
    ),
    z.undefined()
  ]).optional()
);

export const ClientLogoSchema = z.object({
  name: z.string().optional(), // Optional, used for alt text
  url: optionalUrlSchema,
  link: z.preprocess(
    (val) => {
      // Normalize empty strings, null, and undefined to undefined
      if (val === '' || val === null || val === undefined || (typeof val === 'string' && val.trim() === '')) {
        return undefined;
      }
      return val;
    },
    z.union([
      z.string().url(),
      z.undefined()
    ]).optional()
  ), // Link to route to when clicked
});

export const TestimonialSchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
  text: z.string().min(1),
});

export const ClientsSchema = z.object({
  title: z.string().min(1),
  logos: z.array(ClientLogoSchema),
  testimonial: TestimonialSchema,
});

export const FAQItemSchema = z.object({
  q: z.string().min(1),
  a: z.string().min(1),
});

export const FAQSchema = z.object({
  title: z.string().min(1),
  items: z.array(FAQItemSchema).min(1),
});

export const ContactFormLabelsSchema = z.object({
  restaurantName: z.string().min(1),
  city: z.string().min(1),
  phone: z.string().min(1),
  branches: z.string().min(1),
  message: z.string().min(1),
  submit: z.string().min(1),
});

export const ContactSchema = z.object({
  title: z.string().min(1),
  text: z.string().min(1),
  formLabels: ContactFormLabelsSchema,
});

export const FooterLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const FooterSchema = z.object({
  blurb: z.string().optional(),
  links: z.array(FooterLinkSchema),
  copyright: z.string().min(1),
});

export const WhatsAppSchema = z.object({
  enabled: z.boolean(),
  phone: z.string().optional(), // Stored but only used when enabled
});

// Main content schema
export const SiteContentSchema = z.object({
  brand: BrandSchema,
  navbar: NavbarSchema,
  hero: HeroSchema,
  howItWorks: HowItWorksSchema,
  features: FeaturesSchema,
  guestExperience: GuestExperienceSchema,
  ownerPortal: OwnerPortalSchema,
  clients: ClientsSchema,
  faq: FAQSchema,
  contact: ContactSchema,
  footer: FooterSchema,
  whatsapp: WhatsAppSchema,
});

// TypeScript types
export type NavbarLink = z.infer<typeof NavbarLinkSchema>;
export type Brand = z.infer<typeof BrandSchema>;
export type Navbar = z.infer<typeof NavbarSchema>;
export type Hero = z.infer<typeof HeroSchema>;
export type HowItWorksStep = z.infer<typeof HowItWorksStepSchema>;
export type HowItWorks = z.infer<typeof HowItWorksSchema>;
export type FeatureItem = z.infer<typeof FeatureItemSchema>;
export type Features = z.infer<typeof FeaturesSchema>;
export type GuestExperience = z.infer<typeof GuestExperienceSchema>;
export type OwnerPortal = z.infer<typeof OwnerPortalSchema>;
export type ClientLogo = z.infer<typeof ClientLogoSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
export type Clients = z.infer<typeof ClientsSchema>;
export type FAQItem = z.infer<typeof FAQItemSchema>;
export type FAQ = z.infer<typeof FAQSchema>;
export type ContactFormLabels = z.infer<typeof ContactFormLabelsSchema>;
export type Contact = z.infer<typeof ContactSchema>;
export type FooterLink = z.infer<typeof FooterLinkSchema>;
export type Footer = z.infer<typeof FooterSchema>;
export type WhatsApp = z.infer<typeof WhatsAppSchema>;
export type SiteContent = z.infer<typeof SiteContentSchema>;

