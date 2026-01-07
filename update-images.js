// Script to update project images
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateImages() {
    try {
        console.log('🔄 Updating project images...');

        // Update REACH Journal Hub
        await prisma.project.updateMany({
            where: { title: 'REACH Journal Hub' },
            data: { image: '/Reach.png' }
        });
        console.log('✅ Updated REACH Journal Hub image');

        // Update IIIHWS
        await prisma.project.updateMany({
            where: { title: 'IIIHWS - Integrative Healthcare' },
            data: { image: '/IIIHWS.png' }
        });
        console.log('✅ Updated IIIHWS image');

        // Update KLIBS Portal with Hero.png (Figma prototype screenshot)
        await prisma.project.updateMany({
            where: { title: 'KLIBS Portal' },
            data: { image: '/Hero.png' }
        });
        console.log('✅ Updated KLIBS Portal image');

        // Verify updates
        const projects = await prisma.project.findMany({
            select: { title: true, image: true }
        });

        console.log('\n📋 Current project images:');
        projects.forEach(p => console.log(`   ${p.title}: ${p.image}`));

        console.log('\n🎉 All images updated! Refresh your browser.');
    } catch (error) {
        console.error('❌ Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

updateImages();
