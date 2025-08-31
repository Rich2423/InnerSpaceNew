# PWA Icons Guide for InnerSpace

## 🎨 Required App Icons

The PWA manifest references these icon sizes. You need to create these PNG files in the `/public/icons/` directory:

### **Required Icon Sizes:**
- `icon-72x72.png` (72x72 pixels)
- `icon-96x96.png` (96x96 pixels)
- `icon-128x128.png` (128x128 pixels)
- `icon-144x144.png` (144x144 pixels)
- `icon-152x152.png` (152x152 pixels)
- `icon-192x192.png` (192x192 pixels)
- `icon-384x384.png` (384x384 pixels)
- `icon-512x512.png` (512x512 pixels)

### **Shortcut Icons:**
- `checkin-96x96.png` (96x96 pixels)
- `sage-96x96.png` (96x96 pixels)
- `journal-96x96.png` (96x96 pixels)

## 🎯 Icon Design Guidelines:

### **Main App Icon:**
- **Primary Color**: Purple (#8b5cf6)
- **Secondary Color**: Pink (#ec4899)
- **Symbol**: Brain/🧠 emoji or abstract brain design
- **Style**: Rounded corners, modern, clean
- **Background**: Gradient from purple to pink

### **Shortcut Icons:**
- **Check-in**: Calendar or checkmark icon
- **Sage**: Brain or lightbulb icon
- **Journal**: Pen or notebook icon

## 🛠 How to Create Icons:

### **Option 1: Online Icon Generators**
1. **Favicon.io** - https://favicon.io/
2. **RealFaviconGenerator** - https://realfavicongenerator.net/
3. **PWA Builder** - https://www.pwabuilder.com/imageGenerator

### **Option 2: Design Software**
1. **Figma** (free)
2. **Canva** (free)
3. **Adobe Illustrator** (paid)

### **Option 3: AI Image Generation**
1. **DALL-E** or **Midjourney**
2. Prompt: "Simple app icon with brain symbol, purple to pink gradient background, rounded corners, modern design"

## 📁 File Structure:
```
public/
├── icons/
│   ├── icon-72x72.png
│   ├── icon-96x96.png
│   ├── icon-128x128.png
│   ├── icon-144x144.png
│   ├── icon-152x152.png
│   ├── icon-192x192.png
│   ├── icon-384x384.png
│   ├── icon-512x512.png
│   ├── checkin-96x96.png
│   ├── sage-96x96.png
│   └── journal-96x96.png
└── screenshots/
    ├── desktop-1.png
    └── mobile-1.png
```

## 🚀 Quick Start:

1. **Create a 512x512 base icon** with the brain design
2. **Use an online tool** to generate all sizes
3. **Place all files** in `/public/icons/`
4. **Test the PWA** installation

## 🧪 Testing:

After adding icons, test the PWA:
1. Open Chrome DevTools
2. Go to Application tab
3. Check "Manifest" section
4. Verify all icons load correctly
5. Test "Install" prompt

**Once icons are added, the PWA will be fully functional!** 🎉 