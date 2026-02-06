import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AnimatedLines from "@/components/ui/AnimatedLines";
import ChatBot from "@/components/ui/ChatBot";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
    preload: true,
});

export const metadata: Metadata = {
    title: "EchoSee - AI-Powered Smart Glasses | See What You Cannot Hear",
    description: "Revolutionary AR smart glasses that transform speech into real-time subtitles. Empowering the hearing-impaired community with seamless communication through AI technology.",
    keywords: ["smart glasses", "AR glasses", "hearing impairment", "accessibility", "speech to text", "real-time subtitles", "AI glasses"],
    authors: [{ name: "EchoSee" }],
    openGraph: {
        title: "EchoSee - AI-Powered Smart Glasses",
        description: "See What You Cannot Hear. Revolutionary AR glasses for the hearing-impaired community.",
        type: "website",
        locale: "en_US",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#f97316",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="dns-prefetch" href="https://api.groq.com" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <meta httpEquiv="x-dns-prefetch-control" content="on" />
            </head>
            <body className={inter.variable} suppressHydrationWarning>
                <AnimatedLines />
                <Header />
                <main id="main-content">
                    {children}
                </main>
                <Footer />
                <ChatBot />
            </body>
        </html>
    );
}
