import Footer from '@/app/components/footer'
import Navbar from '@/app/components/navbar'
import '@/styles/globals.css'

export const metadata = {
  title: 'Farhad Lafarie',
  description: 'Farhad Lafarie\'s portfolio website',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Farhad Lafarie',
    description: 'Farhad Lafarie\'s portfolio website',
    url: 'https://farhadlafarie.com',
    siteName: 'Farhad Lafarie',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Farhad Lafarie',
    description: 'Farhad Lafarie\'s portfolio website',
    images: '/og-image.png',
  },
  appleWebApp: {
    capable: 'yes',
    statusBarStyle: 'default',
    title: 'Farhad Lafarie',
    navigationBarColor: '#ffffff',
  },
  // manifest: '/manifest.json',
  themeColor: '#ffffff',
  viewport: 'width=device-width, initial-scale=1',
  robots: {
    index: true,
    follow: true,
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}