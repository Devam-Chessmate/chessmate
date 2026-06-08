import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Header from "@/components/header"
import  Footer  from "@/components/footer"
import { DemoProvider } from "@/context/DemoContext"
import BookDemoModal from "@/components/BookDemoModal"
import "./globals.css"

export const metadata: Metadata = {
  title: "Chessmate Academy | Where Champions Are Build",
  description: "Nurturing young minds through strategic chess training. Founded by International Rated Coach Raghava M.. Expert-led 1:1 and group classes for ages 6-16.",
  keywords: ["Chess Academy Indirapuram", "Online Chess Classes", "Raghava M. Chess", "Chessmate", "FIDE Rated Coaches"],
  openGraph: {
    title: "Chessmate Academy",
    description: "Transform your child into a strategic thinker. Book a free demo class today.",
    url: "https://thechessmate.org",
    siteName: "Chessmate Academy",
    locale: "en_IN",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <script type="application/ld+json">
        {`
        {
          "@context": "https://schema.org",
          "@type": "SportsOrganization",
          "name": "Chessmate Academy",
          "url": "https://thechessmate.org",
          "logo": "https://thechessmate.org/logo.png",
          "founder": {
            "@type": "Person",
            "name": "Raghava M."
          },
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Thazhambur",
            "addressLocality": "Chennai",
            "addressRegion": "Tamil Nadu 603302",
            "postalCode": "603302",
            "addressCountry": "IN"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91-7990775581",
            "contactType": "customer service",
            "email": "contact@thechessmate.org"
          },
          "sameAs": [
            "https://www.facebook.com/chessmate",
            "https://www.instagram.com/thechess_mate"
          ]
        }
        `}
        </script>
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <DemoProvider>
          <Header />
          <Suspense fallback={null}>
            <main>{children}</main>
          </Suspense>
          <Footer />
          <Analytics />
          
          {/* Global Modal sits here, listening to the provider */}
          <BookDemoModal />
        </DemoProvider>
      </body>
    </html>
  )
}