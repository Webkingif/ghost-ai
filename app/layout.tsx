import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ghost-ai",
  description: "Ghost-ai by Webkingif",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full`}
    >
      <body className="min-h-full flex flex-col">
        <ClerkProvider
          appearance={{
            theme: dark,
            variables: {
              colorBackground: "var(--bg-base)",
              colorPrimary: "var(--accent-primary)",
              colorForeground: "var(--text-primary)",
              colorPrimaryForeground: "var(--primary-foreground)",
              colorMuted: "var(--bg-subtle)",
              colorMutedForeground: "var(--text-secondary)",
              colorInput: "var(--bg-surface)",
              colorInputForeground: "var(--text-primary)",
              colorNeutral: "var(--text-muted)",
              colorBorder: "var(--border-default)",
              colorDanger: "var(--state-error)",
              colorSuccess: "var(--state-success)",
              borderRadius: "var(--radius)",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
