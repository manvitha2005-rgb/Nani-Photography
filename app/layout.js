import "./globals.css";
import { Cormorant_Garamond, Jost } from "next/font/google";
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300","400","500"], style: ["normal","italic"], variable: "--serif" });
const sans = Jost({ subsets: ["latin"], weight: ["300","400","500"], variable: "--sans" });
const title = "Nani Photography Clickz | Photographer in Hyderabad";
const description = "Newborn, baby, kids, maternity, wedding, reception, birthday, event and family photography in Hyderabad. Every moment deserves to be remembered.";
export const metadata = {
  metadataBase: new URL("https://your-domain.com"), // TODO: replace with your real domain
  title, description,
  keywords: ["photographer in Hyderabad","newborn photographer in Hyderabad","baby photoshoot in Hyderabad","maternity photographer in Hyderabad","wedding photographer in Hyderabad","kids photography in Hyderabad"],
  openGraph: { title, description, type: "website", locale: "en_IN", siteName: "Nani Photography Clickz", images: ["/images/og.jpg"] },
  twitter: { card: "summary_large_image", title, description },
};
export default function RootLayout({ children }) {
  return <html lang="en" className={`${serif.variable} ${sans.variable}`}><body>{children}</body></html>;
}
