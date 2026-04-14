import type { Metadata } from "next";
import { Epilogue, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import ConvexClientProvider from "@/components/ConvexClientProvider";
import { cn } from "@/lib/utils";

import "./globals.css";

const epilogue = Epilogue({
  variable: "--font-epilogue",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Frontchud",
  description:
    "Industrial grimoire interface for BUGCHUD operations, rituals, and manager access.",
  icons: {
    icon: "/convex.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "dark",
        epilogue.variable,
        spaceGrotesk.variable,
        jetbrainsMono.variable,
      )}
    >
      <body className="font-sans antialiased">
        <ClerkProvider dynamic>
          <ConvexClientProvider>{children}</ConvexClientProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
