import "./globals.css";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "বাজার দর | আজকের বাজারের দাম",
  description: "চাল, ডাল, তেল, সবজি, মাছ ও মাংসের বাজারদর এক নজরে।",
};
export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body>
        <Header />
        <main className="container main-content">{children}</main>
        <footer>
          <div className="container footer-content">
            <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
            <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
          </div>
        </footer>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
