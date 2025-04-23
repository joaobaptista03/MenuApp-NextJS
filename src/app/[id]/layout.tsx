import { getMenuData } from "@/data/getMenuData";
import { Metadata } from "next";
import styles from '@/styles/layout.module.css';
import { menuNotFound } from "@/constants";
import { ThemeLayout } from "@/components/ThemeLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={styles.html}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
        <body className={styles.body}>
          <ThemeLayout>
            {children}
          </ThemeLayout>
        </body>
    </html>
  );
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const menu = await getMenuData(id);
  if (!menu) {
    return {
      title: menuNotFound,
      description: menuNotFound,
    };
  }
  return {
    title: menu.name,
    description: `Menu do ${menu.name}`,
  };
}