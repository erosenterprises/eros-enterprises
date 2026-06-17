import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";

import { StructuredData } from "@/components/seo/structured-data";
import { SiteShell } from "@/components/website/site-shell";
import { siteConfig } from "@/config/site";
import { buildMetadata } from "@/lib/metadata";
import { buildLocalBusinessSchema, buildWebsiteSchema } from "@/lib/structured-data";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Decorative Lighting, Security & Smart Automation | Mumbai",
    description: siteConfig.description,
    path: "/",
  }),
  metadataBase: new URL(siteConfig.url),
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`h-full dark antialiased ${inter.variable} ${poppins.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme flash prevention */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("eros-theme")||"dark";document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`,
          }}
        />
        {/* Google Tag Manager */}
        {GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
        )}
      </head>
      <body
        className="min-h-full antialiased"
        style={{ background: "var(--e-bg)", color: "var(--e-text)" }}
      >
        {/* GTM noscript fallback */}
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <StructuredData data={[buildWebsiteSchema(), buildLocalBusinessSchema()]} />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
