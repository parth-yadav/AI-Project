import { Providers } from "./providers"; // Redux Provider
import "./globals.css";
import { ReactNode } from "react";
import ThemeWrapper from "../components/ThemeWrapper"; // New client component
import Navbar from "../components/Navbar"; // New client component
import Footer from "@/components/Footer";
import ChatbotLauncher from "@/components/ChatbotLauncher";

// Metadata export (valid in server components)
export const metadata = {
  title: "Your App",
  description: "Your App Description",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <ThemeWrapper>
             <div className="bg-rebel-light dark:bg-rebel-dark overflow-x-hidden text-rebel-light">
          <Navbar />
              {children}
              <ChatbotLauncher />
           <Footer />   
              </div>
          </ThemeWrapper>
        </Providers>
      </body>
    </html>
  );
}
