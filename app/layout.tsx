import TanstackProvider from "@/context/tanstack-provider";
import { ThemeProvider } from "@/context/theme-provider";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";


const montserrat = localFont({
  variable: '--montserrat',
  src: [
    {
      path: './fonts/Montserrat-ExtraLight.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/Montserrat-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/Montserrat-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/Montserrat-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/Montserrat-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/Montserrat-ExtraBold.ttf',
      weight: '900',
      style: 'normal',
    },
  ],
})

const openSans = localFont({
  variable: "--open-sans",
  src: [
    {
      path: './fonts/OpenSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/OpenSans-LightItalic.ttf',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/OpenSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/OpenSans-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/OpenSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/OpenSans-MediumItalic.ttf',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/OpenSans-SemiBold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/OpenSans-SemiBoldItalic.ttf',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/OpenSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/OpenSans-BoldItalic.ttf',
      weight: '700',
      style: 'italic',
    },
    {
      path: './fonts/OpenSans-ExtraBold.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/OpenSans-ExtraBoldItalic.ttf',
      weight: '900',
      style: 'italic',
    },
  ],
});

export const metadata: Metadata = {
  title: { default: 'SPAC OKE BOLA', template: '%s - SPAC OKE BOLA' },
  description: "SPAC OKE BOLA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Link to the favicon */}
        <link rel="icon" href="/assets/img/spac-logo.png " />
      </head>
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <TanstackProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </TanstackProvider>
      </body>
    </html>
  );
}
