import type React from "react"
import type { Metadata } from "next"
import { GoogleTagManager } from "@next/third-parties/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Header from "@/components/header"
import  Footer  from "@/components/footer"
import { DemoProvider } from "@/context/DemoContext"
import BookDemoModal from "@/components/BookDemoModal"
import "./globals.css"

import { SEO_CONFIG, getSeoMetadata, getStructuredDataSchemas } from "@/config/seo"

export const metadata: Metadata = getSeoMetadata("home")

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const schemas = getStructuredDataSchemas()

  return (
    <html lang="en">
      <GoogleTagManager gtmId={SEO_CONFIG.site.gtmId} />
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        {schemas.map((schema, index) => (
          <script
            key={index}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
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
