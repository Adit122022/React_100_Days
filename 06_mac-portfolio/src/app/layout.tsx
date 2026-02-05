
import { Inter } from "next/font/google"; // Inter font Mac ke liye kaafi close hai
import "./globals.css";
import Navigation from "./components/other/Navigation";
import Dock from "./components/other/Dock";


// Inter font setup
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


const metadata = {
  title: "Aditya_Sharma",
  description: "Portfolio",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en" suppressHydrationWarning>
      <body cz-shortcut-listen="true"
        className={`${inter.variable} antialiased font-sans`} // font-sans use kiya hai system feel ke liye
        style={{
          backgroundImage: 'url("./mac-wallpaper.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100vh',
          width: '100vw',
          overflow: 'hidden' // Scrollbars hide karne ke liye
        }}
      >
        {/* Top Navbar fix rahega */}
        <Navigation />

        {/* Main Desktop Area (children) */}
        <main className="relative w-full h-full pt-8 pb-20">
          {children}

        </main>

        {/* Bottom Dock fix rahega */}
        <Dock />
      </body>
    </html>
  );
}