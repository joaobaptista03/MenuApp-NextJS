import { getMenuData } from "@/data/getMenuData";
import { notFound } from "@/commonVars";
import { Metadata } from "next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        {children}
        <footer>
          <p>© {new Date().getFullYear()} MenuApp</p>
        </footer>
      </body>
    </html>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const menu = await getMenuData(id);

  if (!menu) {
    return {
      title: notFound,
      description: notFound,
    };
  }

  return {
    title: menu.name,
    description: `Menu do ${menu.name}`,
  };
}