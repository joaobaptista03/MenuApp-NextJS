import { getMenu } from "@/lib/getMenu";
import { Metadata } from "next";

export const notFound = 'Menu não encontrado.';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const menu = await getMenu(slug);

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
