import "./globals.css";

export const metadata = {
  title: "AI Adoption Assessment | IDinsight",
  description:
    "Measure how effectively you use AI at work. Get a personalized score and evidence-based recommendations for improvement.",
  icons: {
    icon: "/images/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
