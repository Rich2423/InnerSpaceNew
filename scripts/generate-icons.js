const fs = require('fs');
const path = require('path');

// Icon sizes required by the manifest
const iconSizes = [
  72, 96, 128, 144, 152, 192, 384, 512
];

// Shortcut icon sizes
const shortcutSizes = [96];

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create screenshots directory if it doesn't exist
const screenshotsDir = path.join(__dirname, '../public/screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

console.log('🎨 PWA Icon Generation Script');
console.log('=============================');

// Generate main app icons
iconSizes.forEach(size => {
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(iconsDir, filename);
  
  // For now, we'll create placeholder files
  // In production, you'd use a tool like sharp or svgexport to convert SVG to PNG
  fs.writeFileSync(filepath, `# Placeholder for ${size}x${size} icon`);
  console.log(`✅ Created ${filename}`);
});

// Generate shortcut icons
const shortcuts = ['checkin', 'sage', 'journal'];
shortcuts.forEach(shortcut => {
  shortcutSizes.forEach(size => {
    const filename = `${shortcut}-${size}x${size}.png`;
    const filepath = path.join(iconsDir, filename);
    
    fs.writeFileSync(filepath, `# Placeholder for ${shortcut} ${size}x${size} icon`);
    console.log(`✅ Created ${filename}`);
  });
});

console.log('\n📱 Icon generation complete!');
console.log('\nNext steps:');
console.log('1. Use an online tool like favicon.io or realfavicongenerator.net');
console.log('2. Upload the icon.svg file to generate all PNG sizes');
console.log('3. Download and replace the placeholder files');
console.log('4. Test the PWA installation');

// Create a simple favicon.ico placeholder
const faviconPath = path.join(__dirname, '../public/favicon.ico');
if (!fs.existsSync(faviconPath)) {
  fs.writeFileSync(faviconPath, '# Placeholder favicon.ico');
  console.log('✅ Created favicon.ico placeholder');
} 