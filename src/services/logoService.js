/**
 * Logo Service - Frontend implementation adapted from logo-downloader-clean.js
 * Fetches logos from multiple sources for React app
 */

const LOGO_SOURCES = {
  SIMPLE_ICONS: 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/',
  SIMPLE_ICONS_RAW: 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/',
  DEVICONS_ORIGINAL: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/',
  ICONIFY_LOGOS: 'https://api.iconify.design/logos:',
  ICONIFY_SIMPLE: 'https://api.iconify.design/simple-icons:',
  LOGOS_COLLECTION: 'https://raw.githubusercontent.com/gilbarbara/logos/master/logos/',
  ICONS8_COLOR: 'https://img.icons8.com/color/512/',
  ICONS8_FLUENCY: 'https://img.icons8.com/fluency/512/',
  CLEARBIT: 'https://logo.clearbit.com/'
};

/**
 * Generate service name variations for better search results
 * @param {string} service - The service name to search for
 * @returns {string[]} - Array of service name variations
 */
function generateServiceVariations(service) {
  const variations = [
    service,
    service.replace(/js$/i, ''), // reactjs -> react
    service.replace(/db$/i, ''), // mongodb -> mongo
    service.toLowerCase(),
    service.replace(/-/g, ''), // socket-io -> socketio
    service.replace(/\s+/g, ''), // visual studio -> visualstudio
    service.replace(/\s+/g, '-'), // visual studio -> visual-studio
  ];
  
  // Remove duplicates
  return [...new Set(variations)];
}

/**
 * Generate logo URLs for a given service variant
 * @param {string} variant - The service variant name
 * @returns {Array} - Array of logo URL objects
 */
function generateLogoUrls(variant) {
  return [
    { 
      url: `${LOGO_SOURCES.SIMPLE_ICONS}${variant}.svg`, 
      type: 'svg', 
      source: 'Simple Icons (CDN)' 
    },
    { 
      url: `${LOGO_SOURCES.SIMPLE_ICONS_RAW}${variant}.svg`, 
      type: 'svg', 
      source: 'Simple Icons (Raw)' 
    },
    { 
      url: `${LOGO_SOURCES.DEVICONS_ORIGINAL}${variant}/${variant}-original.svg`, 
      type: 'svg', 
      source: 'DevIcons Original' 
    },
    { 
      url: `${LOGO_SOURCES.DEVICONS_ORIGINAL}${variant}/${variant}-plain.svg`, 
      type: 'svg', 
      source: 'DevIcons Plain' 
    },
    { 
      url: `${LOGO_SOURCES.ICONIFY_LOGOS}${variant}.svg`, 
      type: 'svg', 
      source: 'Iconify Logos' 
    },
    { 
      url: `${LOGO_SOURCES.ICONIFY_SIMPLE}${variant}.svg`, 
      type: 'svg', 
      source: 'Iconify Simple' 
    },
    { 
      url: `${LOGO_SOURCES.LOGOS_COLLECTION}${variant}.svg`, 
      type: 'svg', 
      source: 'Logos Collection' 
    },
    { 
      url: `${LOGO_SOURCES.ICONS8_COLOR}${variant}.png`, 
      type: 'png', 
      source: 'Icons8 Color' 
    },
    { 
      url: `${LOGO_SOURCES.ICONS8_FLUENCY}${variant}.png`, 
      type: 'png', 
      source: 'Icons8 Fluency' 
    },
    { 
      url: `${LOGO_SOURCES.CLEARBIT}${variant}.com`, 
      type: 'png', 
      source: 'Clearbit' 
    },
  ];
}

/**
 * Check if a logo URL is accessible and valid
 * @param {string} url - The URL to check
 * @param {number} timeout - Request timeout in milliseconds
 * @returns {Promise<boolean>} - Whether the logo is accessible
 */
async function checkLogoUrl(url, timeout = 3000) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(url, {
      method: 'HEAD', // Use HEAD to avoid downloading the full image
      signal: controller.signal,
      headers: {
        'User-Agent': 'LogoDownloader/2.0'
      }
    });
    
    clearTimeout(timeoutId);
    return response.ok && response.status === 200;
  } catch (error) {
    return false;
  }
}

/**
 * Search for logos for a given service
 * @param {string} service - The service name to search for
 * @param {number} maxLogos - Maximum number of logos to return (default: 8)
 * @returns {Promise<Array>} - Array of found logo objects
 */
export async function searchLogos(service, maxLogos = 8) {
  if (!service || !service.trim()) {
    return [];
  }

  const variations = generateServiceVariations(service.trim());
  const foundLogos = [];
  
  try {
    for (const variant of variations) {
      if (foundLogos.length >= maxLogos) break;
      
      const logoUrls = generateLogoUrls(variant);
      
      // Check URLs in parallel for better performance
      const checks = logoUrls.map(async (logoData) => {
        const isValid = await checkLogoUrl(logoData.url);
        return isValid ? { ...logoData, variant, originalSearch: service } : null;
      });
      
      const results = await Promise.all(checks);
      const validLogos = results.filter(Boolean);
      
      // Add valid logos to our collection
      for (const logo of validLogos) {
        if (foundLogos.length < maxLogos) {
          foundLogos.push({
            ...logo,
            id: `${service}-${foundLogos.length + 1}`,
            downloadUrl: logo.url
          });
        }
      }
    }
    
    return foundLogos;
  } catch (error) {
    console.error('Error searching for logos:', error);
    throw new Error(`Failed to search for logos: ${error.message}`);
  }
}

/**
 * Download logo as blob for saving
 * @param {string} url - The logo URL
 * @param {string} filename - The desired filename
 * @returns {Promise<void>} - Downloads the file
 */
export async function downloadLogo(url, filename) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to download logo: ${response.statusText}`);
    }
    
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the blob URL
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Error downloading logo:', error);
    throw new Error(`Failed to download logo: ${error.message}`);
  }
}

/**
 * Get logo file extension from URL
 * @param {string} url - The logo URL
 * @returns {string} - The file extension
 */
export function getLogoExtension(url) {
  if (url.includes('.svg')) return 'svg';
  if (url.includes('.png')) return 'png';
  if (url.includes('.jpg') || url.includes('.jpeg')) return 'jpg';
  return 'png'; // default fallback
}
