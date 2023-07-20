import { Metadata } from 'next';

import { Providers } from '~/app/providers';
import { AppBar } from '~/components/app-bar';
import { Footer } from '~/components/footer';
import { siteConfig } from '~/configs/site';
import { fontMono, fontSans } from '~/lib/fonts';
import { cn } from '~/lib/utils';

import '~/app/style.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  manifest: '/manifest.json',
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: 'website',
    title: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  icons: {
    apple: '/apple-touch-icon.png',
    icon: [
      { url: '/favicon.ico', sizes: '16x16' },
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans',
          fontSans.variable,
          fontMono.variable
        )}
      >
        <Providers>
          <AppBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
