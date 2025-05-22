import { getMenuData } from "@/data/getMenuData";
import { Metadata } from "next";
import styles from '@/styles/layout.module.css';
import { defaultLocale, getConstantsByLocale } from "@/locale";
import { ThemeLayout } from "@/components/ThemeLayout";

export default async function RootLayout({ children, params }: {
  children: React.ReactNode,
  params: Promise<{ id: string, locale: string }>
}) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;
  
  return (
    <html lang={locale || defaultLocale} className={styles.html}>
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

export async function generateMetadata({ params }: { params: Promise<{ id: string, locale: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const { id, locale } = resolvedParams;
  const menu = await getMenuData(id, defaultLocale);

  const constants = getConstantsByLocale(locale, menu.name);

  if (!menu) {
    return {
      title: constants.menuNotFound,
      description: constants.menuNotFound,
    };
  }
  return {
    title: menu.name,
    description: constants.description,
  };
}