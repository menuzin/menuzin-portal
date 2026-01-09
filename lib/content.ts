import { prisma } from './prisma'

export async function getPublishedContent() {
  const page = await prisma.page.findUnique({
    where: { name: 'home' },
    include: {
      brand: true,
      navbar: {
        include: {
          links: {
            orderBy: { order: 'asc' },
          },
        },
      },
      hero: true,
      sections: {
        where: { enabled: true },
        orderBy: { order: 'asc' },
      },
      footer: {
        include: {
          links: {
            orderBy: { order: 'asc' },
          },
        },
      },
    },
  })

  return page
}

export async function getDraftContent() {
  // For preview mode - similar to published but includes disabled sections
  const page = await prisma.page.findUnique({
    where: { name: 'home' },
    include: {
      brand: true,
      navbar: {
        include: {
          links: {
            orderBy: { order: 'asc' },
          },
        },
      },
      hero: true,
      sections: {
        orderBy: { order: 'asc' },
      },
      footer: {
        include: {
          links: {
            orderBy: { order: 'asc' },
          },
        },
      },
    },
  })

  return page
}

export async function initializeDefaultContent() {
  // Check if page exists
  const existingPage = await prisma.page.findUnique({
    where: { name: 'home' },
  })

  if (existingPage) {
    return existingPage
  }

  // Create default content
  const page = await prisma.page.create({
    data: {
      name: 'home',
      published: false,
      brand: {
        create: {
          siteName: 'Menufy',
          tagline: 'Digital menus made simple',
          logoType: 'text',
          primaryColor: '#C2410C',
          primaryHover: '#9A3412',
          backgroundColor: '#FAFAF9',
          textColor: '#0F172A',
          mutedTextColor: '#64748B',
          accentColor: '#365314',
          borderColor: '#E5E7EB',
        },
      },
      navbar: {
        create: {
          showLogin: true,
          links: {
            create: [
              { label: 'Home', href: '#home', order: 0 },
              { label: 'Features', href: '#features', order: 1 },
              { label: 'Portal', href: '#portal', order: 2 },
              { label: 'Clients', href: '#clients', order: 3 },
            ],
          },
        },
      },
      hero: {
        create: {
          headline: 'Digital menus made simple',
          subheadline: 'Beautiful digital menus that your guests will love. Easy to manage, easy to use.',
          ctaLabel: 'Contact Us',
          ctaAction: 'whatsapp',
          enabled: true,
        },
      },
      footer: {
        create: {
          companyBlurb: 'Digital menus your guests love. Built for restaurants and cafés.',
          copyright: '© 2025 Menufy. All rights reserved.',
        },
      },
    },
  })

  return page
}





