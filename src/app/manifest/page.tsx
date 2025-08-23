export default function ManifestPage() {
  const manifest = {
    name: "InnerSpace - Your Personal Reflection App",
    short_name: "InnerSpace",
    description: "Your private space to reflect, journal, and grow with AI-powered insights - Updated for PWA",
    start_url: "/",
    display: "standalone",
    background_color: "#1f2937",
    theme_color: "#8b5cf6",
    orientation: "portrait-primary",
    scope: "/",
    lang: "en",
    categories: ["lifestyle", "health", "productivity"],
    id: "innerspace-reflection-app",
    icons: [
      {
        src: "/icons/icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-128x128.png",
        sizes: "128x128",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-152x152.png",
        sizes: "152x152",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
        purpose: "maskable any"
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable any"
      }
    ],
    screenshots: [
      {
        src: "/screenshots/desktop-1.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide"
      },
      {
        src: "/screenshots/mobile-1.png",
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow"
      }
    ],
    shortcuts: [
      {
        name: "Daily Check-in",
        short_name: "Check-in",
        description: "Start your daily mood check-in",
        url: "/?shortcut=checkin",
        icons: [
          {
            src: "/icons/checkin-96x96.png",
            sizes: "96x96"
          }
        ]
      },
      {
        name: "Sage Chat",
        short_name: "Sage",
        description: "Talk to Sage AI for insights",
        url: "/sage?shortcut=sage",
        icons: [
          {
            src: "/icons/sage-96x96.png",
            sizes: "96x96"
          }
        ]
      },
      {
        name: "Journal",
        short_name: "Journal",
        description: "Write in your personal journal",
        url: "/journal?shortcut=journal",
        icons: [
          {
            src: "/icons/journal-96x96.png",
            sizes: "96x96"
          }
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <pre className="text-sm overflow-auto">
        {JSON.stringify(manifest, null, 2)}
      </pre>
    </div>
  );
} 