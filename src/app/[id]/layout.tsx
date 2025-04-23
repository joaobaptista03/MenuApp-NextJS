import { getMenuData } from "@/data/getMenuData";
import { notFound } from "@/commonVars";
import { Metadata } from "next";
import styles from './layout.module.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  var currentYear = new Date().getFullYear();
  return (
    <html lang="en" className={styles.html}>
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body className={styles.body}>
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <p>© {currentYear} MenuApp</p>
        </footer>
      </body>
    </html>
  );
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