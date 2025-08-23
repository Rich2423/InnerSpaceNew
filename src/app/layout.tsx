import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '../contexts/AuthContext';
import ClientThemeProvider from '../components/ClientThemeProvider';
import Navigation from '../components/Navigation';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'InnerSpace - Your Personal Reflection App',
  description: 'Your private space to reflect, journal, and grow with AI-powered insights. Track your mood, write freely, and get guidance from Sage AI.',
  keywords: 'journaling, reflection, mental health, mood tracking, AI companion, personal growth, mindfulness',
  authors: [{ name: 'InnerSpace Team' }],
  creator: 'InnerSpace',
  publisher: 'InnerSpace',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://innerspace-2q171b4op-richard-e-ferrreiras-projects.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'InnerSpace - Your Personal Reflection App',
    description: 'Your private space to reflect, journal, and grow with AI-powered insights',
    url: 'https://innerspace-2q171b4op-richard-e-ferrreiras-projects.vercel.app',
    siteName: 'InnerSpace',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'InnerSpace App Icon',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InnerSpace - Your Personal Reflection App',
    description: 'Your private space to reflect, journal, and grow with AI-powered insights',
    images: ['/icons/icon-512x512.png'],
  },
  manifest: '/manifest.json',
  themeColor: '#8b5cf6',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'InnerSpace',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'InnerSpace',
    'msapplication-TileColor': '#8b5cf6',
    'msapplication-config': '/browserconfig.xml',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <ClientThemeProvider>
            <Navigation />
            {children}
          </ClientThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}