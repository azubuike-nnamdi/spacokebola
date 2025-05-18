import { Footer } from "@/components/common/footer";
import { Navbar } from "@/components/common/navbar";
import type { Metadata } from "next";
import "../globals.css";



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
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
