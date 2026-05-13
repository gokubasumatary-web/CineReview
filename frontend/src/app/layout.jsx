/**
 * Root Layout
 * The top-level layout component that wraps all pages.
 * Configures global fonts (Inter, Spline Sans, Space Grotesk) and sets up the base HTML structure.
 * Includes Google Material Symbols for iconography.
 */
import { Inter, Spline_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const splineSans = Spline_Sans({
  variable: "--font-spline-sans",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata = {
  title: "CineReview — AI-Powered Movie Review Platform",
  description: "A modern, cinematic movie review experience powered by AI.",
};

/**
 * Root Layout Component
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The child pages to render within the layout.
 */
export default function RootLayout({
  children,
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${splineSans.variable} ${spaceGrotesk.variable} dark h-full antialiased`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-surface-dim text-on-surface font-body-md overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
