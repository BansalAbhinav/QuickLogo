// Logo Downloader - Production Version (Clean Output)
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

async function downloadLogos(service, count = 5, dir = './logos', verbose = false) {
  try {
    await fs.mkdir(dir, { recursive: true });

    // Generate service name variations
    const serviceVariations = [
      service,
      service.replace(/js$/i, ''), // reactjs -> react
      service.replace(/db$/i, ''), // mongodb -> mongo
      service.toLowerCase(),
      service.replace(/-/g, ''), // socket-io -> socketio
    ].filter((v, i, arr) => arr.indexOf(v) === i); // remove duplicates

    if (verbose) console.log(`🔍 Trying variations: ${serviceVariations.join(', ')}`);

    const logos = [];
    
    for (const variant of serviceVariations) {
      if (logos.length >= count) break;
      
      const sources = [
        `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${variant}.svg`,
        `https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${variant}.svg`,
        `https://raw.githubusercontent.com/devicons/devicon/master/icons/${variant}/${variant}-original.svg`,
        `https://raw.githubusercontent.com/devicons/devicon/master/icons/${variant}/${variant}-plain.svg`,
        `https://api.iconify.design/logos:${variant}.svg`,
        `https://api.iconify.design/simple-icons:${variant}.svg`,
        `https://raw.githubusercontent.com/gilbarbara/logos/master/logos/${variant}.svg`,
        `https://img.icons8.com/color/512/${variant}.png`,
        `https://img.icons8.com/fluency/512/${variant}.png`,
        `https://logo.clearbit.com/${variant}.com`
      ];

      for (let i = 0; i < sources.length && logos.length < count; i++) {
        try {
          const res = await axios.get(sources[i], { 
            responseType: 'arraybuffer', 
            timeout: 5000,
            headers: { 'User-Agent': 'LogoDownloader/1.0' }
          });
          
          if (res.status === 200 && res.data.length > 0) {
            const ext = sources[i].includes('.svg') ? 'svg' : 'png';
            const filename = `${service}-${logos.length + 1}.${ext}`;
            const filepath = path.join(dir, filename);
            
            await fs.writeFile(filepath, res.data);
            logos.push({ filename, filepath, url: sources[i], variant });
            
            if (verbose) console.log(`✅ Downloaded: ${filename} (from ${variant})`);
          }
        } catch (e) { 
          // Silent failure for production use
        }
      }
    }

    return { success: logos.length > 0, service, count: logos.length, logos };
  } catch (error) {
    return { success: false, service, error: error.message, logos: [] };
  }
}

module.exports = downloadLogos;
