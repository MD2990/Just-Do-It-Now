import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "Just Do It",
  description: "Created by Majid Ahmed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
