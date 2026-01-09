const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkContent() {
  try {
    const content = await prisma.siteContent.findUnique({
      where: { pageKey: 'home' }
    });

    if (!content) {
      console.log('❌ No content found in database.');
      return;
    }

    const draft = content.draft;
    
    console.log('✅ Content found in database!\n');
    console.log('Header Logo:');
    console.log('   Field: brand.logoUrl');
    console.log('   Value:', draft.brand?.logoUrl || 'undefined (ready for upload)');
    console.log('');
    console.log('Client Logos:');
    console.log('   Field: clients.logos[]');
    console.log('   Count:', draft.clients?.logos?.length || 0);
    
    if (draft.clients?.logos && draft.clients.logos.length > 0) {
      console.log('   Logos:');
      draft.clients.logos.forEach((logo, index) => {
        console.log(`     ${index + 1}. ${logo.name || 'Unnamed'}`);
        console.log(`        URL: ${logo.url || 'undefined (ready for upload)'}`);
      });
    } else {
      console.log('   No client logos found (will be initialized)');
    }
    
  } catch (error) {
    console.error('❌ Error checking content:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkContent();


