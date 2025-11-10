const downloadLogos = require('./logo-downloader-clean.js');

// Async function to handle logo downloading
async function main() {
  try {
    console.log('🚀 Starting logo download...');
    
    // Download 3 Redis logos
    const logos = await downloadLogos('linkedIn', 5, './my-logos');

    if (logos.success) {
      console.log(`✅ Downloaded ${logos.count} logos`);
      console.log('📁 First logo:', logos.logos[0].filepath);
      
      // Show all downloaded logos
      logos.logos.forEach((logo, index) => {
        console.log(`   ${index + 1}. ${logo.filename} - ${logo.url}`);
      });
    } else {
      console.log('❌ Failed to download logos:', logos.error);
    }
  } catch (error) {
    console.error('💥 Error:', error.message);
  }
}

// Run the main function
main();