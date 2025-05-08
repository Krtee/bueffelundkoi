import { Metadata } from "next";

export const metadata: Metadata = {
  title: "BÜFFEL & KOI",
  description: "BÜFFEL & KOI",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={"dark"}>{children}</body>
    </html>
  );
}
