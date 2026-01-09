const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const defaultContent = {
  brand: {
    name: "Menuzin",
    tagline: "Digital menus made simple",
    primaryColor: "#14B8A6",
    backgroundColor: "#FAFAF9",
    textColor: "#0F172A",
    logoUrl: undefined,
    logoHeight: 48,
  },
  navbar: {
    links: [
      { label: "Home", href: "#home" },
      { label: "Features", href: "#features" },
      { label: "Clients", href: "#clients" },
    ],
    showLoginLink: true,
  },
  hero: {
    headline: "Digital menus made simple",
    subheadline: "Beautiful digital menus that your guests will love. Easy to manage, easy to use.",
    ctaLabel: "Contact Us",
    ctaHref: "#contact",
  },
  howItWorks: {
    title: "How it Works",
    steps: [
      {
        title: "Upload Your Menu",
        description: "Add your dishes, prices, and photos quickly.",
        icon: "Upload",
      },
      {
        title: "Customize Design",
        description: "Match your brand with colors and styling.",
        icon: "Edit",
      },
      {
        title: "Share with Guests",
        description: "Guests scan QR code or visit your link.",
        icon: "Share",
      },
    ],
  },
  features: {
    title: "Everything You Need",
    items: [
      {
        title: "Works on Any Device",
        description: "Beautiful menus on phones, tablets, and computers.",
        icon: "Smartphone",
      },
      {
        title: "QR Code Access",
        description: "Guests scan and view instantly. No app needed.",
        icon: "Globe",
      },
      {
        title: "Real-Time Updates",
        description: "Change prices, add items, mark sold out instantly.",
        icon: "Clock",
      },
      {
        title: "Easy Management",
        description: "Simple dashboard to manage your entire menu.",
        icon: "Settings",
      },
    ],
  },
  guestExperience: {
    title: "A Better Experience for Your Guests",
    text: "Your guests get a beautiful, easy-to-use menu that works perfectly on their phone. No apps, no downloads, just great design.",
  },
  ownerPortal: {
    title: "Manage Everything in One Place",
    bullets: [
      "Easy Updates - Change your menu in seconds, not hours.",
      "Analytics - See what your guests are viewing and ordering.",
      "Real-Time Sync - Changes appear instantly across all devices.",
    ],
  },
  clients: {
    title: "Trusted by Restaurants",
    logos: [
      { name: "Client Logo 1", url: undefined },
      { name: "Client Logo 2", url: undefined },
      { name: "Client Logo 3", url: undefined },
      { name: "Client Logo 4", url: undefined },
    ],
    testimonial: {
      name: "Sarah Chen",
      role: "Owner, Bistro Milano",
      text: "Menuzin transformed how we manage our menu. Our guests love the experience, and it's so easy to update.",
    },
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        q: "How do guests access the menu?",
        a: "Guests can scan a QR code at your restaurant or visit a direct link. No app download required.",
      },
      {
        q: "Can I update my menu in real-time?",
        a: "Yes! All changes appear instantly. Update prices, add specials, or mark items sold out immediately.",
      },
      {
        q: "What devices does it work on?",
        a: "Menuzin works on all devices - smartphones, tablets, and computers with any modern web browser.",
      },
    ],
  },
  contact: {
    title: "Get Started Today",
    text: "Ready to transform your menu? Get in touch and we'll help you get started.",
    formLabels: {
      restaurantName: "Restaurant Name",
      city: "City",
      phone: "Phone Number",
      branches: "Number of Branches",
      message: "Message",
      submit: "Send Message",
    },
  },
  footer: {
    blurb: "",
    links: [],
    copyright: `© ${new Date().getFullYear()} Menuzin. All rights reserved.`,
  },
  whatsapp: {
    enabled: false,
    phone: "9647709160405",
  },
};

async function initContent() {
  try {
    console.log('Checking for existing content...');
    
    const existing = await prisma.siteContent.findUnique({
      where: { pageKey: 'home' },
    });

    if (existing) {
      console.log('✅ Content already exists in database.');
      console.log('   - Header logo field: brand.logoUrl');
      console.log('   - Client logos: clients.logos[]');
      return;
    }

    console.log('Creating default content...');
    await prisma.siteContent.create({
      data: {
        pageKey: 'home',
        draft: defaultContent,
        published: defaultContent,
      },
    });

    console.log('✅ Default content created successfully!');
    console.log('');
    console.log('Content structure:');
    console.log('   - Header Logo: brand.logoUrl (can be uploaded via admin panel)');
    console.log('   - Client Logos: clients.logos[] (array of {name, url})');
    console.log('     - Initial client logos: 4 placeholder logos');
  } catch (error) {
    console.error('❌ Error initializing content:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

initContent();


