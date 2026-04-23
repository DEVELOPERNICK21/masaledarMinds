import type { Metadata } from "next";
import { Caveat, DM_Sans, Playfair_Display } from "next/font/google";
import { BananaLeafLoader } from "./components/BananaLeafLoader";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Masaledar Minds | Free Fire Masterchef Competition",
  description:
    "Masaledar Minds — Where Flavor Meets Strategy. Five no-fire dishes engineered across taste, texture, and visual recall for the Free Fire Masterchef Competition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="flex min-h-full min-w-0 flex-col">
        <BananaLeafLoader />
        {children}
      </body>
    </html>
  );
}
